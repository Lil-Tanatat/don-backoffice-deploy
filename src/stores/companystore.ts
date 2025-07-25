import { create } from "zustand";

export interface Company {
  id: string;
  name: string;
  company_code: string;
  employee_count: number;
  organization_size: string;
  organization_type: string;
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
}

export interface CompanyApiResponse {
  statusCode: number;
  message: string;
  data: Company[];
  error: null | string;
}

interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  setCompanies: (companies: Company[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  loading: false,
  error: null,
  setCompanies: (companies) => set({ companies }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
