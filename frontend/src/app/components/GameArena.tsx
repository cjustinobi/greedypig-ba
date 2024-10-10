import LeaderBoard from './Leaderboard'
import { shortenAddress } from '@/lib/utils'


import {useMemo, memo, useCallback, useEffect, useState } from 'react'
import Settings from './Settings'
import Dice from './Dice'
import { useReadContract } from 'wagmi'
import { wagmiContractConfig } from '@/lib/wagmi'
import useGames from '@/hooks/useGames'
// import { ethers } from 'ethers'
// import { useDispatch } from 'react-redux'


const GameArena = () => {
// const GameArena = ({ params }: { params: { id: number } }) => {
  // const { games,isPending, error } = useGames()
  // const [game, setGame] = useState()
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const gameId = useMemo(() => window.location.pathname.split("/").pop(), []);
  // const game = games.find((game) => Number(game[0]) == Number(gameId))
  
  const {
    data: game,
    isPending,
    error,
    isError
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getGame",
    args: [gameId],
  });

  // useEffect(() => {
  //   if (isPending) {
  //     setLoading(true);
  //   } else if (error) {
  //     setFetchError(error);
  //     setLoading(false);
  //   } else if (game) {
  //     setGameData(game);
  //     setLoading(false);
  //   }
  // }, [game, isPending, error]);

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;
  if(isError)console.log(error)

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-center gap-4  px-8 py-6 md:gap-6">
          {game[0] && (
            <p>{shortenAddress(game[9])}'s turn</p>
          )}
          <Dice game={game} />
        </div>
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <LeaderBoard game={game} />
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default GameArena

