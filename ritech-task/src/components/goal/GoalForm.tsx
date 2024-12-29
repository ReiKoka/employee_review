import { ModalType, useModal } from "@/context/ModalContext";
import { useDeleteGoal } from "@/hooks/manager/goals/useDeleteGoal";
import { useGoal } from "@/hooks/manager/goals/useSingleGoal";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Modal from "../Modal";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import FormDatePicker from "../FormDatePicker";
import FormSelect from "../FormSelect";
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import Loader from "../Loader";

type GoalFormProps<TFormSchema extends FieldValues> = {
  goalId?: number;
  methods: UseFormReturn<TFormSchema>;
  onSubmit: SubmitHandler<TFormSchema>;
};

function GoalForm<TFormSchema extends FieldValues>({
  goalId,
  methods,
  onSubmit,
}: GoalFormProps<TFormSchema>) {
  const { activeModal, closeModal } = useModal();
  const { deleteGoal } = useDeleteGoal();
  const { isLoading: isLoadingGoal, goal: singleGoal } = useGoal(
    goalId as number,
  );
  const { isLoading: isLoadingUsers, allUsers } = useAllUsers();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (activeModal === "edit" && singleGoal) {
      methods.reset({
        title: singleGoal.title,
        description: singleGoal.description,
        dueDate: singleGoal.dueDate,
        status: singleGoal.status,
      } as unknown as DefaultValues<TFormSchema>);
    } else if (activeModal === "create") {
      methods.reset({
        text: "",
        description: "",
        dueDate: "",
        status: "",
      } as unknown as DefaultValues<TFormSchema>);
    }
  }, [activeModal, methods, singleGoal]);

  if (isLoadingGoal || isLoadingUsers) return <Loader />;

  function handleDelete(id: number) {
    deleteGoal(id);
    closeModal();
    if (location.pathname === "/home/goals") return;
    navigate(-1);
  }

  function setModalTitle(modal: ModalType) {
    switch (modal) {
      case "create":
        return "Create New Goal";
      case "edit":
        return "Edit Goal";
      case "delete":
        return "Delete Goal";
      default:
        break;
    }
  }

  const allEmployees = allUsers?.filter((user) => user.role === "employee");

  return (
    <Modal
      isOpen={
        activeModal === "edit" ||
        activeModal === "create" ||
        activeModal === "delete"
      }
      onClose={() => closeModal()}
      title={setModalTitle(activeModal) as string}
      description={`${activeModal === "edit" ? "Update Goal" : ""} `}
    >
      {activeModal === "delete" ? (
        <>
          <h3 className="pb-6 text-foreground">
            Are you sure you want to delete this goal? This action cannot be
            undone!
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
              className="font-primary text-foreground"
              onClick={() => handleDelete(goalId as number)}
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
            <FormInput field="title" />
            <FormTextArea field="description" />
            <FormDatePicker field="dueDate" customLabelText="Complete By" />
            <FormSelect
              field="status"
              options={[
                { value: "pending", label: "Pending" },
                { value: "in-progress", label: "In-Progress" },
                { value: "completed", label: "Completed" },
              ]}
              placeholder="Status"
            />
            {activeModal === "create" && (
              <FormSelect
                field="employeeId"
                placeholder="Select Employee"
                options={
                  allEmployees?.map((employee) => ({
                    value: employee?.id as number,
                    label: employee?.name as string,
                  })) || []
                }
              />
            )}

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
                className="dark:text-foreground"
              >
                {activeModal === "create" ? "Create goal" : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}

export default GoalForm;
