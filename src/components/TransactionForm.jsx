
import React, { useEffect, useState } from 'react'

const expenseCategories = [
    'Grocery',
    'Food',
    'Personal Care',
    'Housing',
    'Utilities',
    'Transportation',
    'Communication',
    'Healthcare',
    'Entertainment',
    'Clothes',
    'Education',
    'Sports',
    'Travel',
    'Gifts',
    'Office Work',
    'Toiletry',
    'Bills',
    'Other Expense'
]

const incomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investments',
    'Rental Income',
    'Gifts Received',
    'Refunds',
    'Other Income'
]

const today = new Date().toISOString().split('T')[0];

const TransactionForm = ({
    onAdd,
    onUpdate,
    isEditing,
    onClose,
    selectedTransaction
}) => {

    const [title, setTitle] = useState("")
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState("")
    const [date, setDate] = useState(today)
    const [amount, setAmount] = useState("")

    // Select categories according to transaction type
    const availableCategories = type === 'income'
        ? incomeCategories
        : expenseCategories;

    // Handle changing transaction type
    const handleTypeChange = (newType) => {
        setType(newType)
        setCategory("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const convertAmt = Number(amount)

        const transactionData = {
            title,
            type,
            category,
            date,
            amount: convertAmt
        }

        if (selectedTransaction) {
            onUpdate(selectedTransaction.id, transactionData)
        } else {
            onAdd(transactionData)
        }

        onClose()
        setTitle("")
        setType("expense")
        setCategory("")
        setDate(today)
        setAmount("")
    }

    useEffect(() => {
        if (selectedTransaction) {
            setTitle(selectedTransaction.title)
            setType(selectedTransaction.type)
            setCategory(selectedTransaction.category)
            setDate(selectedTransaction.date)
            setAmount(selectedTransaction.amount.toString())
        } else {
            setTitle("")
            setType("expense")
            setCategory("")
            setDate(today)
            setAmount("")
        }

    }, [selectedTransaction])


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mt-5"
        >
            {/* Income / Expense toggle */}
            <div className="flex justify-center">
                <div className="relative flex w-64 rounded-lg bg-[#11011a] p-1">
                    <div
                        className={`absolute inset-y-1 w-[48.5%] rounded-md bg-violet-600 transition-transform duration-300 ${
                            type === 'expense'
                                ? 'translate-x-0'
                                : 'translate-x-full'
                        }`}
                    />

                    <button
                        type="button"
                        aria-pressed={type === 'expense'}
                        onClick={() => handleTypeChange('expense')}
                        className={`relative z-10 flex-1 py-1 font-semibold ${
                            type === 'expense' ? 'text-white' : 'text-gray-400'
                        }`}
                    >
                        Expense
                    </button>

                    <button
                        type="button"
                        aria-pressed={type === 'income'}
                        onClick={() => handleTypeChange('income')}
                        className={`relative z-10 flex-1 py-1 font-semibold ${
                            type === 'income' ? 'text-white' : 'text-gray-400'
                        }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-sm text-gray-300">
                    Description
                </label>

                <input
                    type="text"
                    id="description"
                    value={title}
                    name="description"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="What was this transaction for?"
                    maxLength={60}
                    required
                    className="w-full rounded-lg border border-[#514067] bg-[#1c0927] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
            </div>

            {/* Amount */}
            <div className="flex flex-col items-center gap-2 py-2">
                <label htmlFor="amount" className="text-xs font-semibold tracking-widest text-gray-400">
                    TRANSACTION AMOUNT
                </label>

                <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-semibold text-violet-400">₹</span>

                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        name="amount"
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        required
                        className="w-52 bg-transparent text-center text-4xl font-bold text-white outline-none placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Category and date */}
            <div className="flex items-center justify-between border-y border-white/10 py-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-violet-400">
                        category
                    </span>

                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                        className="max-w-36 bg-transparent text-sm text-gray-300 outline-none"
                    >
                        <option value="" disabled>Category</option>

                        {availableCategories.map(item => (
                            <option
                                key={item}
                                value={item}
                                className="bg-[#1c0927]"
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-violet-400">
                        calendar_month
                    </span>

                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        name="date"
                        required
                        className="w-32 bg-transparent text-sm text-gray-300 outline-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {isEditing && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-[#514067] px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    className="flex-1 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                    {isEditing ? 'Save Changes' : 'Add Transaction'}
                </button>
            </div>
        </form>
    )
}

export default TransactionForm
