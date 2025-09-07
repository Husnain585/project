const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const User = require("./users");

class EmailCheck extends Model {}

EmailCheck.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "EmailCheck",
    tableName: "email_checks",
    timestamps: true,
  }
);


module.exports = EmailCheck;
