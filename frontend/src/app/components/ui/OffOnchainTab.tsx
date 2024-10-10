import { FC } from 'react';

interface OffOnchainTabProps {
	options: boolean[]; 
	onChainTab: boolean;
	onTabChange: (tab: boolean) => void;
}

const OffOnchainTab: FC<OffOnchainTabProps> = ({ options, onChainTab, onTabChange }) => {
	return (
		<div className="flex w-80 h-11 p-1 mx-auto bg-dark-blue font-WorkSans-ExtraBold text-base rounded-full gap-2.5 justify-between">
			{options.map((value, i) => (
				<button
					type="button"
					key={i}
					className={`w-36 h-9 px-1 py-0.5 ${onChainTab === value ? 'bg-custom-gray text-white rounded-full' : 'transparent text-gray-500'} focus:outline-none`}
					onClick={() => onTabChange(value)}
				>
					{value ? 'Off-chain' : 'On-chain'}
				</button>
			))}
		</div>
	);
};

export default OffOnchainTab;