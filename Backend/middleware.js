require("dotenv").config();
const { verify } = require("jsonwebtoken");
const responseHandler = require("./responsHandler");

module.exports = {
  middleWare: async (req, res, next) => {
    try {
      const token = req.cookies.auth;
      if (token == "undefined") {
        return responseHandler(res, { error: "Unauthorized User" });
      }

      verify(token, process.env.SECRET, (error, data) => {
        if (error) {
          return responseHandler(res, { error: "Forbidden Access" });
        }
        req.user = { ...data };
        next();
      });
    } catch (error) {
      return responseHandler(res, { error: error.message });
    }
  },
};
