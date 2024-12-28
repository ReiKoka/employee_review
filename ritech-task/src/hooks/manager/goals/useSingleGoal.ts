import { useAuth } from "@/context/AuthContext";
import { getGoalById } from "@/services/goals";
import { useQuery } from "@tanstack/react-query";

export function useGoal(id: number) {
  const { token, user } = useAuth();
  const role = user?.role;
  const { isLoading, data: goal } = useQuery({
    queryKey: ["goal", id],
    queryFn: () => getGoalById(Number(id), token as string, role as string),
    enabled: !!id,
  });

  return { isLoading, goal };
}
