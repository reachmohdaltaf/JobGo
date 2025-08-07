import axiosInstance from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"

type userData = {
    name: string,
    email: string,
    bio: string
}

export const updatedUser = async (data:userData)=>{
    const res = await axiosInstance.put('/user/profile', data)
    return res.data
}

export const useUpdateUser = ()=>{
   return useMutation({
        mutationFn: updatedUser
    })
}