import { format } from "date-fns";
import { GoalWithEmployeeName, UserWithDepartmentName } from "@/utils/types";
import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa6";
import { IoGitNetwork } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Loader from "./Loader";

type SingleInfoProps = {
  single: UserWithDepartmentName | GoalWithEmployeeName;
};

function SingleInfo({ single }: SingleInfoProps) {
  const isUser = (
    single: UserWithDepartmentName | GoalWithEmployeeName,
  ): single is UserWithDepartmentName => {
    return "role" in single;
  };

  if (!single) return <Loader />;

  const dueDate = isUser(single) ? null : new Date(single?.dueDate);
  console.log(dueDate);

  return (
    <section className="flex items-center justify-between gap-5 border-b-2 border-muted bg-card p-6">
      <p className="flex items-center gap-4">
        {isUser(single) ? (
          <MdOutlineAlternateEmail className="h-5 w-5 text-primary" />
        ) : (
          <FaRegUser className="h-5 w-5 text-primary" />
        )}
        <span
          className={`font-medium tracking-wide text-muted-foreground ${isUser(single) ? "" : "capitalize"}`}
        >
          {isUser(single)
            ? `Email: ${single.email}`
            : `Employee: ${single.employeeName}`}
        </span>
      </p>
      <p className="flex items-center gap-4">
        {isUser(single) ? (
          <IoGitNetwork className="h-5 w-5 text-primary" />
        ) : (
          <FaRegCalendarCheck className="h-5 w-5 text-primary" />
        )}
        <span className="font-medium tracking-wide text-muted-foreground">
          {isUser(single)
            ? `Department: ${single.departmentName}`
            : `Due Date: ${format(dueDate as Date, "iii, LLL dd yyyy")}`}
        </span>
      </p>
    </section>
  );
}

export default SingleInfo;
