import { useAuth } from "@/context/AuthContext";
import { deleteReview as deleteReviewApi } from "@/services/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteReview() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: deleteReview } = useMutation({
    mutationFn: (id: number) =>
      deleteReviewApi(id, token as string, role as string),
    onSuccess: () => {
      toast.success("Review deleted 😊");
      queryClient.invalidateQueries({ queryKey: ["review"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed deleting review 😭");
    },
  });
  return { deleteReview };
}
