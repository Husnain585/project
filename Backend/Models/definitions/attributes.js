const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const {v4: uuid} = require("uuid");

class attributes extends Model { }

attributes.init({
    attributeId: {
        primaryKey: true,
        type: DataTypes.STRING(100),
    }
},
    {
        name: "attributes",
        timestamps: true,
        paranoid: true,
        sequelize: connection,
    },
);

attributes.beforeCreate(async (attributes) => {
    attributes.attributeId =  await uuid();
    });

module.exports = attributes;