import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { User } from "@/utils/types";
import { useLocalStorage } from "usehooks-ts";
import { getMe } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  removeToken: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage<string | null>(
    "token",
    null,
  );
  const [user, setUser] = useState<User | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["authenticated-user", token],
    queryFn: async () => {
      if (token) {
        const fetchedUser = await getMe(token);
        setUser(fetchedUser); // Save user in state
        return fetchedUser;
      }
      return null;
    },
    enabled: !!token, // Only fetch if token exists

  });

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        removeToken,
        isAuthenticated: !!user && !!token,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
