import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAvatarImage } from "@/utils/helperFunctions";
import { format, formatDistanceToNow } from "date-fns";
import { GoalWithEmployeeName, RoleType, UserWithDepartmentName } from "@/utils/types";
import { FaRegUser } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";

type SingleHeader = {
  single: UserWithDepartmentName | GoalWithEmployeeName;
}

export function SingleHeader({single}: SingleHeader) {
  const isUser = (single: UserWithDepartmentName | GoalWithEmployeeName): single is UserWithDepartmentName => {
      return "role" in single;
    };

  const createdAt = new Date(single.createdAt);

  return (
    <header className="flex items-center justify-between rounded-t-lg bg-primary px-6 py-4 text-secondary">
      <div className="flex gap-4">
        <Avatar>
          {isUser(single) && <AvatarImage
            src={setAvatarImage(single.role as RoleType)}
          />}
          <AvatarFallback className="text-primary">
            {isUser(single) ? <FaRegUser /> : <LuGoal />}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-bold leading-[35px] text-card dark:text-card-foreground">
          {isUser(single) ? single?.name : single.title}
        </h2>
      </div>
      <div className="leading-[35px]">
        <h4 className="font-primary text-lg font-medium tracking-wide text-muted dark:text-card-foreground">
          {isUser(single) ? "User" : "Goal"} created at: {format(createdAt, "iii, LLL dd yyyy")} (
          {formatDistanceToNow(createdAt)} ago)
        </h4>
      </div>
    </header>
  );
}
