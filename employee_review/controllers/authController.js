import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { generateAccessToken, getUnixExpiry } from "../utils/general.js";

export const getMe = async (req, res) => {
  try {
    const user = req.user.data;
    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      id: user.id,
      access_token: user.access_token,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", test: err });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register Admin", details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const access_token = generateAccessToken(user);
    const access_token_expires = getUnixExpiry(10080);
    await user.update({
      access_token,
      access_token_expires,
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId,
      access_token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", test: err.message });
  }
};
