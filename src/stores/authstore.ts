import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email?: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user: User, token: string) => {
        localStorage.setItem("token", token);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      initializeAuth: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({
            token,
            isAuthenticated: true,
          });
        } else {
          // Clear state if no token found
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }

        // Listen for storage events to sync across tabs
        if (typeof window !== "undefined") {
          const handleStorageChange = () => {
            const currentToken = localStorage.getItem("token");
            if (!currentToken) {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
              });
            }
          };

          window.addEventListener("storage", handleStorageChange);

          // Clean up listener
          return () => {
            window.removeEventListener("storage", handleStorageChange);
          };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
