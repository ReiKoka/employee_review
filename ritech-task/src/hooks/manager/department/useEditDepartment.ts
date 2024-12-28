import { useAuth } from "@/context/AuthContext";
import { updateDepartment as updateDepartmentApi } from "@/services/departments";
import { MutateDepartmentDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditDepartment() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: updateDepartment } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: MutateDepartmentDataType;
    }) => updateDepartmentApi(id, data, token as string, role as string),
    onSuccess: () => {
      toast.success("Department updated 😉");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed updating department 😭");
    },
  });
  return { updateDepartment };
}
