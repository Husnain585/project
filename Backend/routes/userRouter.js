const routes = require("express").Router();
const {createUserSchema, getDeleteUserSchema, updateUserSchema} = require("../validations/userValidator");
const {create, getAll, update, get, deleteUser } = require("../controller/userController")


routes.get("/get-all",  getAll);
routes.get("/get", get);
routes.post("/create", createUserSchema, create);
routes.patch("/update", updateUserSchema,update);
routes.get("/delete", getDeleteUserSchema, deleteUser);
module.exports = routes;