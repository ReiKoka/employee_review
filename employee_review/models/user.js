import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    departmentId: { type: DataTypes.INTEGER, allowNull: true },
    access_token: { type: DataTypes.STRING, allowNull: true },
    access_token_expires: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: true,
  }
);

export default User;
