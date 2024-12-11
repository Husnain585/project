const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid } = require("uuid");

class users extends Model { }

users.init(
    {
        userId: {
            primaryKey: true,
            type: DataTypes.STRING(100),
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(600),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
        },
    },
    {
        name: "users",
        timestamps: true,
        paranoid: true,     // deleted at 
        sequelize: connection,
    },
);

users.beforeCreate(async (user) => {
    user.userId = uuid();
})

users.afterCreate(user => {
    delete user.dataValues.password;
})

module.exports = users;


