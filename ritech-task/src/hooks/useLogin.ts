import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/auth";
import { capitalizeFirstLetter } from "@/utils/helperFunctions";
import { LoginType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogin() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login } = useMutation({
    mutationFn: (data: LoginType) => loginUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      setUser(data);
      setToken(data.access_token);
      navigate("/home");
      toast.success(`Welcome back ${capitalizeFirstLetter(data.name)} 😄`);
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Login Failed. Please check your credentials");
    },
  });
  return { login };
}
