export interface LocationData {
  provinceId: number;
  province: string;
  districtId: number;
  district: string;
  subDistrictId: number;
  subDistrict: string;
  postcode: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  provinceId: number;
}

export interface SubDistrict {
  id: number;
  name: string;
  districtId: number;
  provinceId: number;
  postcode: string;
}

export interface ProvinceResponse {
  data: Province[];
  total: number;
  status: "success" | "error";
  message?: string;
}

export interface DistrictResponse {
  data: District[];
  total: number;
  status: "success" | "error";
  message?: string;
}

export interface SubDistrictResponse {
  data: SubDistrict[];
  total: number;
  status: "success" | "error";
  message?: string;
}
