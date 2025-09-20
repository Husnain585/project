const routes = require("express").Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} = require("../controller/user.controller");
const authMiddleware = require("../middleware/authCheck.middleware");
const validate = require("../middleware/validate.middleware");
const {
  updateProfileSchema,
  changePasswordSchema,
} = require("../validation/user.validator");

routes.get("/me", authMiddleware, getProfile);
routes.put("/update", authMiddleware, validate(updateProfileSchema), updateProfile);
routes.delete("/delete", authMiddleware, deleteProfile);
routes.put("/change-password", authMiddleware, validate(changePasswordSchema), changePassword);

module.exports = routes;
