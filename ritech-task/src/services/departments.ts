import { URL } from "@/utils/constants";
import { MutateDepartmentDataType, Department } from "@/utils/types";
import axios from "axios";

export const getAllDepartments = async (
  token: string,
  role: string,
): Promise<Department[]> => {
  try {
    const response = await axios.get<Department[]>(
      `${URL}/departments/${role}/getall`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) throw new Error(`Could not get departments! `);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllDepartmentsOfManager = async (
  token: string,
  role: string,
): Promise<Department[] | undefined> => {
  try {
    if (role !== "manager") return;
    const response = await axios.get<Department[]>(
      `${URL}/departments/${role}/getallmine`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200)
      throw new Error(`Could not get your departments`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// prettier-ignore
export const createDepartment = async (newDepartment: MutateDepartmentDataType, token: string, role: string): Promise<Department> => {
  try {
    const response = await axios.post<Department>(`${URL}/departments/${role}/create`, newDepartment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 201) throw new Error(`Could not create a new department!`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// prettier-ignore
export const updateDepartment = async (id: number, updatedValues: MutateDepartmentDataType, token: string, role: string): Promise<Department> => {
  try {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid department ID provided.");
    }
    const response = await axios.put<Department>(
      `${URL}/departments/${role}/update/${id}`,
      updatedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200)
      throw new Error(`Unable to update department with ID: ${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDepartment = async (
  id: number,
  token: string,
  role: string,
): Promise<void> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid department ID provided.");
  }

  try {
    const response = await axios.delete(
      `${URL}/departments/${role}/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) throw new Error("Failed to delete department");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
