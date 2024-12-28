import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useUser(id: number) {
  const { token, user: authUser } = useAuth();
  const role = authUser?.role;
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(Number(id), token as string, role as string),
  });

  return { isLoading, user };
}
