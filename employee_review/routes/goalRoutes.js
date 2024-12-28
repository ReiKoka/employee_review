import express from 'express';
import {
    getAllGoals,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
    getAllGoalsEmployee,
    updateGoalEmploye
} from '../controllers/goalController.js';
import { authenticate, checkRole } from "../middlewares/authMiddleware.js"

const router = express.Router();

/** Admin routes */

router.get('/admin/getall', authenticate, checkRole("admin"), getAllGoals);
router.get('/admin/getone/:id', authenticate, checkRole("admin"), getGoalById);
router.post('/admin/create', authenticate, checkRole("admin"), createGoal);
router.put('/admin/update/:id', authenticate, checkRole("admin"), updateGoal);
router.delete('/admin/delete/:id', authenticate, checkRole("admin"), deleteGoal);

/** End Admin routes */


/** Manager routes */

router.get('/manager/getall', authenticate, checkRole("manager"), getAllGoals);
router.get('/manager/getone/:id', authenticate, checkRole("manager"), getGoalById);
router.post('/manager/create', authenticate, checkRole("manager"), createGoal);
router.put('/manager/update/:id', authenticate, checkRole("manager"), updateGoal);
router.delete('/manager/delete/:id', authenticate, checkRole("manager"), deleteGoal);

/** End Manager routes */


/** Manager routes */

router.get('/employee/getall', authenticate, checkRole("employee"), getAllGoalsEmployee);
router.get('/employee/getone/:id', authenticate, checkRole("employee"), getGoalById);
router.put('/employee/update/:id', authenticate, checkRole("employee"), updateGoalEmploye);

/** End Manager routes */

export default router;
