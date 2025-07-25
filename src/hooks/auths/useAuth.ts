import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  getProfile,
  logout,
  resetPassword,
  setNewPassword,
} from "@/services/auth";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
  setNewPasswordData,
} from "@/types/register";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authstore";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (data) => {
      if (data.accessToken && data.user) {
        setAuth(data.user, data.accessToken);
        queryClient.setQueryData(["user"], data.user);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      try {
        const response = await register(data);
        return { success: true, data: response };
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
          success: false,
          data:
            axiosError.response?.data?.message ||
            "เกิดข้อผิดพลาดในการลงทะเบียน",
        };
      }
    },
  });
};

export const useProfile = () => {
  const { token, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    enabled: typeof window !== "undefined" && isAuthenticated && !!token,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => Promise.resolve(logout()),
    onSuccess: () => {
      clearAuth();
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      try {
        const response = await resetPassword(data);
        return { success: true, data: response };
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
          success: false,
          data:
            axiosError.response?.data?.message ||
            "เกิดข้อผิดพลาดในการส่งอีเมลรีเซ็ตรหัสผ่าน",
        };
      }
    },
  });
};

export const useSetNewPassword = () => {
  return useMutation({
    mutationFn: async (data: setNewPasswordData) => {
      try {
        const response = await setNewPassword(data);
        return { success: true, data: response };
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
          success: false,
          data:
            axiosError.response?.data?.message ||
            "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน",
        };
      }
    },
  });
};
