const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userModel = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const vendorRouter = require("./routes/vendorRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const { db } = require("./models/index");
const cors = require("cors");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use("/users", userModel);
app.use("/auth", authRouter);
app.use("/vendor", vendorRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);



app.get("/", (req, res) => {
    res.send("welcome");
});

db.connection
    .sync({ alter: true, logging: false })
    .then(() => {
        app.listen(3000);
    }).catch((error) => {
        console.log(error);
        console.log("unable to connect");
    })

