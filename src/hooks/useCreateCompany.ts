// hooks/useCreateCompany.ts

import axiosInstance from "@/lib/axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type CompanyData = {
  name: string;
  industry: string;
  location: string;
  description: string;
};

const createCompany = async (data: CompanyData) => {
  const res = await axiosInstance.post("/company/create", data);
  return res.data;
};

// ✅ Add return type for useMutation
export const useCreateCompany = (): UseMutationResult<
  any,           // response type from API
  Error,         // error type
  CompanyData    // variables passed to mutationFn
> => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      console.log("Company created successfully:", data);
    },
    onError: (error) => {
      console.log("Error while creating company:", error);
    },
  });
};
