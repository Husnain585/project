const joi = require("joi");
const CreateUser = joi.object({
    name: joi.string().required(),
    username: joi.string().alphanum().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
});
const Update = joi.object({
    username: joi.string().alphanum().required(),
    name: joi.string(),
    email: joi.string().email(),
});
const GetDelete = joi.object({
    username: joi.string().required(),
    // userId: joi.string().required(),
});
const getUser = joi.object({
    username: joi.string().required(),
    userId: joi.string().required(),
});

module.exports = {
     createValidate : async (req, res, next) => {
        try{ 
           await CreateUser.validateAsync(req.body);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     updateValidate : async (req, res, next) => {
        try{
           await Update.validateAsync(req.body);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     delValidate : async (req, res, next) => {
        try{
           await GetDelete.validateAsync(req.query);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     getUserValidate : async (req, res, next) => {
        try{
           await getUser.validateAsync(req.query);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
};