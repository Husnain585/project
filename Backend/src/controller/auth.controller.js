require("dotenv").config();
const User = require("../models/users");
const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");


module.exports = {
  Login: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      const usernameInput = username?.trim();
      const passwordInput = password?.trim();
      if (!usernameInput || !passwordInput) {
        return res
          .status(400)
          .json({ error: "Username and password cannot be empty" });
      }
      // Find user by username
      const user = await User.findOne({
        paranoid: false,
        attributes: ["userId", "name", "username", "email", "password"],

        where: {
          ...{ username: username },
        },
      });
      // Compare hashed password
      const isValid = await compare(passwordInput, user.password);
      if (!isValid)
        return res.status(401).json({ error: "Password Invalid credentials" });

      // Minimal JWT payload
      const payload = { userId: user.userId, username: user.username };
      const token = sign(payload, process.env.SECRET, { expiresIn: "15m" });

      // Set secure cookie
      res.cookie("auth", token, {
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      // Return response
      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Server error", details: error.message });
    }
  },
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
  Register: async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const usernameInput = username.trim();
    const emailInput = email.trim().toLowerCase();

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameInput },
          { email: emailInput }
        ]
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Username or email already taken" });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      username: usernameInput,
      email: emailInput,
      password: hashedPassword,
    });

    // JWT payload
    const payload = { userId: newUser.userId, username: newUser.username };
    const token = sign(payload, process.env.SECRET, { expiresIn: "5m" });

    // Set cookie
    res.cookie("auth", token, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
},

};
