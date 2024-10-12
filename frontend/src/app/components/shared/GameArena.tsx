'use client'

import { FC } from 'react'
import Image from 'next/image'
import QuestionIcon from '../../assets/img/questionIcon.png'
import SettingsIcon from '../../assets/img/settingsIcon.png'
import ArenaDice from '../../assets/img/twodices.png'
import { useAccount, useWriteContract } from 'wagmi'
import { formatNumber, MAP_GAME_STATUS } from '@/lib/utils'
import { wagmiContractConfig } from '@/lib/wagmi'
import { toBigInt } from 'ethers'
import toast from 'react-hot-toast'
import Button from '../ui/Button'

interface GameArenaProps {
  game: any;
}

const GameArena: FC<GameArenaProps> = ({ game }) => {

  const { address } = useAccount()

  const joinGame = async () => {

    const gameId = formatNumber(game[0]);

    writeContract({
      ...wagmiContractConfig,
      functionName: "joinGame",
      args: [gameId],
      value: toBigInt(game[4]),
    });
  };

  const pass = async () => {
    const gameId = formatNumber(game[0])

    writeContract({
      ...wagmiContractConfig,
      functionName: 'passTurn',
      args: [gameId]
    })
  }

  const {
    data: joinHash,
    error: joinError,
    isPending: joinPending,
    writeContract,
  } = useWriteContract();

  const {
    data: playHash,
    error: playError,
    writeContract: playContract
  } = useWriteContract()

  const playGame = async () => {
    if (MAP_GAME_STATUS(game[7]) === 'ended') {
      return toast.error('Game has ended')
    }

    playContract({
      ...wagmiContractConfig,
      functionName: 'rollDice',
      args: [game[0]]
    })
  }

  return (
    <section className="relative h-[736px] bg-gradient-radial2 border-4 border-[#2F0C59] rounded-3xl p-8">
      <div className="absolute left-6 top-6 w-[72px] flex items-center justify-center h-12 bg-[#E87937] rounded-3xl px-3 py-6 gap-2.5">
        <div className="w-6 h-6">
          <Image
            src={QuestionIcon}
            width={20}
            height={20}
            alt="questionIcon"
            className="left-[2px] top-[2px]"
          />
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
            className="left-[2.64px] top-[2.25px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-12">
          <Image src={ArenaDice} width={542} height={542} alt="arenaDice" />
        </div>

        <div className="flex flex-col justify-center">
          {game &&
            game[7] === 1 &&
            game[8].some(
              (participant: any) => participant.player === address
            ) && (
              <div className="flex justify-center">
                <Button
                  label="Pass"
                  className="mt-6"
                  onClick={pass}
                />
                <Button
                  label="Play Game"
                  className="mt-6"
                  onClick={playGame}
                />
              </div>
            )}

          {game &&
            game[7] === 0 &&
            // Check if the number of participants is less than 2 and connected wallet is not the creator
            (game[8].length < 2 && game[2] !== address ? (
              <button className="w-[181px] h-[47px] bg-gradient-custom border-2 rounded-full flex justify-center items-center gap-2.5">
                <p
                  onClick={joinGame}
                  className="h-[23px] font-Coiny-Regular font-normal text-[18px] leading-[22.5px]"
                >
                  {joinPending
                    ? 'Joining ...'
                    : game[8].some(
                        (participant: any) => participant.player === address
                      )
                    ? 'Joined'
                    : 'Join Game'}
                </p>
              </button>
            ) : (
              // Show "Pass" and "Play Game" if participants >= 2 and connected wallet is the creator
              game[2] === address && (
                <div className="flex justify-center">
                  <Button label="Pass" className="mt-6" onClick={pass} />
                  <Button
                    label="Play Game"
                    className="mt-6"
                    onClick={playGame}
                  />
                </div>
              )
            ))}
        </div>
      </div>
    </section>
  )
}

export default GameArena