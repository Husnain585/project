const {createCart} = require("../Models/cartModel");
const { create } = require("../Models/definitions/users");
const responseHandler = require("../responseHandler");

module.exports = {
    createCartController: async (req, res) => {
        try {
            const response = await createCart(req.body);
            return responseHandler(res, response);
        } catch (error) {
            return responseHandler(res, { response: error });
        }
    }
}
