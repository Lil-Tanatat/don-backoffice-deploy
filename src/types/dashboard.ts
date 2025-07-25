export interface DashboardFilters {
  region: string;
  center: string;
  province: string;
  district: string;
  subDistrict: string;
  monthYear: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface DashboardData {
  id: number;
  header: string;
  address: string;
  status: string;
  target: string;
  type: string;
  reviewer: string;
}

export interface HealthStatCard {
  title: string;
  value: string;
  description: string;
  bg?: string;
  color?: string;
  icon?: React.ReactNode;
}

export interface EmployeeStatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export interface DashboardStats {
  employeeCards: EmployeeStatCard[];
  healthCards: HealthStatCard[];
}

export interface ChartData {
  date: string;
  desktop: number;
  mobile: number;
} 