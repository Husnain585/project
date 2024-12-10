const {models} = require("./index");
module.exports = {
    createUser : async (body) => {
        try {
            const user = await models.users.create({
                ...body,
            });
            return {
                response: user,
            }
        } catch (error) {
            return{
                error: error,
            }
        }
    },
    getAllUser : async () => {
        try {
            const user = await models.users.findAll({
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
    get : async ({username, userId}) => {
        try {
            const user = await models.users.findOne({
                attributes: ["name", "username", "email"], // to select specfic data member from database
                // attributes: {
                //     exclude: ["password", "createdAt", "updatedAt"],    // remove specific datamember 
                // },
                where: {
                    ...(userId ? {userId: userId} : true),
                    ...(username ? {username: username} : true),
                },   
            });
            return{
                response: user,
            }
        } catch (error) {
            return{
                error: error,
            }
        }
    },
    updateUser : async ({username, ...body}) => {
        try {
            const user = await models.users.update(
                {
                ...body,
            },
            {
                where : {
                    username: username,
                },
            });
            return{
                response: user,
            }
        } catch (error) {
            return{
                error: error,
            }
        }
    },
    deleteUser : async ( {username} ) => {
        try {
            const user = await models.users.destroy({
                where: {
                    username: username
                }
            })
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