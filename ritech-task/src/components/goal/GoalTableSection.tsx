import { useModal } from "@/context/ModalContext";
import { matchFeedbacksWithReviewerName } from "@/utils/helperFunctions";
import {
  FeedbacksColumns,
  FeedbacksManagerEmployeeColumns,
  FeedbacksTableColumns,
  FeedbacksTableManagerEmployeeColumns,
} from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";
import { Feedback, User } from "@/utils/types";
import { Button } from "../ui/button";
import { VscFeedback } from "react-icons/vsc";
import { useAuth } from "@/context/AuthContext";

type GoalTableSectionProps = {
  allFeedbacksForGoal: Feedback[];
  allUsers: User[];
};

//prettier-ignore
function GoalTableSection({allFeedbacksForGoal, allUsers}: GoalTableSectionProps) {
  const {user} = useAuth();
  
  const feedbacksWithReviewerName =   matchFeedbacksWithReviewerName(
    allFeedbacksForGoal as Feedback[],
    allUsers as User[],
  ) 
  const { openModal} = useModal();
  

  function handleAddFeedback(): void {
    openModal("createFeedback");
  }

  return (
    <section className="rounded-lg bg-card pl-4 pr-3 pt-3 shadow-custom">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-primary text-xl font-bold capitalize tracking-wide text-card-foreground">
        {(user?.role === "admin" || user?.role === 'employee')&& "All Goal Feedbacks"}
        {user?.role === "manager" && "My Goal Feedbacks"}
        
        </h3>
       {user?.role !== "employee" && <Button variant="default" onClick={handleAddFeedback} className="flex gap-4"><VscFeedback />
        <span>Add Feedback</span></Button>}
      </div>
      <div className="dark:scrollbar-hidden h-full max-h-60 overflow-auto">
        {user?.role === 'admin' && <DataTable
          columns={FeedbacksColumns}
          data={feedbacksWithReviewerName as FeedbacksTableColumns[]}
        />}
        {(user?.role === 'manager' || user?.role === 'employee') && <DataTable
          columns={FeedbacksManagerEmployeeColumns }
          data={allFeedbacksForGoal as FeedbacksTableManagerEmployeeColumns[]}
        />}
        
      </div>
    </section>
  );
}

export default GoalTableSection;
