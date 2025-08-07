import axiosInstance from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const logout = async ()=>{
    const res = await axiosInstance.post("/auth/logout")
    return res.data
}


export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login"); // or home page after logout
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
