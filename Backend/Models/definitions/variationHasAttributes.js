const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid } = require("uuid");

class variationHasAttributes extends Model {}

variationHasAttributes.init(
    {
        variationHasAttributeId: {
            primaryKey: true,
            type: DataTypes.STRING(1000),
        },
        productId: {
            type: DataTypes.STRING(1000),
            references: {
                model: "products", // Table name
                key: "productId", // Column name
            },
        },
    },
    {
        sequelize: connection,
        modelName: "variationHasAttributes",
        timestamps: true,
        paranoid: true,
    }
);

variationHasAttributes.beforeCreate(async (variationHasAttribute) => {
    variationHasAttribute.variationHasAttributeId = uuid();
});

module.exports = variationHasAttributes;
