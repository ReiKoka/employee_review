import express from 'express';
import {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} from '../controllers/feedbackController.js';
import { authenticate, checkRole } from "../middlewares/authMiddleware.js"

const router = express.Router();


/** Admin routes */

router.get('/admin/getall/:goalid', authenticate, checkRole("admin"), getAllFeedbacks);
router.get('/admin/getone/:id', authenticate, checkRole("admin"), getFeedbackById);
router.post('/admin/create/:goalid', authenticate, checkRole("admin"), createFeedback);
router.put('/admin/update/:id', authenticate, checkRole("admin"), updateFeedback);
router.delete('/admin/delete/:id', authenticate, checkRole("admin"), deleteFeedback);

/** End Admin routes */

/** Manager routes */

router.get('/manager/getall/:goalid', authenticate, checkRole("manager"), getAllFeedbacks);
router.get('/manager/getone/:id', authenticate, checkRole("manager"), getFeedbackById);
router.post('/manager/create/:goalid', authenticate, checkRole("manager"), createFeedback);
router.put('/manager/update/:id', authenticate, checkRole("manager"), updateFeedback);
router.delete('/manager/delete/:id', authenticate, checkRole("manager"), deleteFeedback);

/** End Manager routes */


/** Employee routes */

router.get('/employee/getall/:goalid', authenticate, checkRole("employee"), getAllFeedbacks);

/** End Employee routes */


export default router;
