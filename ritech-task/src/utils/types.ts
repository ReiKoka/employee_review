export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType extends LoginType {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: RoleType;
  access_token: string;
  departmentId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithDepartmentName extends User {
  departmentName: string;
}

interface BaseUserMutationDataType {
  name: string;
  email: string;
}

export interface EditUserDataType extends BaseUserMutationDataType {
  role: RoleType;
  department_id: number;
}

export interface AddUserDataType extends EditUserDataType {
  password: string;
}

export interface AddAdminDataType extends BaseUserMutationDataType {
  password: string;
}

export type Department = {
  id: number;
  name: string;
  manager: { name: string; email: string; id: number; role: string };
  employees: { name: string; email: string; id: number }[];
};

export interface MutateDepartmentDataType {
  manager_id: number;
  name: string;
}

export type Review = {
  id: number;
  comments: string;
  rating: 1 | 2 | 3 | 4 | 5;
  employeeId: number;
  reviewerId: number;
  createdAt: string;
  updatedAt: string;
};

export interface EditReviewDataType {
  comments: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface AddReviewDataType extends EditReviewDataType {
  employeeId: number;
}

export type Goal = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: GoalStatusType;
  employeeId: number;
  createdAt: string;
  updatedAt: string;
};

export interface GoalWithEmployeeName extends Goal {
  employeeName: string;
}

export interface UpdateGoalDataType {
  title: string;
  description: string;
  dueDate: string;
  status: GoalStatusType;
}

export interface AddGoalDataType extends UpdateGoalDataType {
  employeeId: number;
}

export type Feedback = {
  id: number;
  text: string;
  date: string;
  goalId: number;
  reviewerId: number;
  createdAt: string;
  updatedAt: string;
};

export interface EditFeedbackDataType {
  text: string;
}

export interface AddFeedbackDataType extends EditFeedbackDataType {
  reviewerId: number;
}

export type RoleType = "manager" | "employee" | "admin";
export type GoalStatusType = "pending" | "in-progress" | "completed";
