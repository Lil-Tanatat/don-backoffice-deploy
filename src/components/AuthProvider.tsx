import { useEffect } from "react";
import { useAuthStore } from "@/stores/authstore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from localStorage on app startup
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};
