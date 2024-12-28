import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {removeToken} = useAuth();
  const { mutate: logoutUser } = useMutation({
    mutationFn: async () => {
      removeToken();
      queryClient.removeQueries();
      navigate("/login");
      return Promise.resolve();
    },
  });

  return { logoutUser };
}
