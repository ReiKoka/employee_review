import { useAuth } from "@/context/AuthContext";
import { updateGoal } from "@/services/goals";
import { UpdateGoalDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditGoal() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: editGoal } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGoalDataType }) =>
      updateGoal(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success("Goal updated 😊");
      queryClient.invalidateQueries({ queryKey: ["goal"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to update goal 😭");
    },
  });
  return { editGoal };
}
