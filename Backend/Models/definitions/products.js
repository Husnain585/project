const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");

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
                model: "vendors", // Table name
                key: "vendorId", // Column name
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
    product.password = hash(product.password, 10);
});

module.exports = Products;