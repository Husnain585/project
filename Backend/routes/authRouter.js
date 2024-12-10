const authRoutes = require("express").Router();
authRoutes.get("/auth", (req, res) => {
    res.send("Auth Page");
})
module.exports = authRoutes;