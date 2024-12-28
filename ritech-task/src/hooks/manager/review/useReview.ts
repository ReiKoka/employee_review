import { useAuth } from "@/context/AuthContext";
import { getReviewById } from "@/services/reviews";
import { useQuery } from "@tanstack/react-query";

export function useReview(id: number) {
  const { token, user } = useAuth();
  const role = user?.role;
  const { isLoading, data: review } = useQuery({
    queryKey: ["review"],
    queryFn: () => getReviewById(id, token as string, role as string),
  });
  return { isLoading, review };
}
