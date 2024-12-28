import { URL } from "@/utils/constants";
import { AddGoalType, Goal, UpdateGoalType } from "@/utils/types";
import axios from "axios";

export const getAllGoals = async (
  token: string,
  role: string,
): Promise<Goal[]> => {
  try {
    const response = await axios.get<Goal[]>(`${URL}/goals/${role}/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error(`Could not get all goals!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGoalById = async (
  id: number,
  token: string,
  role: string,
): Promise<Goal> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid goal ID provided.");
  }
  try {
    const response = await axios.get<Goal>(
      `${URL}/goals/${role}/getone/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200)
      throw new Error(`Could not get goal with goal ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addGoal = async (
  newGoal: AddGoalType,
  token: string,
  role: string,
): Promise<Goal> => {
  try {
    const response = await axios.post<Goal>(
      `${URL}/goals/${role}/create`,
      newGoal,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 201) throw new Error(`Could not create new goal!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGoal = async (
  id: number,
  updatedGoal: UpdateGoalType,
  token: string,
  role: string,
): Promise<Goal> => {
  try {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid goal ID provided.");
    }
    const response = await axios.put<Goal>(
      `${URL}/goals/${role}/update/${id}`,
      updatedGoal,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) throw new Error(`Could not update goal!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGoal = async (
  id: number,
  token: string,
  role: string,
): Promise<void> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid goal ID provided.");
  }

  try {
    const response = await axios.delete(`${URL}/goals/${role}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) throw new Error("Could not delete feedback!")
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
