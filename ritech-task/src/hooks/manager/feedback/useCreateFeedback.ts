import { useAuth } from "@/context/AuthContext";
import { createFeedback } from "@/services/feedback";
import { AddFeedbackDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateFeedback(id: number) {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: addFeedback } = useMutation({
    mutationFn: (data: AddFeedbackDataType) =>
      createFeedback(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success(`New feedback created 😊`);
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to create new feedback!");
    },
  });
  return { addFeedback };
}
