import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search } from "lucide-react"

const PublicNavbar = () => {
  return (
    <div className="flex px-2 md:px-0 items-center bg-white h-18 justify-between">
        <div className="items-center gap-8 flex">
           <Link href={'/seeker/dashboard'}> <Image 
                src="/logo.png"
                alt="logo"
                width={140}
                height={140}
            /></Link>
            <ul className="md:flex hidden  gap-6 items-center">
                <Link href={'/seeker/dashboard'} className="text-[16px]  ">Jobs</Link>
                <Link href={'/'} className="text-[16px]  ">Compnaines</Link>
                <Link href={'/'} className="text-[16px]  ">Services</Link>
                
            </ul>
            
        </div>
       
         {/* <form action={'/search'} method="GET" className="search hidden max-w-[400px] w-92   lg:flex items-center  border rounded-3xl">
                <Input name="q" className="w-full shadow-none outline-none border-none  rounded-2xl" placeholder="Search" />
                <Button className=" rounded-full px-0" size={'sm'}><Search/></Button>
            </form> */}
       
        <div className="buttons gap-2 flex items-center">
       <Link href={'/login'}><Button className="font-bold" variant={'outline'}>Login</Button></Link> 
       <Link href={'/register'}><Button variant={'destructive'}>Register</Button></Link> 
         <div className="select hidden lg:flex">
            <p>For Employers</p>
        </div>
        </div>

       

    </div>
  )
}

export default PublicNavbar