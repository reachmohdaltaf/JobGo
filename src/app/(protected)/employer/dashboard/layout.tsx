    import AdsContainer from '@/components/AdsContainer'
    import Filter from '@/components/Filter'
    import SeekerNavbar from '@/components/layout/SeekerNavbar'
    import React from 'react'

    const dashboardLayout = ({ children }) => {
    return (
        <div>
        <header className="fixed top-0 left-0 z-50 w-full bg-white">
            <div className="max-w-screen-xl px-0 md:px-4 mx-auto">
            <SeekerNavbar />
            </div>
        </header>

        <main className="max-w-screen-xl mx-auto flex gap-4 pt-20 md:px-4 px-1 md:pt-24">
            {/* Left Sidebar */}
            {/* <aside className="sticky top-20 h-fit hidden md:flex basis-1/4">
            <Filter />
            </aside> */}
<section className="flex-1 basis-2/3 min-w-1/3 flex justify-center">
  <div className="w-full max-w-3xl">
    {children}
  </div>
</section>

            {/* Right Sidebar
            <aside className="hidden lg:flex basis-1/4">
            <AdsContainer />
            </aside> */}
        </main>
        </div>
    )
    }

    export default dashboardLayout
