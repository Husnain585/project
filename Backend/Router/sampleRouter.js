const userModel = require("express").Router();
const {Create, Update, GetDelete} = require("../Validation/sampleUserValidator")
const {
    create,
    getAll,
    update,
    get,
    deleteUser,
} = require("../Controller/sampleController")

const {createValidator} = require("../Validation/sampleUserValidator");


userModel.get("/get-all",  getAll);
userModel.get("/get", get);
userModel.post("/create", Create, create);
userModel.patch("/update", Update,update);
userModel.get("/delete", GetDelete, deleteUser);
module.exports = userModel;
