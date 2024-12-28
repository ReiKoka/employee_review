import { useAuth } from "@/context/AuthContext";
import { getAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useAllUsers() {
  const { token, user } = useAuth();
  const role = user?.role;

  const shouldFetch = role === "manager" || role === "admin";

  const { isLoading, data: allUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token as string, role as string),
    enabled: shouldFetch,
    initialData: [],
  });

  return { isLoading, allUsers };
}
