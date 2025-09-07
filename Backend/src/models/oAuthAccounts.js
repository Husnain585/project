// models/oauthAccount.js
const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");

class OAuthAccount extends Model {}

OAuthAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    provider: {
      type: DataTypes.STRING(50), // "google", "github", "apple"
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING(255), // the unique ID from provider (sub, id)
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "OAuthAccount",
    tableName: "oauth_accounts",
    timestamps: true,
    paranoid: true, // soft delete in case you want to unlink
  }
);

module.exports = OAuthAccount;
