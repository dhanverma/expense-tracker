import React from 'react'
import StatCard from './StatCard.jsx'

const SummaryCards = ({totalIncome, totalExpense, totalBalance, totalSaving}) => {
  const cards = [
    {id:1, title:'Total Balance', amount: totalBalance, icon:'💳', variant:'balance', change:"↑ 12%"},
    {id:2, title:'Total Income', amount: totalIncome, icon:'⇑', variant:'income', change:"↑ 8%"},
    {id:3, title:'Total Expense', amount: totalExpense, icon:'⇓', variant:'expense', change:"↑ 5%"},
    {id:4, title:'Total Savings', amount: totalSaving, icon:'🏦', variant:'savings', change:"↑ 50%"},

  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 pb-4">
      {cards.map(card => (
        <StatCard 
        key = {card.id}
        title = {card.title}
        amount = {card.amount}
        icon = {card.icon}
        variant = {card.variant}
        change = {card.change}
        />
      ))}
        
    </div>
  )
}

export default SummaryCards
