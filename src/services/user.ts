import api from "../configuration/axios";

interface GetUsersParams {
  username?: string;
}

interface CreateUserData {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tax_id: string;
  phone: string;
}

interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: string;
  username?: string;
  email?: string;
  tax_id?: string;
}

export const getAllUsers = async (params?: GetUsersParams) => {
  const searchParams = new URLSearchParams();

  if (params?.username) {
    searchParams.append("username", `eq.${params.username}`);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/users?${queryString}` : "/users";

  const response = await api.get(url);
  return response.data.data;
};

export const getOneUser = async (id: string) => {
  const url = `/users?id=eq.${id}`;

  const response = await api.get(url);
  return response.data.data;
};

export const createUser = async (userData: CreateUserData) => {
  const response = await api.post("/admin-users", userData);
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserData) => {
  const url = `/users?id=eq.${id}`;
  const response = await api.patch(url, userData);
  return response.data;
};
