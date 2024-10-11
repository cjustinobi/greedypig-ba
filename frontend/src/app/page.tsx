'use client'

import Hero from '@/components/ui/Hero'
import TopScorer from '@/components/ui/TopScorer'
import LatestGames from '@/components/shared/LatestGames'
// import DashboardProfile from './DashboardProfile'

const Dashboard = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 justify-center p-6 lg:p-8 gap-8">
      <div className="col-span-full lg:col-span-2">
        <Hero />
      </div>

      <div className="col-span-full lg:col-span-1">
        <TopScorer />
      </div>

      <div className="col-span-full lg:col-span-2">
        <LatestGames />
      </div>

      {/* <div className="col-span-full lg:col-span-1">
        <DashboardProfile />
      </div> */}
    </div>
  )
}

export default Dashboard
