require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { models } = require("../models");

const { User, emailCheck } = models;

module.exports = {
  sendVerificationEmail: async (req, res) => {
    try {
      const { userId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Generate token and expiry
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Upsert record
      await emailCheck.upsert({
        userId: user.userId,
        token,
        expiresAt,
        isVerified: false,
      });

      // Nodemailer transporter (Ethereal for testing)
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const verifyLink = `http://localhost:3000/api/auth/verify-email/${token}`;

      // Send email
      await transporter.sendMail({
        from: `"Your App" <no-reply@yourapp.com>`,
        to: "husnain7t9@gmail.com", // or your test email
        subject: "Verify your email",
        text: `Click here to verify: ${verifyLink}`,
      });

      // ✅ Log the link in console for development/testing
      console.log("====================================");
      console.log("Email verification link (copy-paste to browser/Postman):");
      console.log(verifyLink);
      console.log("====================================");

      return res.json({
        message: "Verification email sent (check console for link)",
      });
    } catch (err) {
      console.error("sendVerificationEmail Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;

      const emailCheckRecord = await emailCheck.findOne({
        where: { token },
        include: { model: User, as: "user" },
      });

      if (!emailCheckRecord)
        return res.status(400).json({ error: "Invalid or expired token" });

      if (emailCheckRecord.expiresAt < new Date())
        return res.status(400).json({ error: "Token expired" });

      emailCheckRecord.isVerified = true; // ✅ use instance
      emailCheckRecord.token = "USED_" + emailCheckRecord.token;
      await emailCheckRecord.save(); // ✅ use instance

      return res.json({ message: "✅ Email verified successfully!" });
    } catch (err) {
      console.error("verifyEmail Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
