const { createProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct} = require("../Models/productModel");
const responseHandler = require("../responseHandler");

module.exports = {
    create: async (req, res) => {
        try {
            // req.body.vendorId = req.vendor.vendorId;
            const response = await createProduct(req.body);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, { response: error });
        }
    },
    getAll: async (req, res) => {
        try {
            vendorId = "cbe81c0c-b633-420a-81c9-33ec60cd1684";
            const response = await getAllProduct(vendorId);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, {response: error});
        }
    },
    getProduct: async (req, res) => {
        try {
          const response = await getOneProduct(req.query);
          return responseHandler(res, response);
        } catch (error) {
          return responseHandler(res, { error: error });
        }
      },
      DeleteProduct: async (req, res) => {
        try {
          const response = await deleteProduct(req.query);
          return responseHandler(res, response);
        } catch (error) {
          return responseHandler(res, { error: error });
        }
      },
      UpdateProduct: async (req, res) => {
        try {
          const response = await updateProduct(req.body);
          return responseHandler(res, response);
        } catch (error) {
          return responseHandler(res, { error: error });
        }
      },
};