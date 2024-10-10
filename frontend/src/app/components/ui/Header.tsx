'use client'
import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/img/logo.png'
import ProfilePic from '@/assets/img/profilepic.png'
import CopyIcon from '@/assets/img/copyicon.png'
import ProfileModal from '@/components/ProfileModal'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import RainbowKitBtn from '@/components/ui/RainbowKitBtn'
import Button from '@/components/ui/Button'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = () => {
    alert('Button clicked!')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="h-20 bg-custom-gray pl-2 pr-3 py-2 flex items-center justify-between">
      <div className="w-16 h-16 rounded-lg bg-gradient-custom">
        <Link href={'/'}>
          <Image
            className="w-14 h-14"
            src={Logo}
            width={56}
            height={56}
            alt="logo"
          />
        </Link>
      </div>
      <div className="hidden text-slate-400 gap-6 md:flex">
        <Link href={'/create-game'}>
          <p className="mx-6 my-4 hover:text-orange-400">Create Game</p>
        </Link>
        <Link href={'/games'}>
          <p className="mx-6 my-4 hover:text-orange-400">Games</p>
        </Link>
        {/* <Link href={'/wallet'}>
          <p className="mx-10 my-4 hover:text-orange-400">Wallet</p>
        </Link> */}
      </div>

      <button
        className="hidden w-[169px] h-10 my-auto gap-4 md:flex"
        onClick={() => setIsOpen(true)}
      >
        <Image src={ProfilePic} width={40} height={40} alt="profilepic" />
        <div className="w-[113px] h-[38px]">
          <p className="w-[113px] h-5 font-WorkSans-SemiBold text-sm font-semibold">
            Divine Samuel
          </p>
          <p className="w-[95px] h-4 text-custom-gray5 font-WorkSans-Regular text-xs font-normal">
            OxO5e9...dO62
          </p>
        </div>
      </button>

      {/* Profile Modal */}
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex h-full justify-center items-center w-[411px] gap-4">
          <div className="w-[411px] gap-4 flex flex-col justify-center items-center">
            <div className="w-[113px] h-[102px] gap-2 flex flex-col justify-center items-center">
              <Image
                className="flex justify-center rounded-full"
                src={ProfilePic}
                width={48}
                height={48}
                alt="profilepic"
              />
              <div className="w-[113px] h-[38px]">
                <p className="w-[113px] h-5 font-WorkSans-SemiBold text-sm font-semibold">
                  Divine Samuel
                </p>
                <div className="flex w-[113px] h-[18px] gap-2">
                  <p className="w-[95px] h-4 text-custom-gray5 font-WorkSans-Regular text-xs font-normal">
                    OxO5e9...dO62
                  </p>
                  <div className="w-3.5 h-4">
                    <Image
                      className="top-[1.17px] left-2.33px"
                      src={CopyIcon}
                      width={9.33}
                      height={11.67}
                      alt="copyicon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[123px] h-[60px] flex flex-col justify-center items-center">
              <p className="w-[89px] h-5 text-custom-gray5 font-WorkSans-Regular text-sm font-normal">
                My balance
              </p>
              <div className="w-[123px] h-10 text-white font-WorkSans-SemiBold text-3xl/[40px] font-semibold">
                $12,000
              </div>
            </div>
            <div className="flex w-[411px] h-[47px] flex-col gap-[25px] sm:flex-row sm:justify-center">
              <Button
                label="Withdraw"
                type="button"
                onClick={handleClick}
                className="w-[193px] h-[47px] basis-1/2 bg-orange-500 outline-none ring-indigo-300 transition hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Withdraw
              </Button>
              <Button
                label="Fund wallet"
                type="button"
                onClick={handleClick}
                className="w-[193px] h-[47px] basis-1/2 bg-violet-700 outline-none ring-indigo-300 transition hover:bg-orange-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Fund wallet
              </Button>
            </div>
            <div className="w-[411px] h-[98px] flex flex-row items-center rounded-lg p-4 mb-2 gap-2.5 border-2 border-custom-gray6">
              <div className="w-[119.67px] h-14 gap-2 flex flex-col justify-center items-center">
                <p className="w-14 h-[18px] font-WorkSans-Regular font-normal text-sm/[17.5px] text-custom-gray5">
                  Bettings
                </p>
                <div className="w-[119.67px] h-[30px] font-WorkSans-SemiBold font-semibold text-2xl/[30px] flex justify-center items-center">
                  45
                </div>
              </div>
              <div className="w-[119.67px] h-[66px] gap-2 flex flex-col justify-center items-center">
                <p className="w-[62px] h-[18px] font-WorkSans-Regular font-normal text-sm/[17.5px] text-custom-gray5">
                  Winnings
                </p>
                <div className="w-[119.67px] h-10 font-WorkSans-SemiBold font-semibold text-3xl/[40px] flex justify-center items-center">
                  150
                </div>
              </div>
              <div className="w-[119.67px] h-[66px] gap-2 flex flex-col justify-center items-center">
                <p className="w-[47px] h-[18px] font-WorkSans-Regular font-normal text-sm/[17.5px] text-custom-gray5">
                  Games
                </p>
                <div className="w-[119.67px] h-10 font-WorkSans-SemiBold font-semibold text-3xl/[40px] flex justify-center items-center">
                  200
                </div>
              </div>
            </div>
            <div className="w-[411px] h-8 flex gap-8">
              <Link href={'#'}>
                <p className="w-[90px] h-6 text-slate-400 font-WorkSans-ExtraBold font-extrabold text-base">
                  Bet History
                </p>
              </Link>
              <Link href={'#'}>
                <div className="w-[132px] h-8 text-primary-blue font-Inter_18pt-Medium font-medium text-sm/[21px] border-b border-b-primary-blue">
                  Transaction History
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ProfileModal>

      <div className="absolute right-6 md:hidden scale-150">
        <button onClick={toggleMenu}>{!isMenuOpen && <FaBars />}</button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black p-8 z-50">
          {isMenuOpen && (
            <div className="flex justify-between">
              <Image src={Logo} width={80} height={50} alt="logo" />
              <IoCloseSharp onClick={toggleMenu} color="white" />
            </div>
          )}
          <div className="flex flex-col mt-16">
            <button className="w-[169px] h-10 flex items-center gap-4">
              <Image src={ProfilePic} width={40} height={40} alt="profilepic" />
              <div className="w-[113px] h-[38px]">
                <p className="w-[113px] h-5 font-WorkSans-SemiBold text-sm font-semibold">
                  Divine Samuel
                </p>
                <p className="w-[95px] h-4 text-custom-gray5 font-WorkSans-Regular text-xs font-normal">
                  OxO5e9...dO62
                </p>
              </div>
            </button>
            <div>
              <Link href={'/createGame'}>
                <p className="my-4 text-slate-400" onClick={toggleMenu}>
                  Create Game
                </p>
              </Link>
              <Link href={'/games'}>
                <p className="my-4 text-slate-400" onClick={toggleMenu}>
                  Games
                </p>
              </Link>
              <Link href={'/wallet'}>
                <p className="my-4 text-slate-400" onClick={toggleMenu}>
                  Wallet
                </p>
              </Link>
            </div>
            <div className="my-4">
              <RainbowKitBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
