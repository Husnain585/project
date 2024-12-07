const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid} = require("uuid");
const { hash } = require("bcrypt");

class users extends Model { }
users.init({
    userId: {
        type: DataTypes.STRING(),
        primaryKey: true,
        allowNull: false
    }
},
    {
        name: "users",
        paranoid: true,
        timestamps: true,
        sequelize: connection,
    });

users.beforeCreate(async (user) => {
    user.userId = await uuid();
    user.password =  hash(user.password, 10);
})

module.exports = users;