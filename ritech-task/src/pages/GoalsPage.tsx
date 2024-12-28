import GoalForm from "@/components/goal/GoalForm";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useIds } from "@/context/IdsContext";
import { useModal } from "@/context/ModalContext";
import { useAllGoals } from "@/hooks/manager/goals/useAllGoals";
import { useCreateGoal } from "@/hooks/manager/goals/useCreateGoal";
import { useEditGoal } from "@/hooks/manager/goals/useEditGoal";
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { matchGoalsWithEmployeeName } from "@/utils/helperFunctions";
import { GoalsColumns, MyGoalsColumns } from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";
import { AddGoalDataType, Goal, UpdateGoalDataType, User } from "@/utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

function GoalsPage() {
  const { user } = useAuth();
  const { isLoading: isLoadingGoals, allGoals } = useAllGoals();
  const { isLoading: isLoadingUsers, allUsers } = useAllUsers();
  const { openModal, activeModal, closeModal } = useModal();
  const { selectedId } = useIds();
  const methods = useForm<AddGoalDataType | UpdateGoalDataType>();
  const { createGoal } = useCreateGoal();
  const { editGoal } = useEditGoal();

  if (isLoadingGoals || isLoadingUsers) return <Loader />;

  const allGoalsWithEmployeeNames = matchGoalsWithEmployeeName(
    allGoals as Goal[],
    allUsers as User[],
  );

  const onSubmit: SubmitHandler<AddGoalDataType | UpdateGoalDataType> = (
    data,
  ) => {
    switch (activeModal) {
      case "create": {
        if ("employeeId" in data) {
          console.log("Creating new goal:", data);
          createGoal({ ...data, employeeId: Number(data.employeeId) });
          closeModal();
        }
        break;
      }

      case "edit": {
        console.log("Editing goal: ", data);
        editGoal({ id: selectedId, data: data });
        closeModal();

        break;
      }

      default: {
        console.error("Unhandled modal type:", activeModal);
        break;
      }
    }
  };

  function handleAddGoal() {
    openModal("create");
  }

  return (
    <div className="flex w-full h-full flex-col gap-8">
      <PageHeader
        title="Goals"
        handleAdd={handleAddGoal}
        buttonText="Create New Goal"
      />
      <div className="scrollbar-hidden grid max-h-full overflow-x-hidden rounded-2xl bg-card px-6 py-6 font-primary shadow-custom">
        {(user?.role === "admin" || user?.role === "manager") && (
          <DataTable columns={GoalsColumns} data={allGoalsWithEmployeeNames} />
        )}
        {user?.role === "employee" && (
          <DataTable columns={MyGoalsColumns} data={allGoals as Goal[]} />
        )}
      </div>
      <GoalForm goalId={selectedId} methods={methods} onSubmit={onSubmit} />
    </div>
  );
}

export default GoalsPage;
