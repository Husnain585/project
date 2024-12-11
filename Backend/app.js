const express = require("express");
const bodyparser = require("body-parser");
const userModel = require("./routes/userRouter");
const auth = require("./routes/authRouter");
const connection = require("./dbConnection");
const userModule = require("./routes/userRouter");
const vendorRouter = require("./routes/vendorRouter");
const productRouter = require("./routes/productRouter");
const cors = require("cors");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use("/users", userModel);
app.use("/author", auth);
app.use("/vendor", vendorRouter);
app.use("/product", productRouter);



app.get("/", (req, res) => {
    res.send("welcome");
});

connection
    .sync({ alter: true, logging: false })
    .then(() => {
        app.listen(3000);
    }).catch((error) => {
        console.log(error);
        console.log("unable to connect");
    })