const routes = require("express").Router();
const {Create, Update, GetDelete} = require("../validations/userValidator")
const {
    create,
    getAll,
    update,
    get,
    deleteUser,
} = require("../controller/userController")

const {createValidate, getUserValidate, delValidate, updateValidate} = require("../validations/userValidator");


routes.get("/get-all",  getAll);
routes.get("/get", getUserValidate,get);
routes.post("/create", createValidate, create);
routes.patch("/update", updateValidate,update);
routes.get("/delete", delValidate, deleteUser);
module.exports = routes;


