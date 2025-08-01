import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Home = () => {
  return (
    <div className="  flex justify-center  w-full">
      <section className="flex flex-col mt-20 gap-2 items-center w-full justify-center">
        <h1 className="text-5xl font-bold">Find your dream job now</h1>
        <p className="text-ld">5 lakh+ jobs for you to explore</p>
        <form action="" className="flex mt-5 rounded-3xl  items-center border p-4 ">
          <Input className="border-none max-w-2xl w-2xl shadow-none" placeholder="Search for jobs" />
          <Button>Search</Button>
        </form>
      </section>

      <section>
        
      </section>
    </div>
  )
}

export default Home