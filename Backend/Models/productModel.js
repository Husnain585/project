const { models } = require("./index");

module.exports = {
  createProduct: async (body) => {
    try {
      const user = await models.products.create({
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
  getAllProduct: async (vendorId) => {
    try {
      const product = await models.products.findAll({
        where: { vendorId: vendorId },
        paranoid: false,
        attributes: ["productId", "name", "description"],
        include:
        {
          model: models.vendors,
          as: "vendor",
          attributes: ["vendorId", "username"],
        },

      });
      return {
        response: product,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getOneProduct: async ({ productName }) => {
    try {
      const product = await models.products.findOne({
        paranoid: false,

        where: {
          productName: productName,
        },
        attributes: ["productId", "productName", "description"],
        include: [
          {
            model: models.vendors,
            as: "vendors",
            attributes: ["vendorId", "username"],
          },
        ],
      });
      return {
        response: product,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteProduct: async ({ name }) => {
    try {
      console.log("check")
      const user = await models.products.destroy({
        where: {
          name: name
        }
      });
      console.log("succfully");
      return {
        response: user,
      }
    } catch (error) {
      return {
        error: error,
      }
    }
  },
  updateProduct: async ({ productName, ...body }) => {
    try {
      const product = await models.products.update(
        {
          ...body,
        },
        {
          where: {
            productName: productName,
          },
        }
      );

      return {
        response: product,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
}