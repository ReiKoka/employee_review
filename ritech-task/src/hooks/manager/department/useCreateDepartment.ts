import { useAuth } from "@/context/AuthContext";
import { createDepartment as createDepartmentApi } from "@/services/departments";
import { MutateDepartmentDataType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateDepartment() {
  const { token, user } = useAuth();
  const role = user?.role;
  const queryClient = useQueryClient();
  const { mutate: createDepartment } = useMutation({
    mutationFn: (data: MutateDepartmentDataType) =>
      createDepartmentApi(data, token as string, role as string),
    onSuccess: () => {
      toast.success("New department created 😄");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed creating new department 😭");
    },
  });
  return { createDepartment };
}
