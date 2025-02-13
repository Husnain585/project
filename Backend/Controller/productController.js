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
          vendorId = "6cd84664-c003-4a42-a632-bad4294cdb03";
            const response = await getAllProduct(vendorId);
            return responseHandler(res, response);
            // console.log(response);
        } catch (error) {
            return responseHandler(res, {response: error});
        }
    },
    getProduct: async (req, res) => {
        try {
          const response = await getOneProduct(req.query);
          console.log(response);
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