import { URL } from "@/utils/constants";
import { User } from "@/utils/types";
import axios from "axios";

// prettier-ignore
export const registerAdmin = async ( newAdmin: {name: string;email: string; password: string;}): Promise<User> => {
  try {
    const response = await axios.post(`${URL}/auth/register`, newAdmin);
    if (response.status !== 201) throw new Error(`Error creating new admin, ${response.statusText}`,);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (user: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await axios.post(`${URL}/auth/login`, user);
    if (response.status !== 200)
      throw new Error(`Error logging in ${response.statusText}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMe = async (token: string): Promise<User> => {
  try {
    const response = await axios.post(
      `${URL}/auth/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) throw new Error("Error getting the data");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
