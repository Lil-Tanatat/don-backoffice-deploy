import api from "../configuration/axios";
import { CompanyApiResponse } from "@/stores/companystore";

export const getAllCompanies = async (): Promise<CompanyApiResponse> => {
  const response = await api.get("/companies");
  return response.data;
};
