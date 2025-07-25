import api from "../configuration/axios";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
  setNewPasswordData,
} from "../types/register";

export const login = async (data: LoginData) => {
  const response = await api.post(`/auth/login`, data); // Use Next.js API route
  // Handle the API response structure
  return {
    accessToken: response.data.accessToken || "",
    user: response.data.user,
  };
};

export const register = async (data: RegisterData) => {
  const response = await api.post(`/auth/register`, data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(`/auth/profile`);
  return response.data.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
  const response = await api.post(`/auth/reset-password`, data);
  return response.data;
};

export const setNewPassword = async (data: setNewPasswordData) => {
  const response = await api.post(`/auth/set-new-password`, {
    password: data.password,
    reset_password_token: data.accessToken,
  });
  return response.data;
};

export const logout = () => {
  // Token will be cleared by the auth store
  // Also clear axios default header
  delete api.defaults.headers.common["Authorization"];
};
