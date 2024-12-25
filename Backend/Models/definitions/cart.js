const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const {v4: uuid} = require("uuid");

const users = require("./users");

class cart extends Model { }

cart.init({
    cartId: {
        primaryKey: true,
        type: DataTypes.STRING(100),
    },
    userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: users,
            key: "userId",
        },
    },
},
    {
        name: "cart",
        timestamps: true,
        paranoid: true,
        sequelize: connection,
    },
);

cart.beforeCreate(async (cart) => {
        cart.cartId =  await uuid();
    });

module.exports = cart;