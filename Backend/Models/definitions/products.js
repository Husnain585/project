const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid } = require("uuid");

class Products extends Model {}

Products.init(
    {
        productId: {
            primaryKey: true,
            type: DataTypes.STRING(1000),
        },
        name: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        vendorId: {
            type: DataTypes.STRING(1000),
            references: {
                model: "vendors", 
                key: "vendorId", 
            },
        },
    },
    {
        sequelize: connection,
        modelName: "products",
        timestamps: true,
        paranoid: true,
    }
);

Products.beforeCreate(async (product) => {
    product.productId = uuid();
});

module.exports = Products;