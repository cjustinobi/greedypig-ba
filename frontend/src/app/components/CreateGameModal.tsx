'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameModal } from '@/features/modal/modalSlice'
import toast from 'react-hot-toast'
import { GameStatus } from '@/interfaces'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { wagmiContractConfig } from "../lib/wagmi";
import Button from '@/components/ui/Button'
import { parseEther, parseUnits } from 'viem'



const CreateGameModal = () => {

  const dispatch = useDispatch()
  const createGameForm = useSelector((state: any) =>
    selectGameModal(state.modal)
  )
  
  const [creator, setCreator] = useState<string | undefined>('')
  const [gameName, setGameName] = useState<string>('')
  const [winningScore, setWinningScore] = useState<number>(0)
  const [bettingAmount, setBettingAmount] = useState<string>("0")
  const [bet, setBet] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>("")

  const { data: hash, isError, error, writeContract } = useWriteContract();

  const createGame = async (e: FormEvent) => {
    try{
      if(!gameName) return toast.error("Game name required")
        if(!winningScore && winningScore < 6 ) return toast.error("Winning score required and should be greater than 6")
        if(!selectedValue) return toast.error("Staking options required!")
        if(selectedValue === "yes" && !bettingAmount) return toast.error("Field required!")
        e.preventDefault()
  
        writeContract({
        ...wagmiContractConfig,
        functionName: "createGame",
        args: [gameName, winningScore, bet, parseEther(bettingAmount)],
      });

    }catch(error){
      console.log(error)
    }

  }

  if(isError) {
    console.log(error)
  }

  const { isLoading, isSuccess: gameCreated} =
    useWaitForTransactionReceipt({
      hash,
    }); 

  const stakeOptions = [
    {
      label: "Yes",
      value: "yes"
    },
    {
      label: "No",
      value: "no"
    },
  ]


  const handleOptionChange = (value: string) => {
    if(value == "yes"){
      setBet(true)
      setSelectedValue("yes")
    }else{
      setBet(false)
      setSelectedValue("no")
    }
  }

  const reset = () => {
    setGameName('')
    dispatch({ type: 'modal/toggleGameModal' })
  }

  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import('tw-elements')
      initTE({ Modal, Ripple })
    }
    init()
  }, [])

  useEffect(() => {
    if (gameCreated) {
       dispatch({ type: "modal/toggleGameModal" });
      toast.success("Game created");
    }
  }, [gameCreated]);

  return (
    <div
      className={`fixed ${
        createGameForm ? '' : 'hidden'
      } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal`}
    >
      <div
        className="mx-auto mt-10 w-[38rem] p-5 bg-gray-700 rounded-lg relative"
        // onSubmit={createGame}
      >
        <button
          onClick={reset}
          type="button"
          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none absolute right-6 z-50"
          data-te-modal-dismiss
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="my-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Title
          </label>
          <input
            required
            onChange={(e) => setGameName(e.target.value)}
            value={gameName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Ohio Meet & Greet Game"
          />
        </div>

        <div className="my-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="winningScore"
          >
            Winning Score
          </label>
          <input
            onChange={(e) => setWinningScore(parseInt(e.target.value))}
            value={winningScore}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="winningScore"
            type="number"
            min={6}
            placeholder="Set Winning Score"
          />
        </div>

        {/* <div className="my-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Time
          </label>
          <input
            onChange={(e) => setStartTime(e.target.value)}
            type="datetime-local"
            className="appearance-none bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div> */}

        <div className="mb-4">
          <span className="block">Stake Game?</span>

          {stakeOptions.map((option, index) => 
          <div className='inline-flex items-center mr-2'>
              <input
                key={index}
                type="radio"
                className="form-radio mr-2"
                name={option.label}
                value={option.value}
                checked = {selectedValue == option.value}
                onChange={() => handleOptionChange(option.value)}
              />
             <label className='inline'>{option.label} </label>
          </div>            
            )}
        </div>

        {bet && (
          <div className="my-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="bettingAmount"
            >
              Staking Amount
            </label>
            <input
              onChange={(e) => setBettingAmount(e.target.value)}
              value={bettingAmount}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bettingAmount"
              type="number"
              placeholder="Set Staking Amount"
            />
          </div>
        )}

        <div className="mb-4">
          <span className="block">Game Apparatus</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked
              name="apparatus"
              value="die"
            />
            <span className="ml-2">Die</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              disabled
              name="apparatus"
              value="roulette"
            />
            <span className="ml-2">Roulette</span>
          </label>
        </div>

        <div className="mb-4">
          <span className="block">Mode</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              disabled
              name="mode"
              value="turn"
            />
            <span className="ml-2">Turn Based</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              checked
              name="mode"
              value="score"
            />
            <span className="ml-2">Score Based</span>
          </label>
        </div>
        {/* <button className="w-[200px]" onClick={createGame}>{isLoading ? 'Creating ...' : 'Create Game'}</button> */}
        <div className="flex items-center justify-between">
          <Button className="w-[200px]" onClick={createGame}>
            {isLoading ? 'Creating ...' : 'Create Game'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateGameModal
