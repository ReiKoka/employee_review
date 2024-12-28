import SingleTitle from "@/components/SingleTitle";
import UserCardsSection from "@/components/user/UserCardsSection";
import UserTableSection from "@/components/user/UserTableSection";
import UserActions from "@/components/user/UserActions";

import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { useUser } from "@/hooks/manager/user/useUser";
import { useAllGoals } from "@/hooks/manager/goals/useAllGoals";
import { useAllDepartments } from "@/hooks/manager/department/useAllDepartments";
import { useAllReviews } from "@/hooks/manager/review/useAllReviews";

import { Department, Goal, Review, User } from "@/utils/types";
import { createUserWithDepartment } from "@/utils/helperFunctions";
import { useParams } from "react-router";
import { SingleHeader } from "@/components/SingleHeader";
import SingleInfo from "@/components/SingleInfo";

function SingleUser() {
  const { isLoading: isLoadingUsers, allUsers } = useAllUsers();
  const { id } = useParams();
  const { isLoading: isLoadingSingleUser, user: singleUser } = useUser(
    Number(id),
  );

  //prettier-ignore
  const { isLoading: isLoadingDepartments, allDepartments } = useAllDepartments();
  const { isLoading: isLoadingGoals, allGoals } = useAllGoals();
  const { isLoading: isLoadingReviews, allReviews } = useAllReviews();

  //prettier-ignore
  if (isLoadingUsers || isLoadingSingleUser || isLoadingDepartments || isLoadingGoals || isLoadingReviews) return;

  const userWithDepartmentName = createUserWithDepartment(
    singleUser as User,
    allDepartments as Department[],
  );

  const singleUserGoals = allGoals?.filter(
    (goal) => goal.employeeId === singleUser?.id,
  );

  const singleUserReviews = allReviews?.filter(
    (review) => review.employeeId === singleUser?.id,
  );

  return (
    <div className="flex w-full flex-col gap-8">
      <SingleTitle single={singleUser as User} />
      <div className="flex-grow rounded-lg bg-card font-primary text-card-foreground">
        <SingleHeader single={userWithDepartmentName} />
        <SingleInfo single={userWithDepartmentName} />
        <div className="flex gap-6 px-6 py-6 h-full">
          <UserCardsSection
            singleUserGoals={singleUserGoals as Goal[]}
            allReviews={allReviews as Review[]}
            user={singleUser as User}
          />
          <UserTableSection
            singleUserReviews={singleUserReviews as Review[]}
            allUsers={allUsers as User[]}
           
          />
        </div>
        <UserActions />
      </div>
    </div>
  );
}

export default SingleUser;
