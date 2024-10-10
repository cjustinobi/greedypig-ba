import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/assets/img/logo.png'
import { ConnectBtn } from '@/components/ConnectButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const GameHeader = () => {

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="flex items-center justify-between py-4 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
          aria-label="logo"
        >
          <Image
            className=""
            data-aos="zoom-in"
            src={Logo}
            alt="greedy image"
            width={70}
            height={50}
            loading="lazy"
          />
          GreedyPig
        </Link>

        <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          <div className="flex items-center gap-8">
          <ConnectButton/>
          </div>
        </div>
        {/* <div className="lg-hidden">
          <ConnectButton />
        </div> */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Menu
        </button>
      </header>
    </div>
  )
}

export default GameHeader
