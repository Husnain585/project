const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { string } = require("joi");
const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");

class sampleUsers extends Model { }

sampleUsers.init(
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
        name: "sampleUsers",
        timestamps: true,
        paranoid: true,     // deleted at 
        sequelize: connection,
    },
);

sampleUsers.beforeCreate(async (user) => {
    user.userId = uuid();
    user.password = await hash(user.password, 10);
})

sampleUsers.afterCreate(user => {
    delete user.dataValues.password;
})

module.exports = sampleUsers;


