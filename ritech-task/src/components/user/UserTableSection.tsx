import { matchReviewsWithManagers } from "@/utils/helperFunctions";
import {
  ReviewsColumns,
  ReviewsTableColumnsType,
} from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";
import {
  AddReviewDataType,
  EditReviewDataType,
  Review,
  User,
} from "@/utils/types";
import ReviewForm from "../review/ReviewForm";
import { useIds } from "@/context/IdsContext";
import { useModal } from "@/context/ModalContext";
import { Button } from "../ui/button";
import { MdOutlineRateReview } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateReview } from "@/hooks/manager/review/useCreateReview";
import { useEditReview } from "@/hooks/manager/review/useEditReview";
import { useAuth } from "@/context/AuthContext";

type UserTableSectionProps = {
  singleUserReviews: Review[];
  allUsers: User[];
};

function UserTableSection({
  singleUserReviews,
  allUsers,
}: UserTableSectionProps) {
  const { user } = useAuth();
  const { selectedId } = useIds();
  const { openModal, activeModal, closeModal } = useModal();
  const { createReview } = useCreateReview();
  const { editReview } = useEditReview();
  const methods = useForm<EditReviewDataType | AddReviewDataType>();

  const userReviewsWithManagerName =
    user?.role === "admin"
      ? matchReviewsWithManagers(
          singleUserReviews as Review[],
          allUsers as User[],
        )
      : matchReviewsWithManagers(
          singleUserReviews as Review[],
          [user] as User[],
        );

  function handleAddReview(): void {
    openModal("createReview");
  }

  const onSubmit: SubmitHandler<EditReviewDataType | AddReviewDataType> = (
    data,
  ) => {
    switch (activeModal) {
      case "editReview": {
        editReview({ id: selectedId, data });
        closeModal();
        break;
      }
      case "createReview": {
        createReview({
          ...data,
          employeeId: Number((data as AddReviewDataType).employeeId),
        });
        closeModal();
        break;
      }
      default:
        break;
    }
  };

  return (
    <section className="flex-1 rounded-lg bg-card px-4 pt-3 shadow-custom dark:bg-muted">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-primary text-xl font-bold capitalize tracking-wide text-card-foreground">
          {user?.role === "admin" && "All Reviews"}
          {user?.role === "manager" && "My Reviews"}
        </h3>
        <Button
          variant="default"
          className="flex gap-4 dark:text-foreground"
          onClick={handleAddReview}
        >
          <MdOutlineRateReview />
          <span>Add Review</span>
        </Button>
      </div>
      <div className="dark:scrollbar-hidden h-full max-h-60 overflow-auto">
        <DataTable
          columns={ReviewsColumns}
          data={(userReviewsWithManagerName as ReviewsTableColumnsType[]) || []}
        />
      </div>
      <ReviewForm
        reviewId={selectedId}
        methods={methods}
        onSubmit={onSubmit}
        singleUserReviews={singleUserReviews}
      />
    </section>
  );
}

export default UserTableSection;
