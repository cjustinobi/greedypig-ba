import React from 'react';
import Image from 'next/image';
import ProfilePic from '@/assets/img/profilepic.png'

const TopScorer: React.FC = () => {
  return (
    <section className="h-[350px] bg-custom-gray flex flex-col rounded-2xl p-6 gap-4 text-white">
      <div className="h-[38px] border-b border-b-custom-gray6 gap-2.5 pb-3">
        <p className="w-[147px] h-[26px] font-Coiny-Regular font-normal text-2xl/[26.4px]">
          Top Scorers
        </p>
      </div>
      <div className="h-[260px] gap-3 flex flex-col justify-between">
        <div className="h-14 flex items-end justify-between border-b border-b-custom-gray6 pb-4">
          <div className="w-[169px] h-10 gap-4 flex">
            <Image src={ProfilePic} width={40} height={40} alt="profilepic" className="rounded-lg" />
            <div className="w-[113px] h-[38px]">
              <p className="w-[113px] h-5 font-WorkSans-SemiBold text-[16px] leading-5 font-semibold">
                Divine Samuel
              </p>
              <p className="w-[113px] h-[18px] font-WorkSans-Medium text-custom-orange2 text-sm/[17.5px] font-medium">
                2000points
              </p>
            </div>
          </div>
          <div className="w-[81px] h-[18px]">
            <p className="font-WorkSans-Regular text-custom-gray5 text-sm/[17.5px] font-normal">
              10 mins ago
            </p>
          </div>
        </div>

        <div className="h-14 flex items-end justify-between border-b border-b-custom-gray6 pb-4">
          <div className="w-[169px] h-10 gap-4 flex">
            <Image src={ProfilePic} width={40} height={40} alt="profilepic" className="rounded-lg" />
              <div className="w-[113px] h-[38px]">
                <p className="w-[113px] h-5 font-WorkSans-SemiBold text-[16px] leading-5 font-semibold">
                  Divine Samuel
                </p>
                <p className="w-[113px] h-[18px] font-WorkSans-Medium text-custom-orange2 text-sm/[17.5px] font-medium">
                  2000points
                </p>
              </div>
          </div>
          <div className="w-[81px] h-[18px]">
            <p className="font-WorkSans-Regular text-custom-gray5 text-sm/[17.5px] font-normal">
              10 mins ago
            </p>
          </div>
        </div>

        <div className="h-14 flex items-end justify-between border-b border-b-custom-gray6 pb-4">
          <div className="w-[169px] h-10 gap-4 flex">
            <Image src={ProfilePic} width={40} height={40} alt="profilepic" className="rounded-lg" />
              <div className="w-[113px] h-[38px]">
                <p className="w-[113px] h-5 font-WorkSans-SemiBold text-[16px] leading-5 font-semibold">
                  Divine Samuel
                </p>
                <p className="w-[113px] h-[18px] font-WorkSans-Medium text-custom-orange2 text-sm/[17.5px] font-medium">
                  2000points
                </p>
              </div>
          </div>
          <div className="w-[81px] h-[18px]">
            <p className="font-WorkSans-Regular text-custom-gray5 text-sm/[17.5px] font-normal">
              10 mins ago
            </p>
          </div>
        </div>

        <div className="h-14 flex items-end justify-between border-b border-b-custom-gray6 pb-4">
          <div className="w-[169px] h-10 gap-4 flex">
            <Image src={ProfilePic} width={40} height={40} alt="profilepic" className="rounded-lg" />
              <div className="w-[113px] h-[38px]">
                <p className="w-[113px] h-5 font-WorkSans-SemiBold text-[16px] leading-5 font-semibold">
                  Divine Samuel
                </p>
                <p className="w-[113px] h-[18px] font-WorkSans-Medium text-custom-orange2 text-sm/[17.5px] font-medium">
                  2000points
                </p>
              </div>
          </div>
          <div className="w-[81px] h-[18px]">
            <p className="font-WorkSans-Regular text-custom-gray5 text-sm/[17.5px] font-normal">
              10 mins ago
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopScorer;