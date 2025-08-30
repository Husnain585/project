const routes = require("express").Router();
const { getProfile , updateProfile, deleteProfile, changePassword } = require("../controller/user.controller");
const authMiddleware = require("../middleware/authCheck.middleware");

routes.get("/me", authMiddleware, getProfile);
routes.put("/update", authMiddleware, updateProfile);
routes.delete("/delete", authMiddleware, deleteProfile);
routes.put("/change-password", authMiddleware, changePassword);

module.exports = routes;
