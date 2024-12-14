require("dotenv").config();
const responseHandler = require("../responsHandler");
const { getOneUser } = require("../models/userModel");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const response = await getOneUser({
        email: "false",
        username: username,
        password: password,
      });

      if (response.error || !response.response) {
        res.cookie("auth", undefined, { maxAge: 60000 });

        return responseHandler(
          res,
          response.error ? response : { error: "No User Exists" }
        );
      }

      const isValid = await compare(
        password,
        response.response.dataValues.password
      );
      if (!isValid) {
        res.cookie("auth", undefined, { maxAge: 60000 });

        return responseHandler(res, { error: "Invalid Username or Password" });
      }

      delete response.response.dataValues.password;

      const token = sign(response.response.dataValues, process.env.SECRET, {
        expiresIn: 60,
      });

      res.cookie("auth", token, { maxAge: 60000 });


      return responseHandler(res, { response: token });
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
};
