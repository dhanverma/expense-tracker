
import React from 'react'

const categories = {
    // EXPENSE CATEGORIES
    'Grocery': { icon: 'shopping_cart', bg: 'from-green-800/50', text: 'text-green-500' },
    'Food': { icon: 'restaurant', bg: 'from-yellow-600/50', text: 'text-yellow-500' },
    'Personal Care': { icon: 'spa', bg: 'from-pink-800/50', text: 'text-pink-500' },
    'Housing': { icon: 'home', bg: 'from-blue-800/50', text: 'text-blue-500' },
    'Utilities': { icon: 'bolt', bg: 'from-yellow-800/50', text: 'text-yellow-500' },
    'Transportation': { icon: 'directions_car', bg: 'from-indigo-800/50', text: 'text-indigo-500' },
    'Communication': { icon: 'phone', bg: 'from-cyan-800/50', text: 'text-cyan-500' },
    'Healthcare': { icon: 'medical_services', bg: 'from-red-800/50', text: 'text-red-500' },
    'Entertainment': { icon: 'movie', bg: 'from-purple-800/50', text: 'text-purple-500' },
    'Clothes': { icon: 'checkroom', bg: 'from-pink-800/50', text: 'text-pink-500' },
    'Education': { icon: 'school', bg: 'from-blue-800/50', text: 'text-blue-500' },
    'Sports': { icon: 'fitness_center', bg: 'from-cyan-800/50', text: 'text-cyan-500' },
    'Travel': { icon: 'flight', bg: 'from-sky-800/50', text: 'text-sky-500' },
    'Gifts': { icon: 'card_giftcard', bg: 'from-rose-800/50', text: 'text-rose-500' },
    'Office Work': { icon: 'work', bg: 'from-slate-800/50', text: 'text-slate-400' },
    'Toiletry': { icon: 'soap', bg: 'from-teal-800/50', text: 'text-teal-500' },
    'Bills': { icon: 'receipt_long', bg: 'from-orange-800/50', text: 'text-orange-500' },
    'Other Expense': { icon: 'category', bg: 'from-gray-800/50', text: 'text-gray-400' },

    // INCOME CATEGORIES
    'Salary': { icon: 'payments', bg: 'from-emerald-800/50', text: 'text-emerald-500' },
    'Freelance': { icon: 'laptop_mac', bg: 'from-green-800/50', text: 'text-green-500' },
    'Business': { icon: 'store', bg: 'from-violet-800/50', text: 'text-violet-500' },
    'Investments': { icon: 'trending_up', bg: 'from-cyan-800/50', text: 'text-cyan-500' },
    'Rental Income': { icon: 'real_estate_agent', bg: 'from-blue-800/50', text: 'text-blue-500' },
    'Gifts Received': { icon: 'redeem', bg: 'from-pink-800/50', text: 'text-pink-500' },
    'Refunds': { icon: 'currency_exchange', bg: 'from-amber-800/50', text: 'text-amber-500' },
    'Other Income': { icon: 'account_balance_wallet', bg: 'from-gray-800/50', text: 'text-gray-400' },
}

const TransactionRow = ({ transaction, deleteTrans, editTrans }) => {

    const formattedDate = new Date(`${transaction.date}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    const item = categories[transaction.category] || {
        icon: 'category',
        bg: 'from-teal-800/60',
        text: 'text-teal-400'
    }

    return (
        <div className="grid grid-cols-2 px-4 py-1 text-sm md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] items-center border-b border-white/5">
            <div className="font-medium">{transaction.title}</div>

            <div className='flex'>
                <div className={`flex items-center pr-1.5 rounded-lg bg-gradient-to-r gap-2 ${item.bg} ${item.text}`}>
                    <span className={`material-symbols-outlined p-1.5 py-0.5 rounded-lg bg-gradient-to-l ${item.bg}`}>
                        {item.icon}
                    </span>
                    <span>{transaction.category}</span>
                </div>
            </div>

            <div className={`flex items-center ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-symbols-outlined">
                    {transaction.type === 'income' ? 'arrow_upward' : 'arrow_downward'}
                </span>
                <span>{transaction.type}</span>
            </div>

            <div className="font-semibold flex gap-1">
                {transaction.type === 'income' ? '+' : '-'}
                {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                }).format(Number(transaction.amount))}
            </div>

            <div>{formattedDate}</div>

            <div className='flex gap-1'>
                <button
                    type="button"
                    aria-label="Edit transaction"
                    onClick={editTrans}
                >
                    <span className="material-symbols-outlined">edit</span>
                </button>

                <button
                    type="button"
                    aria-label="Delete transaction"
                    onClick={deleteTrans}
                >
                    <span className="text-red-400 material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    )
}

export default TransactionRow
