import { useAuth } from "@/context/AuthContext";
import { getAllDepartments } from "@/services/departments";
import { useQuery } from "@tanstack/react-query";

export function useAllDepartments() {
  const {token, user} = useAuth();
  const role = user?.role;
  const { isLoading, data: allDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments(token as string, role as string),
  });

  return { isLoading, allDepartments };
}
