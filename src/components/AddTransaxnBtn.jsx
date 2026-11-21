import React from 'react'

const AddTransaxnBtn = ({ onClick }) => {
    return (
        <button 
        type="button" 
        onClick={onClick} 
        className="flex items-center gap-0.5 z-40 active:scale-95 sm rounded-lg max-sm:fixed bottom-3 right-3 max-sm:rounded-full bg-violet-600 px-4 max-sm:py-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500">
            <span class=" material-symbols-outlined">add</span>
            <span className='max-sm:hidden'> Add Transaction</span>
        </button>
    )
}

export default AddTransaxnBtn
