import React from 'react'

const BudgetOverview = () => {
    return (
        <div className='p-3 text-sm rounded-lg border border-[#1d1531] bg-[#150d29]'>
            <div className='flex gap-2 pb-3 font-bold'>
                <span className="material-symbols-outlined text-red-400 text-shadow-lg text-shadow-red-500/40">radar</span>
                <span>Monthly Budget</span>
                <span className='ml-auto'>₹50,000</span>
            </div>
            <div
                role="progressbar"
                aria-label="Monthly budget used"
                aria-valuenow={45}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full h-2 rounded-full bg-[#241b3b]"
            >
                <div className="w-[45%] h-2 rounded-full bg-[#31df97]"></div>
            </div>
            <div className='flex py-0.5'>
                <div className='text-[#31df97] flex text-xs items-center gap-2 py-1.5 pb-4'>
                    <p className='bg-[#31df97] rounded-full h-2 w-2'></p>
                    ₹17,450 remaining</div>
                <span className='ml-auto text-xs'>45% used</span>
            </div>
            <div className='flex items-center p-3 rounded-lg bg-[#241b3b]'>
                <div className='h-10 w-10 flex items-center justify-center rounded-full border border-yellow-800 bg-[#1d1830be]'>
                    <span className="material-symbols-outlined text-yellow-400">lightbulb
                    </span>
                </div>
                <div className='text-xs px-3'>
                    <p>You're on track!</p>
                    <p>Keep spending wisely this month</p>
                </div>
            </div>
        </div>
    )
}

export default BudgetOverview
