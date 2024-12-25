const {models} = require("./index")

module.exports = {
    createCart: async (body) => {
        try {
          const user = await models.cart.create({
            ...body,
          });
          return {
            response: user,
          }
        } catch (error) {
          console.log(error)
          return {
            error: error,
          }
        }
      },
}