import { useCallback } from "react";
import { useCompanyStore, Company } from "@/stores/companystore";
import { getAllCompanies } from "@/services/company";

export const useCompany = () => {
  const {
    companies,
    loading,
    error,
    setCompanies,
    setLoading,
    setError,
    clearError,
  } = useCompanyStore();

  const fetchAllCompanies = useCallback(async () => {
    try {
      setLoading(true);
      clearError();

      const response = await getAllCompanies();

      if (response.statusCode === 200) {
        setCompanies(response.data);
      } else {
        setError(response.message || "Failed to fetch companies");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching companies"
      );
    } finally {
      setLoading(false);
    }
  }, [setCompanies, setLoading, setError, clearError]);

  //   const getCompanyById = useCallback(
  //     (id: string): Company | undefined => {
  //       return companies.find((company) => company.id === id);
  //     },
  //     [companies]
  //   );

  //   const getCompanyByCode = useCallback(
  //     (code: string): Company | undefined => {
  //       return companies.find((company) => company.company_code === code);
  //     },
  //     [companies]
  //   );

  const getOwnedCompany = useCallback((): Company | undefined => {
    return companies[0];
  }, [companies]);

  return {
    companies,
    loading,
    error,
    fetchAllCompanies,
    // getCompanyById,
    // getCompanyByCode,
    getOwnedCompany,
    clearError,
  };
};
