import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "@/components/Actions";
import { formatDate } from "date-fns";

export type UserTableColumnsType = {
  id: number;
  name: string;
  email?: string;
  departmentName: string;
  role: "employee" | "manager" | "admin";
};

const index = 2;
const email = {
  accessorKey: "email",
  header: "Email",
};

export const sharedColumns: ColumnDef<UserTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "departmentName",
    header: "Department",
    cell: ({ row }) => row.original.departmentName || "N/A",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell data={row.original} text="user" />,
  },
];

export const dashboardPageColumns: ColumnDef<UserTableColumnsType>[] = [
  ...sharedColumns,
];

export const usersPageColumns: ColumnDef<UserTableColumnsType>[] = [
  ...sharedColumns.slice(0, index),
  email,
  ...sharedColumns.slice(index),
];

/////////////////////////////////////////////////// Reviews /////////////////////////////////////////////////

export type ReviewsTableColumnsType = {
  id: number;
  comments: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewerName: string;
};

export const ReviewsColumns: ColumnDef<ReviewsTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "reviewerName",
    header: "Reviewer Name",
    cell: ({ row }) => row.original.reviewerName || "",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell data={row.original} text="review" />,
  },
];

export type EmployeeAndManagerReviewTableColumnsType = {
  id: number;
  comments: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewerId: number;
};

export const EmployeeAndManagerReviewColumns: ColumnDef<EmployeeAndManagerReviewTableColumnsType>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "comments",
      header: "Comments",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "reviewerId",
      header: "Reviewer Id",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell data={row.original} text="review" />,
    },
  ];

/////////////////////////////////////////////////// Departments /////////////////////////////////////////////////

export type DepartmentsTableColumnsType = {
  id: number;
  name: string;
  managerId: number;
  managerName: string;
  employees: number;
};

export const DepartmentsColumns: ColumnDef<DepartmentsTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "managerId",
    header: "Manager ID",
    cell: ({ row }) => row.original.managerId,
  },
  {
    accessorKey: "managerName",
    header: "Manager Name",
    cell: ({ row }) => row.original.managerName,
  },
  {
    id: "employees",
    header: "Employees",
    cell: ({ row }) => row.original.employees,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell data={row.original} text="department" />,
  },
];

export const DepartmentsManagerColumns: ColumnDef<DepartmentsTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "managerId",
    header: "Manager ID",
    cell: ({ row }) => row.original.managerId,
  },
  {
    accessorKey: "managerName",
    header: "Manager Name",
    cell: ({ row }) => row.original.managerName,
  },
  {
    id: "employees",
    header: "Employees",
    cell: ({ row }) => row.original.employees,
  },
];

/////////////////////////////////////////////////// Goals /////////////////////////////////////////////////

export type GoalsTableColumnsType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  employeeName: string;
};

export const GoalsColumns: ColumnDef<GoalsTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "dueDate",
    header: "Deliver by",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell data={row.original} text="goal" />,
  },
];

/////////////////////// Employee Goal Table Columns /////////////////////////

export interface MyGoalsTableDashboardColumnsType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export const MyGoalsDashboardColumns: ColumnDef<MyGoalsTableDashboardColumnsType>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "dueDate",
      header: "Deliver by",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell data={row.original} text="goal" />,
    },
  ];

export interface MyGoalsTableColumnsType extends MyGoalsTableDashboardColumnsType {
  createdAt: string;
}

export const MyGoalsColumns: ColumnDef<MyGoalsTableColumnsType>[] = [
  ...(MyGoalsDashboardColumns as ColumnDef<MyGoalsTableColumnsType>[]).slice(0, 2),
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  ...(MyGoalsDashboardColumns as ColumnDef<MyGoalsTableColumnsType>[]).slice(2),

];

////////////////////////////////////////////// Feedbacks ////////////////////////////////////////////////////////////

export type FeedbacksTableColumnsType = {
  id: number;
  text: string;
  date: string;
  reviewerName: string;
};

export const FeedbacksColumns: ColumnDef<FeedbacksTableColumnsType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "text",
    header: "Feedback",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      formatDate(new Date(row.original.date), "iii, LLL dd yyyy"),
  },
  {
    accessorKey: "reviewerId",
    header: "Reviewer Id",
  },
  {
    accessorKey: "managerName",
    header: "Manager Name",
    cell: ({ row }) =>
      "reviewerName" in row.original ? row.original.reviewerName : "",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell data={row.original} text="feedback" />,
  },
];

/////////////////////// Employee and Manager Feedbacks Table Columns /////////////////////////
export type FeedbacksTableManagerEmployeeColumnsType = {
  id: number;
  text: string;
  date: string;
  reviewerId: number;
};

export const FeedbacksManagerEmployeeColumns: ColumnDef<FeedbacksTableManagerEmployeeColumnsType>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "text",
      header: "Feedback",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) =>
        formatDate(new Date(row.original.date), "iii, LLL dd yyyy"),
    },
    {
      accessorKey: "reviewerId",
      header: "Reviewer Id",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell data={row.original} text="feedback" />,
    },
  ];
