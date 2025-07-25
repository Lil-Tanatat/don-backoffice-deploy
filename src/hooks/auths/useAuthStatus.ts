import { useAuthStore } from "@/stores/authstore";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
  const { user, token, isAuthenticated } = useAuthStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Small delay to prevent flash redirects
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isInitialLoading,
  };
};
