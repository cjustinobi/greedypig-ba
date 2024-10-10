"use client";

import { wagmiContractConfig } from '@/lib/wagmi'
import { useReadContract } from "wagmi"
import GameSettings from "@/components/GameSettings";
import GameArena from "@/components/GameArena";
import GameHeader from "@/components/layout/GameHeader";

const GamePage = ({ params }: { params: { id: number } }) => {

   
  const id = params.id;

  const {
    data: game,
    isPending,
    error
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'viewRngForNonce',
    args: ['1472']
  })

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  console.log("result ", game);
  return (
    <div>
      <GameHeader />
      <GameSettings />
      <GameArena />
    </div>
  );
};

export default GamePage;
