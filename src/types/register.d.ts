export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tax_id: string;
  job_position: string;
  company: {
    name: string;
    company_code: string;
    employee_count: number;
    organization_size: string;
    address: string;
    subdistrict_nm: string;
    district_nm: string;
    province_nm: string;
    zipcode: string;
    contact_phone: string;
    email: string;
    health_activities: string[];
    subdistrict_code: string;
    district_code: string;
    province_code: string;
  };
}

export interface ResetPasswordData {
  email: string;
}

export interface setNewPasswordData {
  password: string;
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
