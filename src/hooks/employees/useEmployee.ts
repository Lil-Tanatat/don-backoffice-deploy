import { useQuery } from "@tanstack/react-query";
import {
  getHealthCheckReport,
  getAllHealthCheckReports,
  getMonthFilterMD,
} from "@/services/healthrecord";

interface ApiHealthCheckData {
  id?: string;
  employee_code?: string;
  weight_kg?: number;
  height_cm?: number;
  waist_cm?: number;
  bmi?: number;
  underlying_disease?: string;
  check_date?: string;
  employees?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    employee_code?: string;
    job_position?: string;
    gender?: string;
    nationality?: string;
    marital_status?: string;
  };
  health_check_results?: {
    id: string;
    status: string;
    parameter_id: string;
    recommendation: string;
  }[];
  check_rounds?: {
    id?: string;
    round_year?: number;
  };
}

export const useHealthCheckReport = (id: string) => {
  return useQuery({
    queryKey: ["healthCheckReport", id],
    queryFn: () => getHealthCheckReport(id),
    enabled: !!id,
  });
};

export const useAllHealthCheckReports = (round_year_month?: string) => {
  return useQuery({
    queryKey: ["allHealthCheckReports", round_year_month],
    queryFn: () => getAllHealthCheckReports(round_year_month),
    enabled: !!round_year_month,
    select: (data: ApiHealthCheckData[]) =>
      data.map((item: ApiHealthCheckData) => {
        const employee = item.employees;
        const health_check_results = item.health_check_results || [];
        const fullName =
          employee?.first_name && employee?.last_name
            ? `${employee.first_name} ${employee.last_name}`
            : "-";

        const getStatusByParameterId = (parameterId: string) => {
          const result = health_check_results.find(
            (result) => result.parameter_id === parameterId
          );
          return result?.status || "-";
        };

        return {
          id: item.id || "-",
          employeeCode: employee?.employee_code || "-",
          name: fullName,
          position: employee?.job_position || "-",
          statusBMI: getStatusByParameterId("bmi"),
          statusBloodPressure: getStatusByParameterId(
            "blood_pressure_systolic"
          ),
          statusCholesterol: getStatusByParameterId("cholesterol"),
          statusBloodSugar: getStatusByParameterId("blood_sugar"),
          statusMentalHealth: getStatusByParameterId("triglyceride"),
          statusOverall: getStatusByParameterId("blood_pressure_diastolic"),
        };
      }),
  });
};

export const useMonthFilterMD = () => {
  return useQuery({
    queryKey: ["monthFilterMD"],
    queryFn: getMonthFilterMD,
  });
};
