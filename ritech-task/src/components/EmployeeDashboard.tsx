import { useAllGoals } from "@/hooks/manager/goals/useAllGoals";
import { useAllReviews } from "@/hooks/manager/review/useAllReviews";

import { DataTable } from "@/utils/tableUtils/dataTable";
import {
  MyGoalsDashboardColumns,
  MyGoalsTableColumnsType,
} from "@/utils/tableUtils/columns";

import { GoalsChart } from "./GoalsChart";
import LargeBox from "./LargeBox";
import Loader from "./Loader";

import UserCardsSection from "./user/UserCardsSection";
import { Goal, Review, User } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";

function EmployeeDashboard() {
  const { user } = useAuth();
  const { isLoading: isLoadingAllGoals, allGoals } = useAllGoals();
  const { isLoading: isLoadingAllReviews, allReviews } = useAllReviews();

  if (isLoadingAllGoals || isLoadingAllReviews) return <Loader />;

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <h1 className="font-primary text-3xl font-semibold">Dashboard</h1>
      <section className="flex gap-x-8">
        <UserCardsSection
          singleUserGoals={allGoals as Goal[]}
          allReviews={allReviews as Review[]}
          user={user as User}
        />
      </section>

      <section className="grid grid-cols-2 gap-x-8">
        <div>
          <LargeBox
            title="Goals Overview"
            children={
              <DataTable
                columns={MyGoalsDashboardColumns}
                data={(allGoals as MyGoalsTableColumnsType[]) || []}
              />
            }
            className="max-h-80"
          />
        </div>
        <LargeBox
          title="My Goals Performance"
          children={
            <div className="overflow-hidden">
              <GoalsChart allGoals={allGoals || []} />
            </div>
          }
          className="max-h-80 overflow-hidden"
        />
      </section>
    </div>
  );
}

export default EmployeeDashboard;
