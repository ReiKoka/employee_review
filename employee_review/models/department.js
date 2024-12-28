import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Department = sequelize.define("Department", {
  name: { type: DataTypes.STRING, allowNull: false },
  managerId: { type: DataTypes.INTEGER, allowNull: true },
}, {
    timestamps: false
});

export default Department;
