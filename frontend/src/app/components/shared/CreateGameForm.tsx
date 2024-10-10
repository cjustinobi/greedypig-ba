import { useState, FC, ChangeEvent } from 'react'
import OffOnchainTab from "@/components/ui/OffOnchainTab"
import InputField from "@/components/ui/InputField"
import InputRadio from "@/components/ui/InputRadio"
import Button from "@/components/ui/Button"


interface FormData {
  title: string
  score: string
  staking: string
  die: string
  roulette: string
  turnBased: string
  scoreBased: string
}

const CreateGameForm: FC = () => {

  const [formData, setFormData] = useState<FormData>({
    title: '',
    score: '',
    staking: '',
    die: '',
    roulette: '',
    turnBased: '',
    scoreBased: ''
  })

  const [onChainTab, setOnChainTab] = useState<boolean>(true);
  const [showNewInputField, setShowNewInputField] = useState<boolean>(false);

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

  const handleClick = () => {
    alert('Button clicked!');
  };

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
            label="Staking amount"
            name="stakingAmount"
            placeholder="$200"
            value={formData.staking}
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
              onClick={handleClick}
              className="basis-1/2 bg-orange-500 outline-none ring-indigo-300 transition hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                Cancel
            </Button>
            <Button 
              label="Create game"
              type="button"
              onClick={handleClick}
              className="basis-1/2 bg-violet-700 outline-none ring-indigo-300 transition hover:bg-orange-300 focus-visible:ring active:text-gray-700 md:text-base">
                Create game
            </Button></>:<Button 
              label="Create game"
              type="button"
              onClick={handleClick}
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
};

export default CreateGameForm