const joi = require("joi");
const responseHandler = require("../responsHandler");
const create = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
});
const update = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
});
const getDelete = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
});
module.exports = {
    createUserSchema: async (req, res, next) => {
        try {
            await create.validateAsync(req.body);
            next()
        } catch (error) {
            return responseHandler(res, { error: error.message })
        }
    },
    updateUserSchema: async (req, res, next) => {
        try {
            await update.validateAsync(req.body);
            next()
        } catch (error) {
            return responseHandler(res, { error: error.message })
        }
    },
    getDeleteUserSchema: async (req, res, next) => {
        try {
            await getDelete.validateAsync(req.query);
            next()
        } catch (error) {
            return responseHandler(res, { error: error.message })
        }
    },
}