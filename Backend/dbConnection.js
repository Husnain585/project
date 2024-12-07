require("dotenv").config();
const {Sequelize} = require("sequelize");

const connection = new Sequelize({
    host : process.env.DBHOST,
    name: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    username: process.env.DBUSERNAME,
    dialect: process.env.DBDIALECT,
    port: process.env.DBPORT
});

connection
        .authenticate()
        .then(() => {
            console.log("Authentication successfully");
        })
        .catch(()=> {
            console.log("Authentication failed!!");
        });

module.exports = connection;