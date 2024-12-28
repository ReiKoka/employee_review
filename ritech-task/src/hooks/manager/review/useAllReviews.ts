import { useAuth } from "@/context/AuthContext";
import { getAllReviews } from "@/services/reviews";
import { useQuery } from "@tanstack/react-query";

export function useAllReviews() {
  const { token, user } = useAuth();
  const role = user?.role;
  const { isLoading, data: allReviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReviews(token as string, role as string),
  });

  return { isLoading, allReviews };
}
