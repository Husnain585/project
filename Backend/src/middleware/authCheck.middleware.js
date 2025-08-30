const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies?.auth; // read JWT from cookie

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // attach decoded payload (userId, username) to request

    next(); // continue to the protected route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
};
