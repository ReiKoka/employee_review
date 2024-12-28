import { ModalType, useModal } from "@/context/ModalContext";
import { useAllDepartments } from "@/hooks/manager/department/useAllDepartments";
import { useDeleteDepartment } from "@/hooks/manager/department/useDeleteDepartment";
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
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { useAuth } from "@/context/AuthContext";

type DepartmentFormProps<TFormSchema extends FieldValues> = {
  departmentId?: number;
  methods: UseFormReturn<TFormSchema>;
  onSubmit: SubmitHandler<TFormSchema>;
};

function DepartmentForm<TFormSchema extends FieldValues>({
  departmentId,
  methods,
  onSubmit,
}: DepartmentFormProps<TFormSchema>) {
  const { activeModal, closeModal } = useModal();
  const { deleteDepartment } = useDeleteDepartment();
  const { allDepartments } = useAllDepartments();
  const { allUsers } = useAllUsers();
  const singleDepartment = allDepartments?.find(
    (department) => department.id === departmentId,
  );

  const allManagers = allUsers?.filter((user) => user.role === "manager");

  useEffect(() => {
    if (activeModal === "edit" && singleDepartment) {
      methods.reset({
        name: singleDepartment.name,
        manager_id: singleDepartment.manager.id.toString(), // Convert to string if needed
      } as unknown as DefaultValues<TFormSchema>);
    } else {
      methods.reset({
        name: "",
        manager_id: "",
      } as unknown as DefaultValues<TFormSchema>);
    }
  }, [activeModal, singleDepartment, methods]);

  function handleDelete(id: number) {
    deleteDepartment(id);
    closeModal();
  }

  function setModalTitle(modal: ModalType) {
    switch (modal) {
      case "create":
        return "Create New Department";
      case "edit":
        return "Edit Department";
      case "delete":
        return "Delete Department";
      default:
        break;
    }
  }

  return (
    <Modal
      isOpen={
        activeModal === "create" ||
        activeModal === "edit" ||
        activeModal === "delete"
      }
      onClose={() => closeModal()}
      title={setModalTitle(activeModal) as string}
      description={`${activeModal === "edit" ? "Update the department details" : ""}`}
    >
      {activeModal === "delete" ? (
        <>
          <h3 className="pb-6 text-foreground">
            Are you sure you want to delete this department? This action cannot
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
              className="font-primary text-foreground"
              onClick={() => handleDelete(departmentId as number)}
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
            <FormInput field="name" />

            <FormSelect
              field="manager_id"
              options={
                allManagers?.map((manager) => ({
                  value: manager?.id,
                  label: manager?.name as string,
                })) || []
              }
              placeholder="Select Manager"
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => closeModal()}
                className="dark:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="font-primary dark:text-foreground"
              >
                {activeModal === "create"
                  ? "Create department"
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}

export default DepartmentForm;
