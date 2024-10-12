'use client'

import { FC } from 'react'
import Image from 'next/image'
import QuestionIcon from '../../assets/img/questionIcon.png'
import SettingsIcon from '../../assets/img/settingsIcon.png'
import ArenaDice from '../../assets/img/twodices.png'
import { useAccount, useWriteContract } from 'wagmi'
import { formatNumber } from '@/lib/utils'
import { wagmiContractConfig } from '@/lib/wagmi'
import { toBigInt } from 'ethers'

interface GameArenaProps {
  game: any;
}

const GameArena: FC<GameArenaProps> = ({ game }) => {

  const { address } = useAccount()

  const joinGame = async () => {
debugger
    const gameId = formatNumber(game[0]);

    writeContract({
      ...wagmiContractConfig,
      functionName: "joinGame",
      args: [gameId],
      // value: 2,
      value: toBigInt(game[4]),
    });
  };

  const {
    data: joinHash,
    error: joinError,
    isPending: joinPending,
    writeContract,
  } = useWriteContract();

  return (
    <section className="relative h-[736px] bg-gradient-radial2 border-4 border-[#2F0C59] rounded-3xl p-8">
      <div className="absolute left-6 top-6 w-[72px] flex items-center justify-center h-12 bg-[#E87937] rounded-3xl px-3 py-6 gap-2.5">
        <div className="w-6 h-6">
          <Image 
            src={QuestionIcon} 
            width={20} 
            height={20} 
            alt="questionIcon" 
            className="left-[2px] top-[2px]" />
        </div>
      </div>
      <div className="absolute w-[112px] h-[54px] left-[114px] top-[50px] flex flex-col items-center md:left-[325px] lg:left-[426px] lg:top-[30px]">
        <p className="w-[112px] h-[19px] font-WorkSans-Medium font-medium text-base/[18.77px]">
          Winning score
        </p>
        <p className="w-[93px] h-[35px] font-Coiny-Regular font-normal text-[32px] leading-[35.2px]">
          {game[3].toString()}
        </p>
      </div>
      <div className="absolute top-6 right-6 w-[72px] flex items-center justify-center h-12 bg-[#E87937] rounded-3xl px-3 py-6 gap-2.5">
        <div className="w-6 h-6">
          <Image 
            src={SettingsIcon} 
            width={18.72} 
            height={19.5} 
            alt="settingsIcon" 
            className="left-[2.64px] top-[2.25px]" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-12">
          <Image 
          src={ArenaDice} 
          width={542} 
          height={542} 
          alt="arenaDice" />
      </div>
      <div>
      <button className="w-[181px] h-[47px] bg-gradient-custom border-2 rounded-full flex justify-center items-center gap-2.5">
        <p onClick={joinGame} className="h-[23px] font-Coiny-Regular font-normal text-[18px] leading-[22.5px]">
        {joinPending
                ? "Joining ..."
                : game[8].some(
                    (participant: any) => participant.player === address
                  )
                ? "Joined"
                : "Join Game"}
        </p>
      </button>
      </div>
      
      </div>
      
    </section>
  )
}

export default GameArena