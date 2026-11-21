import React from 'react'
import AddTransaxnBtn from './AddTransaxnBtn'

const Header = ({ onAdd, search = '', onSearch }) => {
    return (
        <div className='flex items-center sticky top-0 pb-3 text-sm w-full gap-3 bg-[#0c0224] '>
            <div className="searchBox flex items-center text-mauve-300 sm:max-w-md max-w-sm flex-1 p-1.5 shadow-lg shadow-black bg-[#0b0714] rounded-[10px] border border-indigo-950">
                <span className="material-symbols-outlined px-1.5">
                    search
                </span>
                <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={onSearch}
                    id="searchInp"
                    placeholder='Search Transactions...'
                    className='px-2 focus:outline-none w-full'
                />
                <span className='hidden min-[450px]:block text-xs text-center bg-mauve-800 rounded-lg ml-auto min-w-13 px-1.5 font-light'>Ctrl + K</span>
            </div>
            <div className='flex gap-2.5 ml-auto'>
                <AddTransaxnBtn onClick={onAdd} />
                <button className="notifications sm:m-0 ml-auto relative text-indigo-300 bg-mauve-950 rounded-4xl border border-indigo-900" aria-label="Notifications">
                    <span className="material-symbols-outlined p-2">
                        notifications
                    </span>
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
                </button>
                <button className="themeBtn text-indigo-300 bg-mauve-950 rounded-4xl border border-indigo-900">
                    <span className="material-symbols-outlined p-2">
                        bedtime
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Header
