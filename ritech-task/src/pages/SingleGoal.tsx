import Loader from "@/components/Loader";
import SingleTitle from "@/components/SingleTitle";
import { SingleHeader } from "@/components/SingleHeader";
import SingleInfo from "@/components/SingleInfo";
import { useGoal } from "@/hooks/manager/goals/useSingleGoal";
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { createGoalWithEmployeeName } from "@/utils/helperFunctions";
import {
  AddFeedbackDataType,
  EditFeedbackDataType,
  Feedback,
  Goal,
  User,
} from "@/utils/types";
import { useParams } from "react-router";
import GoalCountdown from "@/components/goal/GoalCountdown";
import GoalTableSection from "@/components/goal/GoalTableSection";
import { useAllFeedbacksForGoal } from "@/hooks/manager/feedback/useAllFeedbacksForGoal";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useIds } from "@/context/IdsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "@/context/ModalContext";
import { useCreateFeedback } from "@/hooks/manager/feedback/useCreateFeedback";
import { useEditFeedback } from "@/hooks/manager/feedback/useEditFeedback";
import { TbFileDescription } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

function SingleGoal() {
  const { id } = useParams();
  const { user } = useAuth();
  const { isLoading: isLoadingGoal, goal } = useGoal(Number(id));
  const { isLoading: isLoadingUsers, allUsers } = useAllUsers();
  const { activeModal, closeModal } = useModal();
  const { isLoading: isLoadingFeedbacks, allFeedbacksForGoal } =
    useAllFeedbacksForGoal(Number(id));
  const { addFeedback } = useCreateFeedback(Number(id));
  const { selectedId } = useIds();
  const { editFeedback } = useEditFeedback();
  const methods = useForm<EditFeedbackDataType | AddFeedbackDataType>();

  if (isLoadingGoal || isLoadingUsers || isLoadingFeedbacks) return <Loader />;

  const goalWithEmployeeName =
    user?.role === "admin" || user?.role === "manager"
      ? createGoalWithEmployeeName(goal as Goal, allUsers as User[])
      : createGoalWithEmployeeName(goal as Goal, [user] as User[]);

  const onSubmit: SubmitHandler<EditFeedbackDataType | AddFeedbackDataType> = (
    data,
  ) => {
    switch (activeModal) {
      case "createFeedback": {
        console.log("Creating new feedback:", data);
        if ("reviewerId" in data) {
          addFeedback({
            ...data,
            reviewerId: Number(data.reviewerId),
          } as AddFeedbackDataType);
        } else {
          console.error("Invalid data: department_id is missing.");
        }
        closeModal();
        break;
      }
      case "editFeedback": {
        console.log("Editing feedback:", data);
        editFeedback({ id: selectedId, data });
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <SingleTitle single={goal as Goal} />
      <div className="flex-grow rounded-lg bg-card font-primary text-card-foreground">
        <SingleHeader single={goalWithEmployeeName} />
        <SingleInfo single={goalWithEmployeeName} />
        <div className="flex items-center gap-3 border-b-2 border-muted bg-card p-6">
          <TbFileDescription className="h-6 w-6 text-primary" />
          <p className="font-medium tracking-wide text-muted-foreground">
            Description: {goal?.description}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-6 p-6">
          <GoalCountdown goal={goal as Goal} />
          <GoalTableSection
            allFeedbacksForGoal={allFeedbacksForGoal as Feedback[]}
            allUsers={allUsers as []}
          />
        </div>
        <FeedbackForm
          feedbackId={selectedId}
          methods={methods}
          onSubmit={onSubmit}
          allFeedbacksForGoal={allFeedbacksForGoal as Feedback[]}
        />
      </div>
    </div>
  );
}

export default SingleGoal;
