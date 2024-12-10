const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const {v4: uuid} = require("uuid");

class cart extends Model { }

cart.init({
    adminId: {
        primaryKey: true,
        type: DataTypes.STRING(100),
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