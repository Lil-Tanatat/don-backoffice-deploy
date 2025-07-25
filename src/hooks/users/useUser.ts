import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getOneUser, updateUser } from "@/services/user";

interface UseUsersParams {
  username?: string;
}

interface UserData {
  id: string;
  first_name: string;
  phone: string;
  created_at: string;
  email: string;
  is_verified: boolean;
  company_id: string;
  username: string;
  last_name: string;
  tax_id: string;
  role: string;
  job_position: string | null;
}

// Role mapping function
const mapRoleToThai = (role: string): string => {
  switch (role) {
    case "supervisor":
      return "ผู้จัดการระบบ";
    case "admin":
      return "ผู้ดูแลระบบ";
    default:
      return role;
  }
};

// Transform user data with role mapping
const transformUserData = (user: UserData) => ({
  ...user,
  role_thai: mapRoleToThai(user.role),
});

export const useAllUsers = (params?: UseUsersParams) => {
  return useQuery({
    queryKey: ["allUsers", params],
    queryFn: () => getAllUsers(params),
    select: (data: UserData[]) => data.map(transformUserData),
  });
};

export const useOneUser = (id: string) => {
  return useQuery({
    queryKey: ["oneUser", id],
    queryFn: () => getOneUser(id),
    enabled: !!id,
    select: (data: UserData[]) => data.length > 0 ? transformUserData(data[0]) : null,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: any }) => updateUser(id, userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};  
