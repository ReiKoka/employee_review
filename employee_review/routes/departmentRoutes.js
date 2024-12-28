import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
  getAllDepartmentsManager,
} from "../controllers/departmentController.js";
import { authenticate, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

/** Admin Routes */

router.get(
  "/admin/getall",
  authenticate,
  checkRole("admin"),
  getAllDepartments
);
router.post(
  "/admin/create",
  authenticate,
  checkRole("admin"),
  createDepartment
);
router.put(
  "/admin/update/:id",
  authenticate,
  checkRole("admin"),
  updateDepartment
);
router.delete(
  "/admin/delete/:id",
  authenticate,
  checkRole("admin"),
  deleteDepartment
);

/** End Admin Routes */

/** Manager Routes */
router.get(
  "/manager/getall",
  authenticate,
  checkRole("manager"),
  getAllDepartments
);
router.get(
  "/manager/getallmine",
  authenticate,
  checkRole("manager"),
  getAllDepartmentsManager
);

/** End Manager Routes */

export default router;
