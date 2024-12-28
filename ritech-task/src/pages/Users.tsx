import { useAllDepartments } from "@/hooks/manager/department/useAllDepartments";
import { useAllUsers } from "@/hooks/manager/user/useAllUsers";
import { usersPageColumns, UserTableColumns } from "@/utils/tableUtils/columns";
import { DataTable } from "@/utils/tableUtils/dataTable";
import { createUsersWithDepartments } from "@/utils/helperFunctions";
import {
  AddAdminDataType,
  AddUserDataType,
  Department,
  EditUserDataType,
  User,
} from "@/utils/types";
import UserForm from "@/components/user/UserForm";
import { useIds } from "@/context/IdsContext";
import { TbUserShield } from "react-icons/tb";

import { useModal } from "@/context/ModalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateAdmin } from "@/hooks/admin/useCreateAdmin";
import { useEditUser } from "@/hooks/manager/user/useEditUser";
import { useCreateUser } from "@/hooks/manager/user/useCreateUser";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";

function Users() {
  const { user } = useAuth();
  const { allUsers } = useAllUsers();
  const { allDepartments } = useAllDepartments();
  const { selectedId } = useIds();
  const { openModal, activeModal, closeModal } = useModal();
  const { createUser } = useCreateUser();
  const { createAdmin } = useCreateAdmin();
  const { editUser } = useEditUser();
  const methods = useForm<
    EditUserDataType | AddUserDataType | AddAdminDataType
  >();

  const usersWithDepartments = createUsersWithDepartments(
    allUsers as User[],
    allDepartments as Department[],
  );

  const onSubmit: SubmitHandler<
    EditUserDataType | AddUserDataType | AddAdminDataType
  > = (data) => {
    console.log(data);
    switch (activeModal) {
      case "create": {
        console.log("Creating new user:", data);
        if ("departmentId" in data) {
          createUser({
            ...data,
            department_id: Number(data.departmentId),
          } as AddUserDataType);
        } else {
          console.error("Invalid data: department_id is missing.");
        }
        closeModal();
        break;
      }

      case "createAdmin": {
        const newAdmin = data as AddAdminDataType;
        console.log("Creating new admin:", newAdmin);
        createAdmin(newAdmin);
        closeModal();
        break;
      }

      case "edit": {
        const editedUser = data as EditUserDataType;
        console.log("Editing user:", editedUser);
        editUser({ id: selectedId, data: editedUser });
        closeModal();
        break;
      }

      default: {
        console.error("Unhandled modal type:", activeModal);
        break;
      }
    }
  };

  function handleAddUser() {
    openModal("create");
  }

  function handleAddAdmin() {
    openModal("createAdmin");
  }

  return (
    <>
      <div className="flex w-full h-full flex-col gap-8">
        {user?.role === "admin" ? (
          <PageHeader
            title="Users"
            handleAddAdmin={handleAddAdmin}
            handleAdd={handleAddUser}
            icon={<TbUserShield />}
            secondaryButtonText="Create New Admin"
            buttonText="Create New User"
          />
        ) : (
          <PageHeader
            title="Users"
            handleAdd={handleAddUser}
            buttonText="Create New User"
          />
        )}

        <div className="scrollbar-hidden grid h-full overflow-x-hidden rounded-2xl bg-card px-6 py-6 font-primary shadow-custom">
          <DataTable
            columns={usersPageColumns}
            data={(usersWithDepartments as UserTableColumns[]) || []}
          />
        </div>
      </div>
      <UserForm
        userId={selectedId as number}
        methods={methods}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Users;
