import React from 'react'

const InsightsView = () => {
  return (
    <div className='p-3 rounded-xl border border-[#1d1531] bg-[#150d29]'>
      <div className='flex gap-1 pb-3 font-bold'>
        <span className="material-symbols-outlined text-violet-600">star</span>
        <span>Insights</span>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='p-2 h-14 bg-[#261b3b] rounded-lg '>Top spending</div>
        <div className='p-2 h-14 bg-[#261b3b] rounded-lg '>Average Daily Spend</div>
        <div className='p-2 h-14 bg-[#261b3b] rounded-lg '>Most Spent Day</div>
        <div className='p-2 h-14 bg-[#261b3b] rounded-lg '>This Month vs Last</div>
      </div>
    </div>
  )
}

export default InsightsView

