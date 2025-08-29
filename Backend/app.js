require("dotenv").config();
const express = require("express");
const app = express();
const {db} = require("./src/models/index"); 

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");

});

// Sync database
db.connection
    .sync({ alter: true, logging: false }) 
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Error synchronizing database:", err));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
