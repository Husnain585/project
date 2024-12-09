const userModel = require("express").Router();
const {
    create,
    getAll,
    update,
    get,
    deleteUser,
} = require("../Controller/userController")



userModel.get("/get-all",  getAll);
userModel.get("/get", get);
userModel.post("/create",  create);
userModel.patch("/update", update);
userModel.get("/delete",  deleteUser);
module.exports = userModel;


