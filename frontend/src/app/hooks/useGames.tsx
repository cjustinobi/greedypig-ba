// hooks/useGames.ts
import { useEffect, useState } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import { wagmiContractConfig } from '../lib/wagmi'; // Adjust the import path as needed

const useGames = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [gameIds, setGameIds] = useState<number[]>([]);
  const [games, setGames] = useState<any[]>([]);

  const { data: rawGameIds, isPending, error } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getGameId',
    args: [],
  });

  useEffect(() => {
    if (rawGameIds) {
      const idCount = parseInt(formatUnits(parseUnits(rawGameIds.toString(), 0), 0));
      const ids = Array.from({ length: idCount }, (_, index) => index + 1);
      setGameIds(ids);
      
      const newContracts = ids.map(i => ({
        ...wagmiContractConfig,
        functionName: 'getGame',
        args: [i],
      }));
      setContracts(newContracts);
    }
  }, [rawGameIds]);

  const { data: fetchedGames } = useReadContracts({ contracts });

  useEffect(() => {
    if (fetchedGames) {
      setGames(fetchedGames);
    }
  }, [fetchedGames]);

  const getSingleGame = (gameId: number) => {
    return games.find((game: any) => game.id === gameId);
  };

  return { gameIds, games, getSingleGame, isPending, error };
};

export default useGames;
