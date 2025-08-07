'use client'

import { LogOut } from "lucide-react"
import { useLogout } from "@/hooks/useLogout"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

const LogoutButton = () => {
  const router = useRouter()
  const { mutate: logout, isPending } = useLogout()

  const handleClick = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/login") // or homepage
      }
    })
  }

  return (
    <DropdownMenuItem 
      onClick={handleClick}
      className="text-destructive focus:text-destructive"
      disabled={isPending}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </DropdownMenuItem>
  )
}

export default LogoutButton
