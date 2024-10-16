'use client'

import React, { useCallback, useEffect, useState } from 'react'
import GameArena from '@/components/shared/GameArena'
import Leaderboard from '@/components/shared/Leaderboard'
import { useReadContract, useWatchContractEvent } from 'wagmi'
import { wagmiContractConfig } from '@/lib/wagmi'

const Games = ({ params }: { params: { id: number } }) => {

  const gameId = params.id

  const [shouldFetchGame, setShouldFetchGame] = useState(false)

  const handleEventLog = useCallback(() => {
    console.log('New logs!')
    setShouldFetchGame(true)
  }, [])


  const {
    data: game,
    isPending,
    error,
    refetch: refetchGameData,
    isSuccess: isGameDataFetchSuccess
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getGame',
    args: [gameId],
    query: {
      enabled: shouldFetchGame && gameId > 0
    }
  })

  useEffect(() => {
    if (shouldFetchGame && gameId > 0) {
      console.log('refetching game data')
      refetchGameData()
    }
  }, [shouldFetchGame])
  // }, [shouldFetchGame, gameId, refetchGameData])

  useEffect(() => {
    if (isGameDataFetchSuccess) {
      setShouldFetchGame(false)
    }
  }, [isGameDataFetchSuccess])


  useEffect(() => {
    setShouldFetchGame(true)
  }, [])

  console.log('from game ID ', game)

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: 'PlayerJoined',
    onLogs: handleEventLog
  })

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: 'PlayerRoll',
    onLogs: handleEventLog
  })

  if (isPending) return (<div>Loading</div>)
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
