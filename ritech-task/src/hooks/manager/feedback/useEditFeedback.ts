import { useAuth } from "@/context/AuthContext";
import { updateFeedback } from "@/services/feedback";
import { EditFeedbackDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditFeedback() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: editFeedback } = useMutation({
    mutationFn: ({id, data} : {id: number, data: EditFeedbackDataType}) =>
      updateFeedback(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success(`Feedback updated 😊`);
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to update feedback!");
    },
  });
  return { editFeedback };
}
