// controllers/auth.controller.js
require("dotenv").config();

const User = require("../models/users");
const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");
const { models } = require("../models/index");
const { sendVerificationEmail } = require("./emailCheck.controller");
const { emailCheck } = models;
const { OAuthAccount } = models;
const {handleOAuthLogin} = require("../services/oauth.service")

// Arctic (single import)
const {
  generateState,
  generateCodeVerifier,
  decodeIdToken,
  OAuth2RequestError,
  ArcticFetchError,
} = require("arctic");

// IMPORTANT: export from config/oauth/google should be the client instance:
// module.exports = new Google(...)
// so require it directly:
const google = require("../config/oauth/google");

// Optional: use google-auth-library to VERIFY id tokens (recommended in prod)
let verifyIdTokenWithGoogle;
try {
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  verifyIdTokenWithGoogle = async (idToken) => {
    if (!idToken) return null;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  };
} catch (e) {
  // library not installed or configured — fallback to decodeIdToken (no signature verification)
  verifyIdTokenWithGoogle = async (idToken) =>
    idToken ? decodeIdToken(idToken) : null;
}

// Config
const OAUTH_EXCHANGE_EXPIRY_MS = parseInt(
  process.env.OAUTH_EXCHANGE_EXPIRY_MS || "900000",
  10
); // 15 minutes
const IS_PROD = process.env.NODE_ENV === "production";

// Helper: safe cookie options
const oauthCookieOptions = {
  httpOnly: true,
  secure: IS_PROD,
  maxAge: OAUTH_EXCHANGE_EXPIRY_MS,
  sameSite: "lax",
  path: "/",
};

module.exports = {
  // ---------------- LOGIN ----------------
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ error: "Username and password are required" });

      const user = await User.findOne({
        paranoid: false,
        attributes: ["userId", "name", "username", "email", "password", "role"],
        where: { username: username.trim() },
      });

      if (!user) return res.status(401).json({ error: "User not found" });

      const isValid = await compare(password.trim(), user.password);
      if (!isValid)
        return res.status(401).json({ error: "Invalid credentials" });

      // Check email verification
      const emailRecord = await emailCheck.findOne({
        where: { userId: user.userId },
      });
      if (!emailRecord || !emailRecord.isVerified)
        return res
          .status(403)
          .json({ error: "Please verify your email before login" });

      // JWT payload
      const payload = {
        userId: user.userId,
        username: user.username,
        role: user.role,
      };
      const token = sign(payload, process.env.SECRET, { expiresIn: "15m" });

      // Set cookie (maxAge in ms)
      res.cookie("auth", token, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // ---------------- LOGOUT ----------------
  Logout: async (req, res) => {
    try {
      // Clear cookie using matching path/options
      res.clearCookie("auth", {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });
      return res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // ---------------- REGISTER ----------------
  Register: async (req, res) => {
    try {
      const { name, username, email, password, role } = req.body;
      if (!name || !username || !email || !password)
        return res.status(400).json({ error: "All fields are required" });

      const usernameInput = username.trim();
      const emailInput = email.trim().toLowerCase();

      // Check if user/email exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username: usernameInput }, { email: emailInput }],
        },
      });
      if (existingUser)
        return res
          .status(409)
          .json({ error: "Username or email already taken" });

      // Optional: allow only one admin
      if (role === "admin") {
        const existingAdmin = await User.findOne({ where: { role: "admin" } });
        if (existingAdmin)
          return res.status(403).json({ error: "Only one admin is allowed" });
      }

      // Hash password (10 rounds)
      const hashedPassword = await hash(password, 10);

      // Create user
      const newUser = await User.create({
        name,
        username: usernameInput,
        email: emailInput,
        password: hashedPassword,
        role: role && ["admin", "customer"].includes(role) ? role : "customer",
      });

      // Option: do not auto-login before verification. If you still want to, keep this block.
      if (process.env.AUTO_LOGIN_ON_REGISTER === "true") {
        const payload = { userId: newUser.userId, username: newUser.username };
        const token = sign(payload, process.env.SECRET, { expiresIn: "5m" });
        res.cookie("auth", token, {
          maxAge: 5 * 60 * 1000,
          httpOnly: true,
          secure: IS_PROD,
          sameSite: "Lax",
          path: "/",
        });
      }

      // Send verification email (wrap call w/ try/catch so register still returns 201)
      try {
        // You currently call the controller function with fake req/res. That's okay,
        // but consider refactoring email sending into a separate service function.
        await sendVerificationEmail(
          { body: { userId: newUser.userId } },
          {
            json: (data) =>
              console.log("sendVerificationEmail response:", data),
            status: (code) => ({ json: (data) => console.log(code, data) }),
          }
        );
      } catch (sendErr) {
        console.error("Failed to send verification email:", sendErr);
        // Do not fail the whole registration just because email failed, but inform client.
      }

      return res.status(201).json({
        message: "Registration successful. Please verify your email.",
      });
    } catch (error) {
      console.error("Register Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // ---------------- LOGIN WITH GOOGLE ----------------
LoginWithGoogle: async (req, res) => {
  try {
    if (req.user) {
      return res.redirect("/");
    }

    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];

    const url = google.createAuthorizationURL(state, codeVerifier, scopes);
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "consent");

    res.cookie("google_oauth_state", state, oauthCookieOptions);
    res.cookie("google_code_verifier", codeVerifier, oauthCookieOptions);

    return res.redirect(url.toString());
  } catch (err) {
    console.error("LoginWithGoogle error:", err);
    return res.status(500).send("Internal server error");
  }
},


// ---------------- GOOGLE CALLBACK ----------------
googleCallback: async (req, res) => {
  try {
    const { code, state } = req.query;
    const storedState = req.cookies?.google_oauth_state;
    const codeVerifier = req.cookies?.google_code_verifier;

    if (!code) return res.status(400).send("Missing authorization code.");
    if (!state || state !== storedState) return res.status(400).send("Invalid state.");
    if (!codeVerifier) return res.status(400).send("Missing code verifier.");

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const idToken = tokens.idToken?.() || null;
    const claims = idToken ? await verifyIdTokenWithGoogle(idToken) : null;

    if (!claims) return res.status(400).send("Unable to verify Google ID token");

    // ✅ Use service function
    const user = await handleOAuthLogin("google", claims, {
      accessToken: tokens.accessToken?.(),
      refreshToken: tokens.refreshToken?.() || null,
      expiresAt: tokens.accessTokenExpiresAt?.()
        ? new Date(tokens.accessTokenExpiresAt())
        : null,
    });

    res.clearCookie("google_oauth_state", oauthCookieOptions);
    res.clearCookie("google_code_verifier", oauthCookieOptions);

    // Issue JWT
    const payload = { userId: user.userId, username: user.username, role: user.role };
    const jwt = sign(payload, process.env.SECRET, { expiresIn: "60m" });

    res.cookie("auth", jwt, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "Lax",
      path: "/",
    });

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";
    return res.redirect(FRONTEND_URL);
  } catch (err) {
    console.error("googleCallback error:", err);
    return res.status(500).send("Internal server error");
  }
},

};
