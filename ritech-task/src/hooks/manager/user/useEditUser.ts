import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/users";
import { EditUserDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useEditUser() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: editUser } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditUserDataType }) =>
      updateUser(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success(`User successfully updated`);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editUser };
}
