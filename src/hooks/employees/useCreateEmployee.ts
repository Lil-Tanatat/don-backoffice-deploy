import { useMutation } from "@tanstack/react-query";
import {
  uploadHealthCheckBatch,
  confirmHealthCheckBatch,
  createHealthCheckReport,
} from "@/services/healthrecord";

export const useUploadHealthCheckBatch = () => {
  return useMutation({
    mutationFn: uploadHealthCheckBatch,
  });
};

export const useConfirmHealthCheckBatch = () => {
  return useMutation({
    mutationFn: confirmHealthCheckBatch,
  });
};

export const useCreateHealthCheckReport = () => {
  return useMutation({
    mutationFn: createHealthCheckReport,
  });
};
