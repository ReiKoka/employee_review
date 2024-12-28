import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

import { ModalType, useModal } from "@/context/ModalContext";

import Modal from "../Modal";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { useDeleteFeedback } from "@/hooks/manager/feedback/useDeleteFeedback";
import { Feedback } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";

type FeedbackFormProps<TFormSchema extends FieldValues> = {
  feedbackId?: number;
  methods: UseFormReturn<TFormSchema>;
  onSubmit: SubmitHandler<TFormSchema>;
  allFeedbacksForGoal: Feedback[];
};

function FeedbackForm<TFormSchema extends FieldValues>({
  feedbackId,
  methods,
  onSubmit,
  allFeedbacksForGoal,
}: FeedbackFormProps<TFormSchema>) {
  const { activeModal, closeModal } = useModal();
  const { deleteFeedback } = useDeleteFeedback();
  const { allUsers } = useAllUsers();
  const { user } = useAuth();
  const singleFeedback = allFeedbacksForGoal?.find(
    (feedback) => feedback.id === feedbackId,
  );

  const allReviewers = allUsers?.filter(
    (user) => user.role === "manager" || user.role === "admin",
  );

  useEffect(() => {
    if (activeModal === "editFeedback" && singleFeedback) {
      methods.reset({
        text: singleFeedback.text,
      } as unknown as DefaultValues<TFormSchema>);
    } else {
      methods.reset({
        text: "",
        reviewerId: user?.role === "manager" ? user?.id : "",
      } as unknown as DefaultValues<TFormSchema>);
    }
  }, [activeModal, singleFeedback, methods, user]);

  function handleDelete(id: number) {
    console.log("Delete Test");
    deleteFeedback(id);
    closeModal();
  }

  function setModalTitle(modal: ModalType) {
    switch (modal) {
      case "createFeedback":
        return "Create New Feedback";
      case "editFeedback":
        return "Edit Feedback";
      case "deleteFeedback":
        return "Delete Feedback";
      default:
        break;
    }
  }

  console.log(user);

  return (
    <Modal
      isOpen={
        activeModal === "createFeedback" ||
        activeModal === "editFeedback" ||
        activeModal === "deleteFeedback"
      }
      onClose={() => closeModal()}
      title={setModalTitle(activeModal) as string}
      description={`${activeModal === "edit" ? "Update the feedback text" : ""}`}
    >
      {activeModal === "deleteFeedback" ? (
        <>
          <h3 className="pb-6 text-foreground">
            Are you sure you want to delete this feedback? This action cannot be
            undone!
          </h3>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => closeModal()}
              className="font-primary"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="font-primary"
              onClick={() => handleDelete(feedbackId as number)}
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
            <FormInput field="text" />

            {activeModal === "createFeedback" && user?.role === "admin" && (
              <FormSelect
                field="reviewerId"
                options={
                  allReviewers?.map((reviewer) => ({
                    value: reviewer?.id,
                    label: reviewer?.name as string,
                  })) || []
                }
                placeholder="Select Reviewer"
              />
            )}

            {activeModal === "createFeedback" && user?.role === "manager" && (
              <FormInput
                field="reviewerId"
                defaultValue={user?.id}
                readOnly
              />
            )}

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="dark:text-foreground"
              >
                {activeModal === "createFeedback"
                  ? "Create Feedback"
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}

export default FeedbackForm;
