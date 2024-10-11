import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Gameitemsimg from "@/assets/img/gameitemsimg.png"
import Gameitemspeople from "@/assets/img/gameitemspeople.png"
import Gameitemsclock from "@/assets/img/gameitemsclock.png"
import { IGame } from '@/interfaces'
import { formatEther, toBigInt } from 'ethers'
import { formatNumber } from '@/lib/utils'
import Button from './Button'
import { useRouter } from 'next/navigation'

interface GameCardProps {
  game: IGame;
}

const GameCard = ({ game }: GameCardProps) => {

  const router = useRouter();

  const handleNavigate = (id: number, action: string) => {
    router.push(`/games/${id}?action=${action}`);
  };

  return (
    <div className="w-full lg:w-[290px] h-[147px] bg-custom-gray8 flex flex-row justify-between rounded-3xl p-4 gap-3">
      <div className="">
        <Image 
          className="rounded-2xl" 
          src={Gameitemsimg} 
          width={125} 
          height={115} 
          alt="gameitemsimg" />
      </div>
      <div className="w-[113px] h-[115px] flex flex-col justify-between">
        <div className="w-[113px] h-16 flex flex-col justify-between gap-2">
          <div className="w-[113px] h-[25px]">
            <p className="font-WorkSans-SemiBold font-semibold text-xl/[25px]">
              {game[1]}
            </p>
          </div>
          <div className="w-[95px] h-[31px] gap-2 flex flex-row">
            <div className="w-[39px] h-[31px] bg-custom-gray7 flex text-custom-gray5 rounded-lg p-2 gap-1">
              <Image 
                src={Gameitemspeople} 
                width={12} 
                height={12} 
                alt="gameitemsimg" />
              <p className="w-[7px] h-[15px] font-WorkSans-Medium font-medium text-xs/[15px]">
                7
              </p>
            </div>
            <div className="w-12 h-[31px] bg-custom-gray7 flex text-custom-gray5 rounded-lg p-2 gap-1">
              <Image 
                src={Gameitemsclock} 
                width={12} 
                height={12} 
                alt="gameitemsimg" />
              <p className="w-4 h-[15px] font-WorkSans-Medium font-medium text-xs/[15px]">
              {formatEther(formatNumber(game[4]))}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button 
            onClick={() => handleNavigate(game[0], "join")} 
            label='Join'
            className="w-[113px] h-[34px] bg-[#8621FF] flex justify-center items-center rounded-3xl border px-6 py-2 gap-2.5 font-Coiny-Regular font-normal text-white text-sm/[17.5px]"
          />
          
        </div>
      </div>
    </div>
  )
}

export default GameCard