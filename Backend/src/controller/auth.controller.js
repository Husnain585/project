require("dotenv").config();
const User = require("../models/users");
const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");
const { models } = require("../models/index");
const { sendVerificationEmail } = require("./emailCheck.controller");

const { emailCheck } = models;

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
        where: { username: username },
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

      // Generate JWT for login
      const payload = {
        userId: user.userId,
        username: user.username,
        role: user.role,
      };
      const token = sign(payload, process.env.SECRET, { expiresIn: "15m" });

      // Set cookie
      res.cookie("auth", token, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
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
      res.clearCookie("auth", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      return res.json({ message: "Logout successful" });
    } catch (error) {
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

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      const newUser = await User.create({
        name,
        username: usernameInput,
        email: emailInput,
        password: hashedPassword,
        role: role && ["admin", "customer"].includes(role) ? role : "customer",
      });

      // Optional JWT token for session (not email verification)
      const payload = { userId: newUser.userId, username: newUser.username };
      const token = sign(payload, process.env.SECRET, { expiresIn: "5m" });

      res.cookie("auth", token, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      // ---------------- Send verification email ----------------
      await sendVerificationEmail(
        { body: { userId: newUser.userId } },
        {
          json: (data) => console.log("sendVerificationEmail response:", data),
          status: (code) => ({ json: (data) => console.log(code, data) }),
        }
      );

      return res.status(201).json({
        message: "Registration successful. Please verify your email.",
        token,
      });
    } catch (error) {
      console.error("Register Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },
};
