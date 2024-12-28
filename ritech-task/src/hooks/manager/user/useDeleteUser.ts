import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as removeUser } from "@/services/users";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function useDeleteUser() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: number) => removeUser(id, token as string, role as string),
    onSuccess: () => {
      toast.success("User deleted!");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteUser };
}
