const express = require("express");

module.exports = {
  // Middleware to check if the user is an admin
  adminCheck: (req, res, next) => {
    try {
      if (req.user && req.user.role === "admin") {
        next(); // User is admin, proceed to the next middleware/route handler
      } else {
        res.status(403).json({ message: "Access denied. Admins only." });
      }
    } catch (error) {
      console.error("Admin Check Error:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
};
