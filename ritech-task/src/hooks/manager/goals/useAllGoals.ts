import { useAuth } from "@/context/AuthContext";
import { getAllGoals } from "@/services/goals";
import { useQuery } from "@tanstack/react-query";

export function useAllGoals() {
  const {token, user} = useAuth();
  const role = user?.role;
  const { isLoading, data: allGoals } = useQuery({
    queryKey: ["goals"],
    queryFn: () => getAllGoals(token as string, role as string),
  });

  return { isLoading, allGoals };
}
