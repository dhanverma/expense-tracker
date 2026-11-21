import { useMemo, useState } from 'react'
import RecentTransactions from './RecentTransactions.jsx'
import AddTransaxnBtn from './AddTransaxnBtn.jsx'

const TransactionsView = ({ transactions, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')

  const categories = useMemo(() =>
    [...new Set(transactions.map((transaction) => transaction.category).filter(Boolean))].sort(),
  [transactions])

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = transactions.filter((transaction) => {
      const matchesSearch = transaction.title.toLowerCase().includes(query)
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
      return matchesSearch && matchesType && matchesCategory
    })

    return result.sort((a, b) => {
      if (sortOrder === 'oldest') return a.date.localeCompare(b.date)
      if (sortOrder === 'highest') return Number(b.amount) - Number(a.amount)
      if (sortOrder === 'lowest') return Number(a.amount) - Number(b.amount)
      return b.date.localeCompare(a.date)
    })
  }, [transactions, search, typeFilter, categoryFilter, sortOrder])

  return (
    <section className="min-w-0 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Transactions</h1>
          <p className="mt-1 text-sm text-gray-400">Search, filter and manage all your transactions.</p>
        </div>
        <AddTransaxnBtn onClick ={onAdd} />
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#1d1531] bg-[#150d29] p-4 sm:grid-cols-2 xl:grid-cols-4">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by description..."
          aria-label="Search transactions"
          className="min-w-0 rounded-lg border border-[#514067] bg-[#1c0927] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
        />
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by transaction type" className="rounded-lg border border-[#514067] bg-[#1c0927] px-3 py-2 text-sm text-white outline-none">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category" className="rounded-lg border border-[#514067] bg-[#1c0927] px-3 py-2 text-sm text-white outline-none">
          <option value="all">All categories</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort transactions" className="rounded-lg border border-[#514067] bg-[#1c0927] px-3 py-2 text-sm text-white outline-none">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest amount</option>
          <option value="lowest">Lowest amount</option>
        </select>
      </div>

      <RecentTransactions
        title={`All Transactions (${filteredTransactions.length})`}
        transactions={filteredTransactions}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </section>
  )
}

export default TransactionsView
