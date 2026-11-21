
import React from 'react';

const variants = {
    balance: {
        card: ' border-emerald-600/30 bg-gradient-to-r from-emerald-800 via-emerald-900/50 to-emerald-950',
        icon: 'bg-gradient-to-r from-emerald-500/80',
        change: 'text-emerald-400',
        compare: 'from last month'
    },

    income: {
        card: 'border-blue-500/30 bg-gradient-to-r from-blue-800/70 via-blue-950/60 to-indigo-950',
        icon: 'bg-gradient-to-r from-blue-500',
        change: 'text-blue-400',
        compare: 'from last month'
    },

    expense: {
        card: 'border-rose-500/20 bg-gradient-to-r from-rose-800/70 via-rose-900/20 to-rose-950/70',
        icon: 'bg-gradient-to-r from-rose-500',
        change: 'text-rose-400',
        compare: 'from last month'
    },

    savings: {
        card: 'border-amber-500/20 bg-gradient-to-r from-yellow-400/40 via-yellow-500/20 to-yellow-900/70',
        icon: 'bg-gradient-to-r from-amber-500',
        change: 'text-amber-400',
        compare: 'of income'
    }
};

const StatCard = ({
    title,
    amount,
    icon,
    variant = 'balance',
    change
}) => {

    const styles = variants[variant] || variants.balance;

    return (
        <div className={`flex flex-col sm:flex-row justify-start sm:items-center gap-2 rounded-xl border p-2.5 ${styles.card}`}>

            {/* Icon */}
            <div className={`flex h-12 w-12 mr-2 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
                {icon}
            </div>

            {/* Information */}
            <div className="min-w-0">
                <p className="text-sm text-white/90">
                    {title}
                </p>

                <h2 className="text-2xl font-bold pb-1 text-white">
                    {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(amount)}
                </h2>

                <p className={`text-xs font-medium ${styles.change}`}>
                    {change} <span className="font-normal text-white/70">{styles.compare}</span>
                </p>
            </div>

        </div>
    );
};

export default StatCard;
