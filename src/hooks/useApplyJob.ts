import axiosInstance from "@/lib/axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type ApplicationData = {
  resume: string;
  coverLetter: string;
  jobId: string;
  userId: string;
};

const applyJob = async (data: ApplicationData) => {
  const res = await axiosInstance.post("/application/apply", data); // Make sure this endpoint is correct
  return res.data;
};

export const useApplyJob = (): UseMutationResult<
  any,            // response from API
  Error,          // error type
  ApplicationData // data you pass
> => {
  return useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      console.log("Applied to job successfully:", data);
    },
    onError: (error) => {
      console.error("Error while applying to job:", error);
    },
  });
};
