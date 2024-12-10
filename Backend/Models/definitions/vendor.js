const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { v4: uuid } = require("uuid");

class Vendors extends Model {}

Vendors.init(
    {
        vendorId: {
            primaryKey: true, // Fixed primary key
            type: DataTypes.STRING(1000),
        },
        username: {
            type: DataTypes.STRING(600),
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "vendors",
        timestamps: true,
        paranoid: true,
    }
);

Vendors.beforeCreate(async (vendor) => {
    vendor.vendorId = uuid();
});

module.exports = Vendors;
