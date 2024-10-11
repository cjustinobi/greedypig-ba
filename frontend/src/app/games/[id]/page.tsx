import React from 'react'
import GameArena from '@/components/shared/GameArena'
import Leaderboard from '@/components/shared/Leaderboard'

const GameArenaLeaderboard = () => {
  return (
    <div className="grid grid-cos-1 lg:grid-cols-12 p-6 lg:p-8 gap-8">
      <div className="col-span-full lg:col-span-8">
        <GameArena />
      </div>

      <div className="col-span-full lg:col-span-4">
        <Leaderboard />
      </div>
    </div>
  )
}

export default GameArenaLeaderboard

// "use client";

// import { wagmiContractConfig } from '@/lib/wagmi'
// import { useReadContract } from "wagmi"
// import GameSettings from "@/components/GameSettings";
// import GameArena from "@/components/GameArena";
// import GameHeader from "@/components/layout/GameHeader";

// const GamePage = ({ params }: { params: { id: number } }) => {

//   const id = params.id;

//   const {
//     data: game,
//     isPending,
//     error
//   } = useReadContract({
//     ...wagmiContractConfig,
//     functionName: 'viewRngForNonce',
//     args: ['1472']
//   })

//   if (isPending) return <div>Loading...</div>;

//   if (error) return <div>Error: {error.shortMessage || error.message}</div>;

//   console.log("result ", game);
//   return (
//     <div>
//       <GameHeader />
//       <GameSettings />
//       <GameArena />
//     </div>
//   );
// };

// export default GamePage;
