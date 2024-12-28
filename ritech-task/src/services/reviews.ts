import { URL } from "@/utils/constants";
import { AddReviewDataType, EditReviewDataType, Review } from "@/utils/types";
import axios from "axios";

//prettier-ignore
export const getAllReviews = async (token: string, role: string): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>(
      `${URL}/reviews/${role}/getall`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) throw new Error("Could not get reviews!");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//prettier-ignore
export const getReviewById = async (id: number, token: string, role: string): Promise<Review> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid review ID provided.");
  }

  try {
    const response = await axios.get<Review>(
      `${URL}/reviews/${role}/getone/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200)
      throw new Error(`Unable to get review with ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//prettier-ignore
export const createReview = async (newReview: AddReviewDataType , token: string , role: string): Promise<Review> => {
  try {
    const response = await axios.post<Review>(
      `${URL}/reviews/${role}/create`,
      newReview,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 201) throw new Error(`Error creating new review`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// prettier-ignore
export const updateReview = async (id: number, updatedReview: EditReviewDataType, token: string, role: string): Promise<Review> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid review ID provided.");
  }

  try {
    const response = await axios.put<Review>(`${URL}/reviews/${role}/update/${id}`, updatedReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error(`Unable to update review with ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//prettier-ignore
export const deleteReview = async (id: number, token: string, role: string): Promise<string> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    const response = await axios.delete(`${URL}/reviews/${role}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error('Failed deleting review')
    return response.statusText
  } catch (error) {
    console.error(error);
    throw error;
  }
};
