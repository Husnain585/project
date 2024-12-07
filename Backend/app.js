const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./dbConnection");
const {db,models} = require("./Models/index");



const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.get("/", (req, res) => {
    res.send("hello");
});

db.connection
    .sync({alter: true, logging: false, force: true})
    .then(() => 
        {
    app.listen(3000);
}).catch((error) =>{
    console.log(error);
    console.log("unable to connect");
})
