import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticate } from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post('/me', authenticate, getMe)
router.post('/register', register);
router.post('/login', login);

export default router;
