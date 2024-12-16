const { models } = require("./index");

module.exports = {
    createVendor: async (body) => {
        try {
            const vendor = await models.vendors.create({ ...body });

            return {
                response: vendor,
            };
        } catch (error) {
            return {
                error: error.errors[0].message,
            };
        }
    },

    getAllVendors: async () => {
        try {
            const vendor = await models.vendors.findAll({ paranoid: false });

            return {
                response: vendor,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getOneVendor: async ({ username }) => {
        try {
            const vendor = await models.vendors.findOne({
                paranoid: false,

                where: {
                    username: username,
                },
            });

            return {
                response: vendor,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    updateVendor: async ({ username, ...body }) => {
        try {
            const vendor = await models.vendors.update(
                {
                    ...body,
                },
                {
                    where: {
                        username: username,
                    },
                }
            );

            return {
                response: vendor,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    deleteVendor: async ({ username }) => {
        try {
            const vendor = await models.vendors.destroy({
                where: {
                    username: username,
                },
            });

            return {
                response: vendor,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
};
