import React, { useState } from 'react'
const timeSpan = [
    { time: '1M' },
    { time: '3M' },
    { time: '6M' },
    { time: '1Y' },
]


const SpendingOverview = () => {
    const [activeTime, setActiveTime] = useState('1M')

    return (
        <div className='p-3 rounded-xl border border-[#1d1531] bg-[#150d29]'>
            <div className="flex justify-between">

                <div className="flex gap-3 font-bold">
                    <span className="material-symbols-outlined text-violet-600">finance_mode</span>
                    <span>Spending Overview</span>
                </div>

                <div className='flex gap-2'>
                    <div role="group" aria-label="Select spending period"
                        className='flex gap-1 rounded-lg bg-[#1d1531]'>
                        {timeSpan.map(btn => (
                            <button
                                key={btn.time}
                                type="button"
                                onClick={() => setActiveTime(btn.time)}
                                className={`p-1 px-3 text-xs font-semibold rounded-lg ${activeTime === btn.time ? 'bg-violet-600' : 'bg-[#1d1531]'}`}>{btn.time}</button>
                        ))}
                    </div>
                    <button className='flex items-center px-1 rounded-lg bg-[#1d1531]' type="button">
                        <span className="material-symbols-outlined">
                            bar_chart
                        </span>
                    </button>
                </div>
            </div>

            <div className="mt-6 h-54 flex gap-3">

                {/* Y-axis labels */}
                <div className="flex flex-col justify-between text-xs text-gray-400">
                    <span>₹20k</span>
                    <span>₹15k</span>
                    <span>₹10k</span>
                    <span>₹5k</span>
                    <span>₹0</span>
                </div>

                {/* Chart area */}
                <div className="flex-1 grid grid-rows-4 min-w-0">
                    <div className="border-t border-white/10"></div>
                    <div className="border-t border-white/10"></div>
                    <div className="border-t border-white/10"></div>
                    <div className="border-t border-white/10"></div>
                </div>

            </div>
        </div>
    )
}

export default SpendingOverview
