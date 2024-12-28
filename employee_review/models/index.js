import User from './user.js';
import Department from './department.js';
import Goal from './goal.js';
import Review from './review.js';
import Feedback from './feedback.js';

Department.hasMany(User, { foreignKey: 'departmentId' , as : "employees" });
User.belongsTo(Department, { foreignKey: 'departmentId' });
Department.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

User.hasMany(Goal, { foreignKey: 'employeeId' });
Goal.belongsTo(User, { foreignKey: 'employeeId' });

User.hasMany(Review, { foreignKey: 'employeeId' });
Review.belongsTo(User, { foreignKey: 'employeeId' });

Goal.hasMany(Feedback, { foreignKey: 'goalId' });
Feedback.belongsTo(Goal, { foreignKey: 'goalId' });

User.hasMany(Feedback, { foreignKey: 'reviewerId' });
Feedback.belongsTo(User, { foreignKey: 'reviewerId' });

export { User, Department, Goal, Review, Feedback };
