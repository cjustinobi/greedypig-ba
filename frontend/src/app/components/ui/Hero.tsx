'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeroImage from '@/assets/img/twodices.png'

const Hero: React.FC = () => {
  return (
    <section className="h-[350px] flex flex-col justify-between gap-6 px-4 rounded-3xl items-center sm:gap-10 md:gap-16 lg:flex-row bg-gradient-to-r from-[#E87937] to-[#8942DE] text-white">
      <div className="h-[255px] top-12 left-[31px] gap-6 flex flex-col">
        <div className="w-full p-2 lg:w-[467px] h-[184px] gap-4">
          <div className="h-[132px] w-full mb-3">
            <h1 className="font-Coiny-Regular font-normal text-[27px] sm:text-[24px] md:text-[30px] lg:text-[40px] leading-tight">
              Experience the Heart Pounding Action of Greedy Pig
            </h1>
          </div>
          <div className="w-full">
            <p className="font-WorkSans-Medium font-medium text-[14px] lg:text-base leading-snug">
              Prepare for a thrilling ride with Greedy Pig, feel the tension
              rise with every dice roll as players balance risks and rewards.
            </p>
          </div>
        </div>
        <div className="w-[166px] h-[47px] bg-gradient-custom border-2 gap-2.5 border-white mt-12 lg:mt-8 rounded-full flex justify-center items-center">
          <Link
            href={'/create-game'}
            className="font-Coiny-Regular text-white py-2 px-4 font-normal text-[16px]"
          >
            Create game
          </Link>
        </div>
      </div>
      <div className="h-48 overflow-hidden lg:h-auto xl-5/12">
        <Image
          className="h-full w-full object-cover object-center hidden lg:block"
          src={HeroImage}
          width={542}
          height={542}
          alt="HeroImage"
        />
        {/* <Image 
            className="h-full w-full object-cover object-center block lg:hidden " 
            src={HeroImage} 
            width={180}
            height={180} 
            alt="HeroImage" 
          /> */}
      </div>
    </section>
  )
}

export default Hero
