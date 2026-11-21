import React from 'react'

const SavingsGoals = () => {
    return (
        <div className='p-2 rounded-lg border border-[#231a3b] bg-[#150d29]'>
            <div className='flex gap-2 text-sm pb-4'>
                <span className="material-symbols-outlined text-violet-600">flag</span>
                <span className='font-bold'>Savings Goals</span>
                <button className="p-1 px-2.5 text-xs rounded-lg  text-violet-500 ml-auto bg-[#180422] ">View All →</button>
            </div>
            <div className='flex gap-3 pb-2 items-end'>
                <div className='h-15 w-15 overflow-hidden rounded-lg'><img className='h-full w-full object-cover' src="https://r1imghtlak.mmtcdn.com/4a3e6751-4d04-471d-9ec4-e8e9ac637ff6.webp" alt="Villa image" /></div>
                <div className='flex-col flex-1 text-sm'>
                    <div>Buy a Villa</div>
                    <div>₹2,00,00,000</div>
                    <div
                        role="progressbar"
                        aria-label="Monthly budget used"
                        aria-valuenow={45}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className=" h-2.5 my-1.5 rounded-full bg-[#241b3b]"
                    >
                        <div className="w-[45%] h-2.5 rounded-full bg-[#8231df]"></div>
                    </div>
                </div>
                <span>60%</span>
            </div>
            <div className='flex justify-center'><button className="py-1.5 px-2.5  text-xs rounded-lg  bg-[#25132e] ">🞤 Add Goal</button></div>
        </div>
    )
}

export default SavingsGoals
