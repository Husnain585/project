const { createProduct, getAllProduct, deleteProduct} = require("../Models/productModel");
const responseHandler = require("../responsHandler");

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
    delProduct: async (req, res) => {
        try {
            const response = await deleteProduct(req.query);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, {response: error});
        }
    }
};