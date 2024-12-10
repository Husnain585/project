const connection = require("../../dbConnection");
const {v4 : uuid } = require("uuid");
const { Model, DataTypes } = require("sequelize");

class cartItem extends Model { }

cartItem.init({
    cartItemId: {
        primaryKey: true,
        type: DataTypes.STRING(),
    },
},
    {
        name: "cartItem",
        timestamps: true,
        paranoid: true,
        sequelize: connection,
    }
);

cartItem.beforeCreate(async (cartItem) => {
    cartItem.cartItemId = await uuid();
});

module.exports = cartItem;