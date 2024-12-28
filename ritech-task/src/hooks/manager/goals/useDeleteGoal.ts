import { useAuth } from "@/context/AuthContext";
import { deleteGoal as deleteGoalApi } from "@/services/goals";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteGoal() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: deleteGoal } = useMutation({
    mutationFn: (id: number) =>
      deleteGoalApi(id, token as string, role as string),
    onSuccess: () => {
      toast.success("Goal deleted 😉");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed deleting user");
    },
  });
  return { deleteGoal };
}
