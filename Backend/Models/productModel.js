const {models} = require("./index");

module.exports = {
    createProduct : async (body) => {
        try {
            const user = await models.products.create({
                ...body,
            });
            return {
                response: user,
            }
        } catch (error) {
            console.log(error)
            return{
                error: error,
            }
        }
    },
    getAllUser : async () => {
        try {
            const user = await models.products.findAll({
                attributes: ["name", "username", "email"], // to select specfic data member from database
                // attributes: {
                //     exclude: ["password", "createdAt", "updatedAt"],    // remove specific datamember 
                // },
                paranoid: false});
            return{
                response: user,
            }
        } catch (error) {
            return{
                error: error,
            }
        }
    },
}