import api from "../configuration/axios";

export interface HealthCheckReportData {
  employee_code: string;
  tax_id: string;
  first_name: string;
  last_name: string;
  job_position: string;
  birth_date: string;
  gender: string;
  age: number;
  nationality: string;
  marital_status: string;
  weight_kg: number;
  height_cm: number;
  waist_cm: number;
  underlying_disease: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  blood_sugar: number;
  cholesterol: number;
  triglyceride: number;
  health_behavior: string;
}

export interface HealthParameter {
  id: string;
  unit: string;
  parameter_name: string;
  parameter_name_th: string;
}

export interface HealthCheckResult {
  id: string;
  status: "NORMAL" | "WARNING" | "DANGER";
  result_value: number;
  recommendation: string;
  health_parameters: HealthParameter;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  employee_code: string;
  job_position: string;
  gender: string;
  tax_id: string;
  birth_date: string;
  nationality: string;
  marital_status: string;
}

export interface HealthCheckReportResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    employee_id: string;
    check_date: string;
    weight_kg: number;
    height_cm: number;
    waist_cm: number;
    bmi: number;
    underlying_disease: string;
    created_at: string;
    updated_at: string;
    employees: Employee;
    health_check_results: HealthCheckResult[];
  };
  error: null;
}

export const getHealthCheckReport = async (id: string) => {
  const response = await api.get(`/healthcheck-report/${id}`);
  return response.data.data;
};

export const getAllHealthCheckReports = async (round_year_month?: string) => {
  const queryParam = round_year_month
    ? `?round_year_month=${round_year_month}`
    : "";
  const response = await api.get(`/healthcheck-report${queryParam}`);
  return response.data.data;
};

export const uploadHealthCheckBatch = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/healthcheck-report/upload-batch",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const confirmHealthCheckBatch = async (batch_uuid: string) => {
  const response = await api.post("/healthcheck-report/confirm-batch", {
    batch_uuid: batch_uuid,
  });
  return response.data;
};

export const createHealthCheckReport = async (
  data: HealthCheckReportData
): Promise<HealthCheckReportResponse> => {
  const response = await api.post("/healthcheck-report", data);
  return response.data;
};

export const getMonthFilterMD = async () => {
  const response = await api.get("/health_checks_grouped");
  return response.data.data;
};
