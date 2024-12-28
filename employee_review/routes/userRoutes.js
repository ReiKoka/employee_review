import express from 'express';
import {
    getAllUsers,
    addUser,
    deleteUser,
    getAllUsersManager,
    getUserById,
    updateUser
} from '../controllers/userController.js';

import { authenticate, checkRole } from "../middlewares/authMiddleware.js"

const router = express.Router();

/** Admin Routes */

router.get('/admin/getall', authenticate, checkRole("admin"), getAllUsers);
router.get('/admin/getone/:id', authenticate, checkRole("admin"), getUserById)
router.post('/admin/adduser', authenticate, checkRole("admin"), addUser);
router.put('/admin/update/:id', authenticate, checkRole("admin"), updateUser);
router.delete('/admin/deleteuser/:id', authenticate, checkRole("admin"), deleteUser);
/** End Admin Routes */


/** Manager Routes */

router.get('/manager/getall', authenticate, checkRole("manager"), getAllUsersManager);
router.get('/manager/getone/:id', authenticate, checkRole("manager"), getUserById)
router.post('/manager/adduser', authenticate, checkRole("manager"), addUser);
router.put('/manager/update/:id', authenticate, checkRole("manager"), updateUser);
router.delete('/manager/deleteuser/:id', authenticate, checkRole("manager"), deleteUser);
/** End Manager Routes */


export default router;
