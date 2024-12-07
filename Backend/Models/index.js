const connection = require("../dbConnection");
const users = require("./Tables/users");


const models = {
    users
};

const db = { };

db.connection = connection;
models.connection = models;
module.exports = {db, models};