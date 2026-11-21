import React from 'react'

const Greeting = ({ timeSpan , setTimeSpan }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='space-y-1 w-full mb-4 py-2 px-2 rounded-xl border border-violet-600/50 bg-linear-to-r from-violet-900 sm:bg-none sm:border-none'>
                <h1 className="text-2xl sm:text-3xl font-bold text-white ">
                    Good morning, Dhanraj!
                </h1>
                <p className="text-mauve-400 text-xs sm:text-base">
                    {`Here's your financial overview for ${timeSpan.toLowerCase()}`}
                </p>
            </div>
            <select 
            value = {timeSpan}
            onChange={(event) => setTimeSpan(event.target.value)}
            className="hidden sm:block focus:outline-none p-2 rounded-md border text-sm text-white bg-[#120e1f] border-[#272435]" 
            id="timeInterval"
            >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
                <option value="All">All</option>
            </select>
        </div>
    )
}

export default Greeting
