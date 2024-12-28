import express from 'express';
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getAllReviewsManager,
    getAllReviewsEmployees
} from '../controllers/reviewController.js';
import { authenticate, checkRole } from "../middlewares/authMiddleware.js"
const router = express.Router();


/** Admin routes */

router.get('/admin/getall', authenticate, checkRole("admin"), getAllReviews);
router.get('/admin/getone/:id', authenticate, checkRole("admin"), getReviewById);
router.post('/admin/create', authenticate, checkRole("admin"), createReview);
router.put('/admin/update/:id', authenticate, checkRole("admin"), updateReview);
router.delete('/admin/delete/:id', authenticate, checkRole("admin"), deleteReview);

/** End Admin routes */


/** Manager routes */

router.get('/manager/getall', authenticate, checkRole("manager"), getAllReviewsManager);
router.get('/manager/getone/:id', authenticate, checkRole("manager"), getReviewById);
router.post('/manager/create', authenticate, checkRole("manager"), createReview);
router.put('/manager/update/:id', authenticate, checkRole("manager"), updateReview);
router.delete('/manager/delete/:id', authenticate, checkRole("manager"), deleteReview);

/** End Manager routes */


/** Employee routes */
router.get('/employee/getall', authenticate, checkRole("employee"), getAllReviewsEmployees);
router.get('/employee/getone/:id', authenticate, checkRole("employee"), getReviewById);
/** End Employee routes */


export default router;
