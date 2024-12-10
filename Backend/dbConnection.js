require('dotenv').config(); // Load .env variables

const { Sequelize } = require('sequelize');

// Creating a Sequelize instance using environment variables
const connection = new Sequelize(
  process.env.DBNAME, // Database name
  process.env.DBUSERNAME, // Username
  process.env.DBPASSWORD, // Password
  {
    host: process.env.DBHOST, // Database host
    dialect: process.env.DBDIALECT, // Database dialect (postgres)
    port: process.env.DBPORT, // Port for PostgreSQL
    logging: console.log, // Logs SQL queries for debugging (optional)
  }
);

// Test the connection
connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
module.exports = connection;