require("dotenv").config();
const express = require("express");
const app = express();

const {db} = require("./src/models/index"); 
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

// Import Routes
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const cartRoutes = require("./src/routes/cart.route");
const productRoutes = require("./src/routes/product.route");
const categoryRoutes = require("./src/routes/category.route");
const productImageRoutes = require("./src/routes/productImage.route");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
// Auth Routes
app.use("/api/auth", authRoutes);
// Protected Route 
app.use("api/auth/me", authRoutes);
// User Route
app.use("/api/user", userRoutes);
// Cart Route
app.use("/api/cart", cartRoutes);
// Product Route
app.use("/api/product", productRoutes);
// Category Route
app.use("/api/category", categoryRoutes);
// Product Image Route
app.use("/api/product-image", productImageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");

});

// ===== Global Error Handler Middleware =====
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Sync database
db.connection
    .sync({ alter: true, logging: false }) 
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Error synchronizing database:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http:localhost:${port}`);
});
