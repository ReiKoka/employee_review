import { useAuth } from "@/context/AuthContext";
import { getAllDepartmentsOfManager } from "@/services/departments";
import { useQuery } from "@tanstack/react-query";

export function useMyDepartments() {
  const { token, user } = useAuth();
  const role = user?.role;

  const { isLoading, data: myDepartments } = useQuery({
    queryKey: ["my-departments"],
    queryFn: () => getAllDepartmentsOfManager(token as string, role as string),
  });

  return { isLoading, myDepartments };
}
