import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview as createReviewApi } from "@/services/reviews";
import { AddReviewDataType } from "@/utils/types";
import { toast } from "sonner";

export function useCreateReview() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: createReview } = useMutation({
    mutationFn: (data: AddReviewDataType) =>
      createReviewApi(data, token as string, role as string),
    onSuccess: () => {
      toast.success("New review added 😊");
      queryClient.invalidateQueries({ queryKey: ["review"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to create new review 😭");
    },
  });
  return { createReview };
}
