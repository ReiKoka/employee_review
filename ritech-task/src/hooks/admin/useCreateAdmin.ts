import { registerAdmin } from "@/services/auth";
import { AddAdminDataType } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAdmin() {
  const { mutate: createAdmin } = useMutation({
    mutationFn: (data: AddAdminDataType) =>
      registerAdmin(data as AddAdminDataType),
    onSuccess: () => {
      toast.success(`New admin created`);
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to create new admin");
    },
  });
  return { createAdmin };
}
