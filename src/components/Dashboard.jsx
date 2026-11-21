import { useState } from 'react'
import Header from './Header.jsx'
import Greeting from './Greeting.jsx'
import SummaryCards from './SummaryCards.jsx'
import RecentTransactions from './RecentTransactions.jsx'
import SpendingOverview from './SpendingOverview.jsx'
import BudgetOverview from './BudgetOverview.jsx'
import SavingsGoals from './SavingsGoals.jsx'
import InsightsView from './InsightsView.jsx'

const Dashboard = ({ transactions, onAdd, onEdit, onDelete, onNavigate }) => {
  const [search, setSearch] = useState('')
  const [timeSpan, setTimeSpan] = useState('This Month')

  const now = new Date()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchSearch = transaction.title.toLowerCase().includes(search.trim().toLowerCase())

    let startDate
    let endDate = now

    switch (timeSpan) {
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0)
        break;
      case 'Last Month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0)
        endDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break;
      case 'Last 3 Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1, 0)
        break;
      case 'This Year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break;
      default:
        startDate = new Date(0)
        break;
    }

    const transactionDate = new Date(transaction.date)
    const matchTime = transactionDate >= startDate &&
      transactionDate < endDate

    return matchSearch && matchTime

  })

  const totalIncome = filteredTransactions.reduce((total, transaction) =>
    transaction.type === 'income' ? total + Number(transaction.amount) : total, 0)
  const totalExpense = filteredTransactions.reduce((total, transaction) =>
    transaction.type === 'expense' ? total + Number(transaction.amount) : total, 0)
  const totalBalance = totalIncome - totalExpense

  return (
    <div className="min-w-0">
      <Header onAdd={onAdd} search={search} onSearch={(event) => setSearch(event.target.value)} />
      <Greeting
        timeSpan={timeSpan}
        setTimeSpan={setTimeSpan}
      />
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        totalBalance={totalBalance}
        totalSaving={totalBalance}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2.5fr_1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <SpendingOverview transactions={transactions} />
          <RecentTransactions
            title="Recent Transactions"
            transactions={filteredTransactions.slice(0, 5)}
            onDelete={onDelete}
            onEdit={onEdit}
            onViewAll={() => onNavigate('Transactions')}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <BudgetOverview />
          <SavingsGoals />
          <InsightsView />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
