const {models} = require("./index");

module.exports = {
    createVendor : async (body) => {
        try {
            const vendor = await models.vendors.create({
                ...body,
            });
            return {
                response: vendor,
            }
        } catch (error) {
            console.log(error)
            return{
                error: error,
            }
        }
    },
}