import { Department, User } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

/**** Admin Controllers */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "name", "role", "departmentId"],
      where: {
        id: {
          [Op.ne]: req.user.data.id,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user", details: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role, department_id } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    if (role === "employee" && !department_id) {
      return res.status(400).json({ message: "Department is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      departmentId: department_id,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register user", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, departmentId } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== user.id) {
      return res.status(400).json({ message: "Email already taken" });
    }

    await user.update({ name, email, role, departmentId: departmentId });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update user", details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id) === req.user.data.id) {
      return res.status(400).json({ error: "Cant delete that user" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete user", details: error.message });
  }
};

/**** End Admin Controllers */

/** Manager routes */

export const getAllUsersManager = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "name", "role", "departmentId"],
      where: {
        id: {
          [Op.ne]: req.user.data.id,
        },
        role: {
          [Op.eq]: "employee",
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

/** Manager routes */
