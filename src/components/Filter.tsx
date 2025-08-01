'use client'
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"

const Filter = () => {
  
  return (
    <Card className="w-full shadow-none px-4 py-2 gap-2">
      <h2 className="text-lg font-semibold mb-3">Filter</h2>

      <div className="space-y-4">
        {/* Job Type Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Job Type</h3>
          <form className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox value={"remote"} id="remote" />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox value={"hybrid"} id="hybrid" />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
          </form>
        </div>

        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Location</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="chennai" />
              <Label htmlFor="chennai">Chennai</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="delhi" />
              <Label htmlFor="delhi">Delhi</Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Filter
