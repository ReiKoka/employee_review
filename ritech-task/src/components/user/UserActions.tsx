import { useModal } from "@/context/ModalContext";

import { Button } from "@/components/ui/button";
import UserForm from "@/components/user/UserForm";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditUserDataType } from "@/utils/types";
import { useEditUser } from "@/hooks/manager/user/useEditUser";

function UserActions() {
  const { openModal, closeModal } = useModal();
  const { id } = useParams();
  const methods = useForm<EditUserDataType>();
  const { editUser } = useEditUser();

  const onSubmit: SubmitHandler<EditUserDataType> = (data) => {
    editUser({ id: Number(id), data });
    closeModal();
  };

  return (
    <section className="flex items-center justify-end gap-6 px-6 pb-6">
      <Button
        variant="default"
        className="flex gap-2"
        onClick={() => openModal("edit")}
      >
        <FiEdit3 /> <span>Edit user</span>
      </Button>
      <Button
        variant="destructive"
        className="flex gap-2"
        onClick={() => openModal("delete")}
      >
        <RiDeleteBin6Line />
        <span>Delete user</span>
      </Button>

      <UserForm userId={Number(id)} methods={methods} onSubmit={onSubmit} />
    </section>
  );
}

export default UserActions;
