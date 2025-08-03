import SearchContent from "@/components/SearchContent"
import { Suspense } from "react"

const SearchPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  )
}

export default SearchPage