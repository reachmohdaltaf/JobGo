import axiosInstance from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const favouriteJobs =  async ()=>{
    const response = axiosInstance.get('/job/favourite/list')
    return response
}

export const useFavouriteJobs = () => {
  return useQuery({
    queryKey: ["favouriteJobs"],
    queryFn: favouriteJobs,
  });
}