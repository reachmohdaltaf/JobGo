    import AdsContainer from '@/components/AdsContainer'
    import Filter from '@/components/Filter'
import PublicNavbar from '@/components/layout/PublicNavbar'
    import SeekerNavbar from '@/components/layout/SeekerNavbar'
    import React from 'react'

    const HomeLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
        <header className="fixed top-0 left-0 z-50 w-full bg-white">
            <div className="max-w-screen-xl px-0 md:px-4 mx-auto">
            <PublicNavbar />
            </div>
        </header>

        <main className="max-w-screen-xl mx-auto flex gap-4 pt-20 md:px-4 px-1 md:pt-24">
            {/* Left Sidebar
            <aside className="sticky top-20 h-fit hidden md:flex basis-1/4">
            <Filter />
            </aside> */}
  <div className="w-full">
    {children}
</div>
            {/* Right Sidebar
            <aside className="hidden lg:flex basis-1/4">
            <AdsContainer />
            </aside> */}
        </main>
        </div>
    )
    }

    export default HomeLayout
