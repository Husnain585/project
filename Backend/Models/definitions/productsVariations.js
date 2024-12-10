const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const {v4: uuid} = require("uuid");

class productsVariations extends Model { }

productsVariations.init({
    productsVariationId: {
        primaryKey: true,
        type: DataTypes.STRING(100),
    },
    productId: {
        type: DataTypes.STRING(),
        allowNull: false,
        references: {
            model: 'products',
            key: 'productId',
        },
    },
},
    {
        name: "productVariations",
        timestamps: true,
        paranoid: true,
        sequelize: connection,
    },
);

productsVariations.beforeCreate(async (productsVariation) => {
    productsVariation.productsVariationId =  await uuid();
    });

module.exports = productsVariations; 