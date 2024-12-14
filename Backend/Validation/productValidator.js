const joi = require("joi");
const CreateProduct = joi.object({
    name: joi.string().required(),
    des: joi.string().required()
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
     Create : async (req, res, next) => {
        try{ 
           await CreateUser.validateAsync(req.body);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     Update : async (req, res, next) => {
        try{
           await Update.validateAsync(req.body);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     GetDelete : async (req, res, next) => {
        try{
           await GetDelete.validateAsync(req.query);
            next();
        }catch(error){
            return res.send({
                error: error,
            });
        }
     },
     getUser : async (req, res, next) => {
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