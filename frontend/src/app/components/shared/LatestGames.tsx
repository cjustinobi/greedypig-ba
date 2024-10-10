import React from 'react';
import GameCard from '@/components/ui/GameCard'
import Link from 'next/link';
import Image from 'next/image';

const LatestGames: React.FC = () => {
  return (
    <section className="bg-custom-gray7 flex flex-col w-full rounded-3xl text-white p-6 gap-6">
      <div className="h-[38px]">
        <p className="w-[167px] h-[26px] font-Coiny-Regular font-normal text-2xl/[26.4px]">
          Latest games
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
        <div>
          <GameCard />
        </div>
      </div>
    </section>
  );
};

export default LatestGames;