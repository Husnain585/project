const { createProduct} = require("../models/productModel");
const responseHandler = require("../responsHandler")
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");
const { models } = require("../models");
const { response } = require("express");

module.exports = {
    create: async (req, res) => {
        try {
            const response = await createProduct(req.body);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, { response: error });
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await getAllProduct(req.query);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, {response: error});
        }
    },
};