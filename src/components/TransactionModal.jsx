import React from 'react'
import TransactionForm from './TransactionForm'

const TransactionModal = ({ isOpen, onUpdate, onClose , isEditing , onAdd , selectedTransaction}) => {


    if (!isOpen) return null;
    return (
        <div className='rounded-xl fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
            <div className="w-full max-w-md rounded-2xl bg-[#3b1270] px-5 py-4 shadow-xl">
                <div className="flex justify-between font-extrabold text-xl text-shadow-lg text-shadow-[#11011a]">
                    <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>

                    <button type="button" onClick={onClose}>
                        ✖
                    </button>
                </div>

                <TransactionForm
                    isEditing={isEditing}
                    onClose={onClose}
                    onAdd={onAdd}
                    selectedTransaction={selectedTransaction}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    )
}

export default TransactionModal
