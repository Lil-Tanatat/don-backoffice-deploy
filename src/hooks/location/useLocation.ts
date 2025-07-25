import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getDistricts,
  getSubDistricts,
} from "@/services/location";

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const useDistricts = (provinceId: number | null) => {
  return useQuery({
    queryKey: ["districts", provinceId],
    queryFn: () => getDistricts(provinceId!),
    enabled: !!provinceId,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const useSubDistricts = (districtId: number | null) => {
  return useQuery({
    queryKey: ["subDistricts", districtId],
    queryFn: () => getSubDistricts(districtId!),
    enabled: !!districtId,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
