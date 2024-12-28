import {
  Department,
  Feedback,
  Goal,
  GoalStatusType,
  Review,
  RoleType,
  User,
} from "./types";

export const createUsersWithDepartments = (
  allUsers: User[],
  allDepartments: Department[],
) => {
  return allUsers?.map((user) => {
    const department = allDepartments?.find(
      (department) => department.id === user.departmentId,
    );
    return {
      ...user,
      departmentName: department ? department.name : "",
    };
  });
};

export const createUserWithDepartment = (
  user: User,
  allDepartments: Department[],
) => {
  const department = allDepartments?.find(
    (department) => department.id === user.departmentId,
  );
  return { ...user, departmentName: department ? department.name : "N/A" };
};

export const createGoalWithEmployeeName = (goal: Goal, users: User[]) => {
  const user = users?.find((user) => user.id === goal.employeeId);
  return { ...goal, employeeName: user ? user.name : "" };
};

export const matchReviewsWithManagers = (reviews: Review[], users: User[]) => {
  const matchedReviews = reviews.map((review) => {
    const manager = users.find((user) => user.id === review.reviewerId);
    console.log(manager);
    return {
      ...review,
      reviewerName: manager ? manager.name : "",
    };
  });

  return matchedReviews;
};

export const matchFeedbacksWithReviewerName = (
  feedbacks: Feedback[],
  users: User[],
) => {
  const matchedReviews = feedbacks.map((feedback) => {
    const manager = users.find(
      (user) =>
        (user.id === feedback.reviewerId && user.role === "manager") || "admin",
    );
    return {
      ...feedback,
      reviewerName: manager ? manager.name : "",
    };
  });

  return matchedReviews;
};

export const matchGoalsWithEmployeeName = (goals: Goal[], users: User[]) => {
  const matchedGoals = goals.map((goal) => {
    const user = users?.find((user) => user.id === goal.employeeId);
    return {
      ...goal,
      employeeName: user ? user.name : "",
    };
  });
  return matchedGoals;
};

export const capitalizeFirstLetter = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getCamelCaseRoot = (value: string) => {
  const match = value.match(/^[a-z]+/);
  return match ? match[0] : value;
};

export const formatTime = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

export const setAvatarImage = (role: RoleType) => {
  switch (role) {
    case "admin":
      return "/uifaces-popular-image.jpg";
    case "manager":
      return "../../public/employee.jpg";
    case "employee":
      return "";
  }
};

export const setBadge = (str: RoleType | GoalStatusType) => {
  switch (str) {
    case "admin":
      return "first";
    case "manager":
      return "second";
    case "employee":
      return "third";
    case "pending":
      return "first";
    case "in-progress":
      return "second";
    case "completed":
      return "third";
  }
};
