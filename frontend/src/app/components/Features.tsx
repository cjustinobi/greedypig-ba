import Image from 'next/image'
import Roulette from '@/assets/img/roulette.jpg'
import Die from '@/assets/img/die.jpg'
import Strategic from '@/assets/img/strategic.jpg'

const Features = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-500 md:mb-6 lg:text-3xl">
            How to play the Game
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Your chance. Your strategy
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          <div className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              data-aos="zoom-in"
              src={Roulette}
              alt="greedy image"
              width={500}
              height={500}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">
              Flexible Gameplay Options
            </span>
            <div className="absolute inset-0 hidden group-hover:block bg-gray-800 bg-opacity-70 p-4 text-[#ccc] text-sm md:text-base rounded-lg">
              <p className="mt-6">
                Enjoy the freedom to choose between roulette or dice as your
                item of play.
              </p>
              <p className="mt-6">
                Set the game to end upon reaching a predetermined score or after
                a specific number of turns.
              </p>
              <p className="mt-6">
                Engage in fast-paced gameplay with a moderator to manage the
                flow and create an exciting atmosphere.
              </p>
            </div>
          </div>

          <div className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              data-aos="zoom-in"
              src={Strategic}
              alt="greedy image"
              width={500}
              height={500}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">
              Strategic Decision-Making
            </span>
            <div className="absolute inset-0 hidden group-hover:block bg-gray-800 bg-opacity-70 p-4 text-[#ccc] text-sm md:text-base rounded-lg">
              <p className="mt-6">
                Exercise your strategic thinking to decide when to keep your
                score or risk rolling the dice again.
              </p>
              <p className="mt-6">
                Navigate the fine balance between risk and reward in every turn.
              </p>
              <p className="mt-6">
                Experience the thrill of outsmarting your opponents in this
                intense game of chance.
              </p>
            </div>
          </div>

          <div className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96">
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              data-aos="zoom-in"
              src={Die}
              alt="greedy image"
              width={500}
              height={500}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">
              Stake. Victory Awaits!
            </span>
            <div className="absolute inset-0 hidden group-hover:block bg-gray-800 bg-opacity-70 p-4 text-[#ccc] text-sm md:text-base rounded-lg">
              <p className="mt-6">
                Compete against friends or family in thrilling matches with two
                or more players.
              </p>
              <p className="mt-6">
                Use only one six-sided die and a piece of paper to keep score,
                making it easy to set up and play.
              </p>
              <p className="mt-6">
                Be the first player to reach the agreed-upon score or accumulate
                the highest points to claim victory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
