import React from 'react'

type propTypes = {
  isOpen: boolean;
  onClose: ()=> void;
  children: React.ReactNode;
}

const ProfileModal: React.FC<propTypes> = ({isOpen, onClose, children}) => {
  return (
    <div 
      className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/50" : "invisible"}
        `}
      onClick={onClose}
      >
        <div className={`w-[475px] bg-custom-gray rounded-2xl gap-6 p-8 transition-all max-w-lg 
          ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} 
          onClick={(e)=> e.stopPropagation()}>
            <button className="absolute top-2 right-2 py-1 px-2 border-neutral-200 rounded-md text-gray-400 hover:text-white" 
            onClick={onClose}
            >
              X
            </button>
            {children}
        </div>
    </div>
  )
}

export default ProfileModal