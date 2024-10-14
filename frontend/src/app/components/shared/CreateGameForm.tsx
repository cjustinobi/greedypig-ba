import { useState, FC, ChangeEvent, FormEvent, useEffect } from 'react'
import OffOnchainTab from "@/components/ui/OffOnchainTab"
import InputField from "@/components/ui/InputField"
import InputRadio from "@/components/ui/InputRadio"
import Button from "@/components/ui/Button"
import { useWriteContract } from 'wagmi'
import { wagmiContractConfig } from '@/lib/wagmi'
import { parseEther } from 'viem'
import { ethers } from 'ethers'

import greedyPIgAbi from '@/lib/greedyPIgAbi.json'



 const contractAddress = '0x1A6b820396c0A7A356712fF391DDdD2C0BDA5259'



interface FormData {
  title: string
  score: string
  stake: string
  die: string
  roulette: string
  turnBased: string
  scoreBased: string
}

const CreateGameForm: FC = () => {

  const [contract, setContract] = useState<any>()
  const [account, setAccount] = useState('')
  const [gameId, setGameId] = useState(0)
  const [gameData, setGameData] = useState(null)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    score: '',
    stake: '',
    die: '',
    roulette: '',
    turnBased: '',
    scoreBased: ''
  })

  const [onChainTab, setOnChainTab] = useState<boolean>(true);
  const [showNewInputField, setShowNewInputField] = useState<boolean>(false);

  const { data: hash, isError, error, writeContract } = useWriteContract();

  const handleTabChange = (tab: boolean) => {
    setOnChainTab(prevState => !prevState)
};

  const [apparatus, setApparatus] = useState<string>('die');
  const [mode, setMode] = useState<string>('turn-based')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const {
    data,
    error: createGameError,
    isPending,
    writeContract: creatGameContract
  } = useWriteContract()

  const createGamexx = async (e: FormEvent) => {
    if (contract) {
      try {
         e.preventDefault()
        const tx = await contract.createGame(name, 3, 2, ethers.parseEther('4'))
        await tx.wait()
        const newGameId = await contract.getGameId()
        setGameId(Number(newGameId))
      } catch (error) {
        console.error('Error creating game:', error)
      }
    }
  }

  const createGames = async () => {
    try{
      console.log('create game ')
      // if(!gameName) return toast.error("Game name required")
        // if(!winningScore && winningScore < 6 ) return toast.error("Winning score required and should be greater than 6")
        // if(!selectedValue) return toast.error("Stake options required!")
        // if(selectedValue === "yes" && !bettingAmount) return toast.error("Field required!")
        // e.preventDefault()
  
        creatGameContract({
          ...wagmiContractConfig,
          functionName: 'createGame',
          args: [
            formData.title,
            formData.score,
            formData.stake,
            parseEther(formData.stake)
          ]
        })

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
          contractAddress,
          greedyPIgAbi.abi,
          await signer
        )
        setContract(contract)

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
      }
    }
    init()
  }, [])
  
  return (
    <div className="bg-indigo py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      
      <form className="w-[345px] gap-8 bg-custom-gray mx-auto max-w-lg rounded-2xl md:w-[475px] lg:w-[475px]">
        <div className="flex flex-col gap-4 p-4 md:p-8">

        <OffOnchainTab 
                options={[true, false]} 
                onChainTab={onChainTab} 
                onTabChange={handleTabChange} 
            />

          <InputField 
            label="Title"
            name="title"
            placeholder="Title of game"
            value={formData.title}
            onChange={handleChange}
          />
          <InputField 
            label="Winning score"
            name="winningScore"
            placeholder="e.g. 20000"
            value={formData.score}
            onChange={handleChange}
          />

          { !onChainTab && <InputField 
            label="Stake amount"
            name="stakeAmount"
            placeholder="$200"
            value={formData.stake}
            onChange={handleChange}
          />
          }

          <h2 className="block text-white font-Inter_18pt-SemiBold text-sm font-semibold">Game Apparatus</h2>
            <InputRadio 
              name="gameApparatus"
              options={[
                { label: 'Die', value: 'Die' },
                { label: 'Roulette', value: 'Roulette' },
              ]}
              selectedOption={apparatus}
              onOptionChange={setApparatus}
            />
          <h2 className="block text-white font-Inter_18pt-SemiBold text-sm font-semibold">Mode</h2>
            <InputRadio 
              name="mode"
              options={[
                { label: 'Turn Based', value: 'Turn Based' },
                { label: 'Score Based', value: 'Score Based' },
              ]}
              selectedOption={mode}
              onOptionChange={setMode}
          />

          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            {onChainTab ? <>
              <Button 
              label="Cancel"
              type="button"
              onClick={createGame}
              className="basis-1/2 bg-orange-500 outline-none ring-indigo-300 transition hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                Cancel
            </Button>
            <Button 
              label="Create game"
              type="button"
              onClick={createGame}
              className="basis-1/2 bg-violet-700 outline-none ring-indigo-300 transition hover:bg-orange-300 focus-visible:ring active:text-gray-700 md:text-base">
                Create game
            </Button></>:<Button 
              label="Create game"
              type="button"
              onClick={createGame}
              className="w-full bg-violet-700 outline-none ring-indigo-300 transition hover:bg-orange-300 focus-visible:ring active:text-gray-700 md:text-base">
                Create game
            </Button> 
            }
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}


export default CreateGameForm