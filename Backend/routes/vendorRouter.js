const routes = require("express").Router();

const {create, getAllVendors, getOneVendor, Update, Delete } = require("../Controller/vendorController");

routes.post("/create", create);

routes.get("/get-all-vendors", getAllVendors);
routes.get("/get-one-vendor", getOneVendor);
routes.patch("/update", Update);
routes.delete("/delete", Delete);
module.exports = routes;