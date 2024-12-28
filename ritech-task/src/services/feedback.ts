import { URL } from "@/utils/constants";
import {
  AddFeedbackDataType,
  EditFeedbackDataType,
  Feedback,
} from "@/utils/types";
import axios from "axios";

// prettier-ignore
export const getAllFeedbacksForGoal = async (id: number, token: string, role: string): Promise<Feedback[]> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    const response = await axios.get<Feedback[]>(`${URL}/feedbacks/${role}/getall/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error(`Could not get all feedbacks`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFeedbackById = async (
  id: number,
  token: string,
  role: string,
): Promise<Feedback> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    const response = await axios.get<Feedback>(
      `${URL}/feedbacks/${role}/getone/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200)
      throw new Error(`Could not get feedback with ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// prettier-ignore
export const createFeedback = async (id: number, newFeedback: AddFeedbackDataType, token: string, role: string): Promise<Feedback> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }
  try {
    const response = await axios.post<Feedback>(
      `${URL}/feedbacks/${role}/create/${id}`,
      newFeedback,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 201) throw new Error(`Could not create new feedback!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// prettier-ignore
export const updateFeedback = async (id: number, updatedFeedback: EditFeedbackDataType, token: string, role: string): Promise<Feedback> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    const response = await axios.put<Feedback>(
      `${URL}/feedbacks/${role}/update/${id}`,
      updatedFeedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) throw new Error(`Could not update feedback!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFeedback = async (
  id: number,
  token: string,
  role: string,
): Promise<void> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    await axios.delete(`${URL}/feedbacks/${role}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
