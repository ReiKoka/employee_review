import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Goal = sequelize.define('Goal', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    dueDate: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }, 
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true
});

export default Goal;
