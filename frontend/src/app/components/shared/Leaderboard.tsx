import React, { FC } from 'react';
import Image from 'next/image';
import ProfilePic from '../../assets/img/profilepic.png'

interface LeaderBoardProps {
  game: any;
}

const Leaderboard: FC<LeaderBoardProps> = () => {
  return (
    <section className="h-[736px] flex flex-col bg-custom-gray rounded-2xl p-6 gap-6">
      <div>
        <p className="w-[247px] lg:w-[333px] h-[26px] font-Coiny-Regular font-normal text-2xl/[26.4px]">
          Leader board
        </p>
      </div>
      <div>
        <p className="w-[147px] lg:w-[333px] h-[19px] font-WorkSans-SemiBold font-semibold text-[16px] leading-[18.77px]">
          GDG Devfest
        </p>
      </div>
      <div className="h-[384px] flex flex-col rounded-lg border-t border-t-custom-gray6">
        <div className="h-16 border-b flex flex-row items-center justify-between border-b-custom-gray6 py-4">
          <div className="w-[115px] lg:w-[215px] flex items-center gap-2.5">
            <Image src={ProfilePic} width={32} height={32} alt="profilepic" className="rounded-full" />
            <p className="w-[71px] h-[18px] text-custom-gray5 font-WorkSans-Regular font-normal text-sm/[17.5px] md:w-[81px] lg:w-[81px]">
              Cody Fisher
            </p>
          </div>
          <div className="w-[62px] p-4 gap-0.5">
            <p className="w-[30px] h-[18px] text-custom-gray5 font-WorkSans-Regular font-normal text-sm/[17.5px]">
              7
            </p>
          </div>
          <div className="w-[66px] p-4 gap-0.5">
            <p className="w-[34px] h-[22px] font-WorkSans-Bold font-bold text-sm/[17.5px]">
              30
            </p>
          </div>
        </div>
      
      
      </div>
    </section>
  )
}

export default Leaderboard