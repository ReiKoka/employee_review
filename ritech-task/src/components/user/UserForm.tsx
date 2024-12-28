import { useDeleteUser } from "@/hooks/manager/user/useDeleteUser";
// prettier-ignore
import {DefaultValues, FieldValues, FormProvider, SubmitHandler, UseFormReturn} from "react-hook-form";

import Modal from "../Modal";
import { ModalType, useModal } from "@/context/ModalContext";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useUser } from "@/hooks/manager/user/useUser";

import { useAllDepartments } from "@/hooks/manager/department/useAllDepartments";
import { useLocation, useNavigate } from "react-router";

import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { useAuth } from "@/context/AuthContext";

type UserFormProps<TFormSchema extends FieldValues> = {
  userId?: number;
  methods: UseFormReturn<TFormSchema>;
  onSubmit: SubmitHandler<TFormSchema>;
};

function UserForm<TFormSchema extends FieldValues>({
  userId,
  methods,
  onSubmit,
}: UserFormProps<TFormSchema>) {
  const { user } = useAuth();
  const { activeModal, closeModal } = useModal();
  const { deleteUser } = useDeleteUser();
  const { user: singleUser } = useUser(userId as number);
  const { allDepartments } = useAllDepartments();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(singleUser);

  useEffect(() => {
    if (activeModal === "edit" && singleUser) {
      methods.reset({
        name: singleUser.name,
        email: singleUser.email,
        role: singleUser.role,
        departmentId: singleUser.departmentId,
      } as unknown as DefaultValues<TFormSchema>);
    } else if (activeModal === "create") {
      methods.reset({
        name: "",
        email: "",
        role: "",
        departmentId: "",
        password: "",
      } as unknown as DefaultValues<TFormSchema>);
    } else if (activeModal === "createAdmin") {
      methods.reset({
        name: "",
        email: "",
        password: "",
      } as unknown as DefaultValues<TFormSchema>);
    }
  }, [activeModal, singleUser, methods]);

  function handleDelete(id: number) {
    deleteUser(id);
    closeModal();
    if (location.pathname === "/home/users") return;
    navigate(-1);
  }

  function setModalTitle(modal: ModalType) {
    switch (modal) {
      case "create":
        return "Create New Employee/Manager";
      case "createAdmin":
        return "Create New Admin";
      case "edit":
        return "Edit User";
      case "delete":
        return "Delete User";
      default:
        break;
    }
  }

  return (
    <Modal
      isOpen={
        activeModal === "edit" ||
        activeModal === "create" ||
        activeModal === "createAdmin" ||
        activeModal === "delete"
      }
      onClose={() => closeModal()}
      title={setModalTitle(activeModal) as string}
      description={`${activeModal === "edit" ? "Update the user details" : ""}`}
    >
      {activeModal === "delete" ? (
        <>
          <h3 className="pb-6 text-foreground">
            Are you sure you want to delete this user? This action cannot be
            undone!
          </h3>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => closeModal()}
              className="font-primary dark:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="font-primary dark:text-foreground"
              onClick={() => handleDelete(userId as number)}
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
            <FormInput field="email" />
            {activeModal === "createAdmin" && <FormInput field="password" />}
            {activeModal === "create" && <FormInput field="password" />}

            {(activeModal === "create" || activeModal === "edit") && (
              <>
                {user?.role === "admin" && activeModal === "edit" && (
                  <FormSelect
                    field="role"
                    options={[
                      { value: "admin", label: "admin" },
                      { value: "manager", label: "manager" },
                      { value: "employee", label: "employee" },
                    ]}
                    placeholder="Select Role"
                  />
                )}
                {user?.role === "admin" && activeModal === "create" && (
                  <FormSelect
                    field="role"
                    options={[
                      { value: "manager", label: "manager" },
                      { value: "employee", label: "employee" },
                    ]}
                    placeholder="Select Role"
                  />
                )}
                {user?.role === "manager" && (
                  <FormSelect
                    field="role"
                    options={[{ value: "employee", label: "employee" }]}
                    placeholder="Select Role"
                  />
                )}
                <FormSelect
                  field="departmentId"
                  options={
                    allDepartments?.map((department) => ({
                      value: department?.id,
                      label: department?.name as string,
                    })) || []
                  }
                  placeholder="Select Department"
                />
              </>
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
                className="btn btn-primary"
              >
                {activeModal === "create" || activeModal === "createAdmin"
                  ? `Create new ${activeModal === "createAdmin" ? "admin" : "user"}`
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}

export default UserForm;
