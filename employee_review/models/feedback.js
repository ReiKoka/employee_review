import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    text: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    goalId: { type: DataTypes.INTEGER, allowNull: false },
    reviewerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

export default Feedback;
