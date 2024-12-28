import { FaIndustry } from "react-icons/fa6";
import UserCard from "./UserCard";
import { Goal, Review, User } from "@/utils/types";
import { Progress } from "../ui/progress";
import { MdReviews } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

type UserCardsSectionProps = {
  singleUserGoals: Goal[];
  allReviews: Review[];
  user: User;
};

function UserCardsSection({
  singleUserGoals,
  allReviews,
  user,
}: UserCardsSectionProps) {
  const { user: loggedUser } = useAuth();
  const completedGoals =
    singleUserGoals?.filter((goal) => goal.status === "completed").length || 0;

  const userReviews = allReviews?.filter(
    (review) => review.employeeId === user?.id,
  );
  const averageReviewRating = userReviews
    ? userReviews?.reduce((acc, cur) => acc + cur.rating, 0) /
      userReviews?.length
    : 0;

  return (
    <section
      className={`flex ${loggedUser?.role === "employee" ? "gap-8" : "flex-col gap-6"} flex-1 `}
    >
      <UserCard
        // prettier-ignore
        icon={<FaIndustry className="h-10 w-10 rounded-full bg-purple-100 p-3 text-primary" />}
        title="goals"
        data={singleUserGoals}
      >
        {singleUserGoals?.length && (
          <>
            <span className="mb-2 inline-block">
              {completedGoals}/{singleUserGoals?.length}
            </span>

            <Progress
              value={Math.round(
                (completedGoals / singleUserGoals?.length) * 100,
              )}
            />
          </>
        )}
      </UserCard>

      <UserCard
        // prettier-ignore
        icon={<MdReviews className="h-10 w-10 rounded-full bg-purple-100 p-3 text-primary" />}
        title="reviews"
        data={userReviews}
      >
        {userReviews?.length && (
          <>
            <span className="mb-2 inline-block">
              {averageReviewRating.toFixed(2)} / {5}
            </span>

            <Progress value={Number(averageReviewRating.toFixed(2)) * 20} />
          </>
        )}
      </UserCard>
    </section>
  );
}

export default UserCardsSection;
