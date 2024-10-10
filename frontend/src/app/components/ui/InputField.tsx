import { FC, ChangeEvent } from 'react';

interface InputFieldProps {
	label: string
	name: string
	value: string
	placeholder: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputField: FC<InputFieldProps> = ({ label, name, value, placeholder, onChange }) => {
	return (
		<div>
			<label className="block font-Inter_18pt-SemiBold text-sm font-semibold text-white mb-2" htmlFor={name}>
				{label}
			</label>
				<input 
				name={name} 
				value={value} 
				onChange={onChange}
				placeholder={placeholder} 
				className="w-full rounded-lg border border-custom-gray3 
					bg-custom-gray2 text-custom-gray4 font-WorkSans-Regular 
					text-sm/[17.5px] px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring" 
				/>
		</div>
	);
};

export default InputField;

