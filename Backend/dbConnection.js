require('dotenv').config(); 

const { Sequelize } = require('sequelize');
const connection = new Sequelize(
  process.env.DBNAME, 
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST, 
    dialect: process.env.DBDIALECT, 
    port: process.env.DBPORT, 
  }
);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
module.exports = connection;