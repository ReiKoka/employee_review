import { useAuth } from "@/context/AuthContext";
import { deleteDepartment as deleteDepartmentApi } from "@/services/departments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDepartment() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: deleteDepartment } = useMutation({
    mutationFn: (id: number) =>
      deleteDepartmentApi(id, token as string, role as string),
    onSuccess: () => {
      toast.success("Department deleted 😊");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed deleting department 😭");
    },
  });

  return { deleteDepartment };
}
