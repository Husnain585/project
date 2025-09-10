require("dotenv").config();
const express = require("express");
const app = express();

const { db } = require("./src/models/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Import Routes
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const cartRoutes = require("./src/routes/cart.route");
const productRoutes = require("./src/routes/product.route");
const categoryRoutes = require("./src/routes/category.route");
const productImageRoutes = require("./src/routes/productImage.route");
const wishlist = require("./src/routes/wishlist.route");
const orderRoutes = require("./src/routes/order.route");
const checkoutRoutes = require("./src/routes/checkout.route");
const emailCheck = require("./src/routes/emailCheck.route")
const vendorRoutes = require("./src/routes/vendor.route")

// CORS
const allowedOrigins = [
  "http://localhost:5173", // React
  "http://localhost:3000", // optional if you test frontend in CRA
  "https://your-production-domain.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware (after CORS)
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/me", authRoutes);  // ✅ fixed missing slash
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product-image", productImageRoutes);
app.use("/api/wishlist", wishlist);
app.use("/api/order", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/auth", emailCheck);
app.use("/api/vendor", vendorRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// DB sync
db.connection
  .sync({ alter: true, logging: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
