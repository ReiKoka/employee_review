import { useAuth } from "@/context/AuthContext";
import { addUser } from "@/services/users";
import { AddUserDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateUser() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: createUser } = useMutation({
    mutationFn: (data: AddUserDataType) =>
      addUser(data as AddUserDataType, token as string, role as string),
    onSuccess: () => {
      toast.success(`New user created`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to create new admin");
    },
  });
  return { createUser };
}
