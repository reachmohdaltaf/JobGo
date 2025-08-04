import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface JobData {
  job_title: string;
  employer_name: string;
  job_description: string;
  job_location?: string;
  job_employment_type_text?: string;
  job_posted_human_readable?: string;
}

export const createJob = async (data: JobData) => {
  const res = await axiosInstance.post("/job", data);
  return res.data;
};

export const useCreateJob = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      console.log("Job posted successfully:", data);
      // Optionally, show a toast or redirect
    },
    onError: (err: any) => {
      console.error("Job creation failed:", err.response?.data || err.message);
    },
  });
};

