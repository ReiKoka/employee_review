import { ReactNode } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuGoal, LuNetwork } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

export type LinkType = {
  text: string;
  path: string;
  icon: ReactNode;
};

export const adminLinks: LinkType[] = [
  {
    text: "Dashboard",
    path: "/home",
    icon: <RxDashboard className="flex h-6 w-6 items-center justify-center" />,
  },
  {
    text: "Users",
    path: "/home/users",
    icon: (
      <HiOutlineUsers className="flex h-6 w-6 items-center justify-center" />
    ),
  },
  {
    text: "Departments",
    path: "/home/departments",
    icon: <LuNetwork />,
  },
  {
    text: "Goals",
    path: "/home/goals",
    icon: <LuGoal />,
  },
];

export const managerLinks: LinkType[] = [
  {
    text: "Dashboard",
    path: "/home",
    icon: <RxDashboard className="flex h-6 w-6 items-center justify-center" />,
  },
  {
    text: "Employees",
    path: "/home/users",
    icon: (
      <HiOutlineUsers className="flex h-6 w-6 items-center justify-center" />
    ),
  },
  {
    text: "Departments",
    path: "/home/departments",
    icon: <LuNetwork />,
  },
  {
    text: "Goals",
    path: "/home/goals",
    icon: <LuGoal />,
  },
];

export const employeeLinks: LinkType[] = [
  {
    text: "Dashboard",
    path: "/home",

    icon: <RxDashboard className="flex h-6 w-6 items-center justify-center" />,
  },
  {
    text: "My Goals",
    path: "/home/goals",

    icon: (
      <HiOutlineUsers className="flex h-6 w-6 items-center justify-center" />
    ),
  },
  {
    text: "My Reviews",
    path: "/home/reviews",
    icon: (
      <FaRegCommentDots className="flex h-6 w-6 items-center justify-center" />
    ),
  },
];
