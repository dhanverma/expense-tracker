const form = document.getElementById('transaction-form');
const descInput = document.getElementById('description');
const amtInput = document.getElementById('amount');
const transList = document.getElementById('transactions');
const incomeAmt = document.getElementById('income-amount');
const expenseAmt = document.getElementById('expense-amount');
const balanceAmt = document.getElementById('balance-amount');
const submitBtn = document.getElementById('submit-btn');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const categoryFilter = document.getElementById('category-filter');
const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.menuBtn');
const closeBtn = document.getElementById('closeBtn');


const storedTransactions = localStorage.getItem('expense-transactions');
let editingTransactionId = null;

const transactions = storedTransactions
    ? JSON.parse(storedTransactions)
    : [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = descInput.value.trim();
    const amount = parseFloat(amtInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;
    if (description === '' || !Number.isFinite(amount) || amount <= 0) return
    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date
    };

    if (editingTransactionId !== null) {
        const obj = transactions.find(t => t.id === editingTransactionId)
        obj.description = description;
        obj.amount = amount;
        obj.type = type;
        obj.category = category;
        obj.date = date;
        editingTransactionId = null;
        submitBtn.textContent = 'Add Transaction';
    }
    else { transactions.push(transaction); }

    localStorage.setItem('expense-transactions', JSON.stringify(transactions))

    renderTransactions();
    updateSummary();
    form.reset();
});

const renderTransactions = (filteredTransactions = transactions) => {
    transList.innerHTML = '';

    const sortedTransactions = filteredTransactions.slice().sort((a, b) => {
        return b.date.localeCompare(a.date);
    });
    if (sortedTransactions.length === 0) {
        const msg = document.createElement('p')
        msg.textContent = 'No transactions found. Add your first transaction!'
        msg.classList.add('empty-msg')
        transList.appendChild(msg)
        return;
    };
    sortedTransactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add('transaction-item');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');

        editBtn.addEventListener('click', () => {
            editTransaction(transaction.id);
        })

        const details = document.createElement('span');
        details.textContent = `${transaction.date} - ${transaction.description} - ${transaction.category} - ₹${transaction.amount.toFixed(2)} (${transaction.type})`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            deleteTransaction(transaction.id);
        });

        const actions = document.createElement('div');
        actions.classList.add('transaction-actions');

        actions.append(editBtn, deleteBtn);
        li.append(details, actions);
        transList.appendChild(li);
    });
};

const editTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        descInput.value = transaction.description;
        amtInput.value = transaction.amount;
        typeInput.value = transaction.type;
        categoryInput.value = transaction.category;
        dateInput.value = transaction.date;
        editingTransactionId = id;
        cancelEditBtn.style.display = 'block';
        submitBtn.textContent = 'Update';

    }
};

categoryFilter.addEventListener('change', () => {
    const filteredTransactions = transactions.filter((t) => {
        return categoryFilter.value === 'All Categories' ||
            categoryFilter.value === t.category;
    })

    renderTransactions(filteredTransactions);
})

cancelEditBtn.addEventListener('click', () => {
    form.reset();
    editingTransactionId = null;
    submitBtn.textContent = 'Add Transaction'
    cancelEditBtn.style.display = 'none'
});

const updateSummary = () => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0).toFixed(2);
    incomeAmt.textContent = `₹${totalIncome}`;
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0).toFixed(2);
    expenseAmt.textContent = `₹${totalExpense}`;
    const balance = (parseFloat(totalIncome) - parseFloat(totalExpense)).toFixed(2);
    balanceAmt.textContent = `₹${balance}`;
}

const deleteTransaction = (id) => {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        localStorage.setItem('expense-transactions', JSON.stringify(transactions))
        renderTransactions();
        updateSummary();
    }
}
renderTransactions();
updateSummary();

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

const navigationItems = document.querySelectorAll('.navigation');

navigationItems.forEach(item => {
    item.addEventListener('click', () => {
        navigationItems.forEach(nav => {
            nav.classList.remove('active');
        });

        item.classList.add('active');
    });
});