import { ModalType, useModal } from "@/context/ModalContext";
import { useDeleteReview } from "@/hooks/manager/review/useDeleteReview";
import { Review } from "@/utils/types";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import Modal from "../Modal";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { useUser } from "@/hooks/manager/user/useUser";
import { useParams } from "react-router";

type ReviewFormProps<TFormSchema extends FieldValues> = {
  reviewId?: number;
  methods: UseFormReturn<TFormSchema>;
  onSubmit: SubmitHandler<TFormSchema>;
  singleUserReviews: Review[];
};

// prettier-ignore
function ReviewForm<TFormSchema extends FieldValues>({reviewId, methods, onSubmit, singleUserReviews}: ReviewFormProps<TFormSchema>) {
  const {id} = useParams();
  const { activeModal, closeModal } = useModal();
  const {deleteReview} = useDeleteReview();
  const singleReview = singleUserReviews.find(review => review.id === reviewId);
  const { isLoading: isLoadingSingleUser, user: singleUser } = useUser(Number(id));

  useEffect(() => {
      if (activeModal === "editReview" && singleReview) {
        methods.reset({
          comments: singleReview.comments,
          rating: singleReview.rating.toString(),
        } as unknown as DefaultValues<TFormSchema>);
      } else {
        methods.reset({
          comments: "",
          rating: "",
        } as unknown as DefaultValues<TFormSchema>);
      }
    }, [activeModal, methods, singleReview]);

    function handleDelete(id: number) {
      deleteReview(id);
      closeModal();
    }

    function setModalTitle(modal: ModalType) {
      switch (modal) {
        case "createReview":
          return "Create New Review";
        case "editReview":
          return "Edit Review";
        case "deleteReview":
          return "Delete Review";
        default:
          break;
      }
    }

    if (isLoadingSingleUser) return;

  return (
    <Modal
      isOpen={
        activeModal === "createReview" ||
        activeModal === "editReview" ||
        activeModal === "deleteReview"
      }
      onClose={() => closeModal()}
      title={setModalTitle(activeModal) as string}
      description={`${activeModal === "edit" ? "Update review details" : ""}`}
    >
      {activeModal === "deleteReview" ? (
        <>
          <h3 className="pb-6 text-foreground">
            Are you sure you want to delete this review? This action cannot
            be undone!
          </h3>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => closeModal()}
              className="font-primary text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="font-primary dark:text-foreground"
              onClick={() => handleDelete(reviewId as number)}
            >
              Delete
            </Button>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods?.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 font-primary"
          >
            {activeModal === 'createReview' && <FormInput field="employeeId" defaultValue={singleUser?.id as number} readOnly={true} />}
            {<FormInput field="comments" />}

            <FormSelect
              field="rating"
              options={[
                {value: 1, label: '1'},
                {value: 2, label: '2'},
                {value: 3, label: '3'},
                {value: 4, label: '4'},
                {value: 5, label: '5'},
              ]
              }
              placeholder="Select Rating"
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => closeModal()}
                className="text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="dark:text-foreground font-primary"
              >
                {activeModal === "createReview"
                  ? "Create review"
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
  
}

export default ReviewForm;
