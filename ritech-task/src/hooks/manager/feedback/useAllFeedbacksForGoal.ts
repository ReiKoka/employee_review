import { useAuth } from "@/context/AuthContext";
import { getAllFeedbacksForGoal } from "@/services/feedback";
import { useQuery } from "@tanstack/react-query";

export function useAllFeedbacksForGoal(id: number) {
  const { token, user } = useAuth();
  const role = user?.role;
  const { isLoading, data: allFeedbacksForGoal } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getAllFeedbacksForGoal(id, token as string, role as string),
  });

  return { isLoading, allFeedbacksForGoal };
}
