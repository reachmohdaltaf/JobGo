import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search } from "lucide-react"

const SeekerNavbar = () => {
  return (
    <div className="flex px-2 md:px-0 items-center bg-white h-18 justify-between">
        <div className="items-center gap-8 flex">
            <Image 
                src="/logo.svg"
                alt="logo"
                width={140}
                height={140}
            />
            <ul className="md:flex hidden  gap-6 items-center">
                <Link href={'/'} className="text-[16px]  ">Jobs</Link>
                <Link href={'/'} className="text-[16px]  ">Compnaines</Link>
                <Link href={'/'} className="text-[16px]  ">Services</Link>
                
            </ul>
            
        </div>
       
         <div className="search hidden max-w-[400px] w-92   lg:flex items-center  border rounded-3xl">
                <Input className="w-full shadow-none outline-none border-none  rounded-2xl" placeholder="Search" />
                <Button className=" rounded-full px-0" size={'sm'}><Search/></Button>
            </div>
       
        <div className="buttons gap-2 flex items-center">
        <Button className="font-bold" variant={'outline'}>Login</Button>
        <Button variant={'destructive'}>Register</Button>
         <div className="select hidden lg:flex">
            <p>For Employers</p>
        </div>
        </div>

       

    </div>
  )
}

export default SeekerNavbar