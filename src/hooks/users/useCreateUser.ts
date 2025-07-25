import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: () => {
      // Errors are handled in the component where the mutation is used.
      // This empty handler prevents react-query from re-throwing the error
      // and causing the Next.js error overlay to appear.
    },
  });
};
