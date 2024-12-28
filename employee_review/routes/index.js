import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import goalRoutes from './goalRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/goals', goalRoutes);
router.use('/reviews', reviewRoutes);
router.use('/feedbacks', feedbackRoutes);

export default router;
