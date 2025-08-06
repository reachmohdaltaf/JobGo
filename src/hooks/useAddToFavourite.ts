import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const addToFavourite = async (jobId: string) => {
  const res = await axiosInstance.post("/job/favourite/toggle", { jobId })
  return res.data // This returns { message, isFavourited, jobId }
}

export const useAddToFavourite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: string) => addToFavourite(jobId),
    onSuccess: (data, jobId) => {
      console.log("Toggle favorite success:", { data, jobId })

      // Update the "job/all" cache with the updated favourite status:
      queryClient.setQueryData(["job", "all"], (oldJobs: any[] | undefined) => {
        if (!oldJobs) return oldJobs

        return oldJobs.map(job =>
          job.id === jobId ? { ...job, isSaved: data.isFavourited } : job
        )
      })

      // Invalidate favourites query too
      queryClient.invalidateQueries({ queryKey: ["favourites"] })
    },
  })
}
