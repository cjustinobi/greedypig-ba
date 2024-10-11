'use client'

import React from 'react'
import GameArena from '@/components/shared/GameArena'
import Leaderboard from '@/components/shared/Leaderboard'
import { useReadContract } from 'wagmi'
import { wagmiContractConfig } from '@/lib/wagmi'

const Games = ({ params }: { params: { id: number } }) => {
  const id = params.id

  const { data: game, isPending, isLoading, error } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getGame',
    args: [id]
  })

  console.log('from game ID ', game)

  if (isLoading) return (<div>Loading</div>)
  if (error) return <div>Error occurred</div>

  return (
    <div>
      {game ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 p-6 lg:p-8 gap-8">
          <div className="col-span-full lg:col-span-8">
            <GameArena game={game} />
          </div>
          <div className="col-span-full lg:col-span-4">
            <Leaderboard game={game} />
          </div>
        </div>
      ) : (
        <div>Game not available</div>
      )}
    </div>
  )
}

export default Games
