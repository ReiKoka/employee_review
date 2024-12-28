import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback as deleteFeedbackApi } from "@/services/feedback";
import { toast } from "sonner";

export function useDeleteFeedback() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: deleteFeedback } = useMutation({
    mutationFn: (id: number) =>
      deleteFeedbackApi(id, token as string, role as string),
    onSuccess: () => {
      toast.success("Feedback deleted 😊");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed deleting feedback 😭");
    },
  });

  return { deleteFeedback };
}
