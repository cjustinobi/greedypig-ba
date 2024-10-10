import { FC, ChangeEvent } from 'react';

interface InputRadioProps {
	name: string;
	options: { label: string, value: string }[]
	selectedOption: string
	onOptionChange: (value: string) => void;
}

const InputRadio: FC<InputRadioProps> = ({ name, options, selectedOption, onOptionChange }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onOptionChange(e.target.value);
	};
	
	return (
		<div className="flex gap-4">
			{options.map((option) => (
				<div key={option.value} className="flex items-center">
					<input 
						type="radio" 
						id={`${name}-${option.value}`} 
						name={name}  // Use the unique name here
						value={option.value}
						checked={selectedOption === option.value} 
						onChange={handleChange} 
						className="h-4 w-4"
					/>
					<label 
						htmlFor={`${name}-${option.value}`} 
						className="ml-2 block font-Inter_18pt-Medium text-sm/[14px] font-medium text-white"
					>
						{option.value}
					</label>
				</div>
			))}
		</div>
	);
};

export default InputRadio;
