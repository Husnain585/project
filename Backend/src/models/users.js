const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");

class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password; // hide password when serializing
    return values;
  }
}

User.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: true, // <-- allow NULL for OAuth users
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // <-- enforce one user per email
      validate: { isEmail: true },
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true, // soft delete
  }
);

module.exports = User;
