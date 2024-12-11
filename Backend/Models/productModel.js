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
    getAllProduct : async () => {
        try {
            const user = await models.products.findAll({
                attributes: ["name", "description", "productId"], // to select specfic data member from database
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
    deleteProduct : async ( {name} ) => {
        try {
            console.log("check")
            const user = await models.products.destroy({
                where: {
                    name: name
                }
            });
            console.log("succfully");
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