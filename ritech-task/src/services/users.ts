import { URL } from "@/utils/constants";
import { AddUserDataType, EditUserDataType, User } from "@/utils/types";
import axios from "axios";

export const getAllUsers = async (token: string, role: string): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${URL}/users/${role}/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error("Could not get users!");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: number, token: string, role: string): Promise<User> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid user ID provided.");
  }

  try {
    const response = await axios.get<User>(`${URL}/users/${role}/getone/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status !== 200)
      throw new Error(`Could not get user with ID: ${id}. `);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUser = async (
  newUser: AddUserDataType,
  token: string,
  role: string
): Promise<User> => {
  try {
    const response = await axios.post<User>(
      `${URL}/users/${role}/adduser`,
      newUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    if (response.status !== 201) throw new Error(`Failed to create new user!`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  updatedUser: EditUserDataType,
  token: string,
  role: string
): Promise<User> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid user ID provided.");
  }
  try {
    const response = await axios.put<User>(
      `${URL}/users/${role}/update/${id}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response) throw new Error(`Could not update user with ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: number, token: string, role: string): Promise<void> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid user ID provided.");
  }

  try {
    await axios.delete(`${URL}/users/${role}/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
