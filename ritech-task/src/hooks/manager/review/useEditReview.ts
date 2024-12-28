import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "@/services/reviews";
import { EditReviewDataType } from "@/utils/types";
import { toast } from "sonner";

export function useEditReview() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: editReview } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditReviewDataType }) =>
      updateReview(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success("Review updated 😊");
      queryClient.invalidateQueries({ queryKey: ["review"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to update review 😭");
    },
  });
  return { editReview };
}
