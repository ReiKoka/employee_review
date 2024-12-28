import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

// prettier-ignore
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
// prettier-ignore
import {DepartmentsTableColumnsType,GoalsTableColumnsType,ReviewsTableColumnsType,UserTableColumnsType, FeedbacksTableColumnsType, MyGoalsTableColumnsType, FeedbacksTableManagerEmployeeColumnsType, MyGoalsTableDashboardColumnsType, EmployeeAndManagerReviewTableColumnsType} from "@/utils/tableUtils/columns";
import { useModal } from "@/context/ModalContext";
import { useIds } from "@/context/IdsContext";
import { useAuth } from "@/context/AuthContext";
import {} from "./../utils/tableUtils/columns";

type DataType =
  | UserTableColumnsType
  | GoalsTableColumnsType
  | MyGoalsTableDashboardColumnsType
  | MyGoalsTableColumnsType
  | ReviewsTableColumnsType
  | EmployeeAndManagerReviewTableColumnsType
  | FeedbacksTableColumnsType
  | FeedbacksTableManagerEmployeeColumnsType
  | DepartmentsTableColumnsType
  | MyGoalsTableColumnsType;

type ActionsCellTypes = {
  data: DataType;
  text: "user" | "goal" | "review" | "department" | "feedback";
};

function ActionsCell({ data, text }: ActionsCellTypes) {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();
  const { handleClick } = useIds();
  const { user } = useAuth();

  // Type guard for UserTableColumns
  const isUserTableColumns = (data: DataType): data is UserTableColumnsType => {
    return (
      data &&
      typeof data.id === "number" &&
      "role" in data &&
      "departmentName" in data
    );
  };

  // Type guard for GoalsTableColumns
  const isGoalsTableColumns = (
    data: DataType,
  ): data is GoalsTableColumnsType => {
    return (
      data &&
      typeof data.id === "number" &&
      "title" in data &&
      "dueDate" in data &&
      "status" in data
    );
  };

  // Type guard for EmployeeAndManagerReviewTableColumns
  const isEmployeeAndManagerReviewTableColumns = (
    data: DataType,
  ): data is EmployeeAndManagerReviewTableColumnsType => {
    return (
      data &&
      typeof data.id === "number" &&
      "comments" in data &&
      "rating" in data &&
      "reviewerId" in data
    );
  };

  // Type guard for FeedbacksTableManagerEmployeeColumns
  const isFeedbacksTableManagerEmployeeColumns = (
    data: DataType,
  ): data is FeedbacksTableManagerEmployeeColumnsType => {
    return (
      data &&
      typeof data.id === "number" &&
      "text" in data &&
      "date" in data &&
      "reviewerId" in data
    );
  };

  function isReviewsTableColumns(
    data: DataType,
  ): data is ReviewsTableColumnsType {
    return "rating" in data;
  }

  function isFeedbacksTableColumns(
    data: DataType,
  ): data is FeedbacksTableColumnsType {
    return "text" in data;
  }

  function handleEditClick() {
    if (isReviewsTableColumns(data)) {
      handleClick(data.id);
      openModal("editReview");
      return;
    }

    if (isFeedbacksTableColumns(data)) {
      handleClick(data.id);
      openModal("editFeedback");
      return;
    }

    handleClick(data.id);
    openModal("edit");
  }

  function handleDeleteClick() {
    if (isReviewsTableColumns(data)) {
      handleClick(data.id);
      openModal("deleteReview");
      return;
    }

    if (isFeedbacksTableColumns(data)) {
      handleClick(data.id);
      openModal("deleteFeedback");
      return;
    }

    handleClick(data.id);
    openModal("delete");
  }

  function goToRightUrl(path: string) {
    if (
      (user?.role === "admin" || user?.role === "manager") &&
      path === "/home"
    )
      return "users";

    if (
      ((user?.role === "admin" || user?.role === "manager") &&
        path === "/home/users") ||
      path === "/home/departments" ||
      path === "/home/goals"
    )
      return ".";

    if (user?.role === "employee" && path === "/home") return "goals";
  }

  return (
    (((isEmployeeAndManagerReviewTableColumns(data) || isFeedbacksTableManagerEmployeeColumns(data)) && user?.role) !== 'employee') && <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 shadow-sm hover:border-2"
        >
          <span className="sr-only">Open Menu</span>
          <HiOutlineDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-lg border-2 border-border bg-background p-2 font-primary shadow-md"
        align="end"
      >
        {(isUserTableColumns(data) || isGoalsTableColumns(data)) && (
          <DropdownMenuItem
            className="flex items-center gap-4 p-2"
            onClick={() =>
              navigate(
                `${goToRightUrl(location.pathname) as string}/${data.id}`,
              )
            }
          >
            <MdOutlineRemoveRedEye />
            <span>See details</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="flex items-center gap-4 p-2"
          onClick={handleEditClick}
        >
          <FiEdit3 />
          <span>Edit {text}</span>
        </DropdownMenuItem>

        {user?.role !== "employee" && (
          <DropdownMenuItem
            className="flex items-center gap-4 p-2"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line />
            <span>Delete {text}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsCell;
