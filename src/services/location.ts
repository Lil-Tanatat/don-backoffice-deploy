import axiosInstance from "@/configuration/axios";
import {
  ProvinceResponse,
  DistrictResponse,
  SubDistrictResponse,
} from "@/types/location";

export const getProvinces = async (): Promise<ProvinceResponse> => {
  const response = await axiosInstance.get("/province");
  return response.data;
};

export const getDistricts = async (
  provinceId: number
): Promise<DistrictResponse> => {
  const response = await axiosInstance.get(
    `/district?provinceId=${provinceId}`
  );
  return response.data;
};

export const getSubDistricts = async (
  districtId: number
): Promise<SubDistrictResponse> => {
  const response = await axiosInstance.get(
    `/sub-district?districtId=${districtId}`
  );
  return response.data;
};
