import { useAuth } from "@/context/AuthContext";
import { addGoal } from "@/services/goals";
import { AddGoalDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateGoal() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: createGoal } = useMutation({
    mutationFn: (data: AddGoalDataType) =>
      addGoal(data, token as string, role as string),
    onSuccess: () => {
      toast.success("New goal created 🎯");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to create new goal");
    },
  });
  return { createGoal };
}
