const {models} = require("./sampleIndex");
module.exports = {
    createUser : async (body) => {
        try {
            console.log("check")
            const user = await models.sampleUser.create({
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
            const user = await models.sampleUser.findAll({
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
            const user = await models.sampleUser.findOne({
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
            const user = await models.sampleUser.update(
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
            const user = await models.sampleUser.destroy({
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