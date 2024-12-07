const express = require("express");
const connection = require("./dbConnection");
const {db,models} = require("./Models/index");



const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

db.connection
            .sync({alter: true, logging: false})
            .then(() => {
                console.log("Connected to database ");
            })
            .catch(() => {
                console.log("Unable to connected to database");
            })


app.listen(3000);