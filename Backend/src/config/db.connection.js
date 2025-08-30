require("dotenv").config();
const { Sequelize } = require("sequelize");

// Validate environment variables
["DBNAME", "DBUSERNAME", "DBPASSWORD", "DBHOST", "DBDIALECT", "DBPORT"].forEach((key) => {
  if (!process.env[key]) throw new Error(`❌ Missing environment variable: ${key}`);
});

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    port: process.env.DBPORT,
    logging: false, // enable true for debugging
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

// Graceful shutdown
const shutdown = async () => {
  await sequelize.close();
  console.log("🔌 Database connection closed.");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = sequelize;
