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
const searchBtn = document.querySelector('.searchBtn');
const closeBtn = document.getElementById('closeBtn');
const navigationItems = document.querySelectorAll('.navigation');
const cnrBtn = document.querySelector('.cnrBtn')

const sampleTransactions = [
    {
        id: 1,
        description: "Monthly Salary",
        amount: 25000,
        type: "income",
        category: "Salary",
        date: "2026-11-01"
    },
    {
        id: 2,
        description: "Grocery Shopping",
        amount: 1800,
        type: "expense",
        category: "Food",
        date: "2026-11-02"
    },
    {
        id: 3,
        description: "Freelance Website",
        amount: 5000,
        type: "income",
        category: "Freelance",
        date: "2026-11-03"
    },
    {
        id: 4,
        description: "Electricity Bill",
        amount: 1200,
        type: "expense",
        category: "Bills",
        date: "2026-11-04"
    },
    {
        id: 5,
        description: "Movie Tickets",
        amount: 600,
        type: "expense",
        category: "Entertainment",
        date: "2026-11-05"
    }
];

const storedTransactions = localStorage.getItem('expense-transactions');

const transactions = storedTransactions
    ? JSON.parse(storedTransactions)
    : sampleTransactions;

if (!storedTransactions) {
    localStorage.setItem(
        'expense-transactions',
        JSON.stringify(sampleTransactions)
    );
}

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

const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.max = today;

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
        
        li.addEventListener('click', () => {
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

        li.append(details, deleteBtn);
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

const applyFilters = () => {
    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter.value === "All Categories" ||
            categoryFilter.value === t.category;

        return matchesSearch && matchesCategory;
    })
    renderTransactions(filteredTransactions);
}

let search = '';

searchBtn.addEventListener('click', () => {

    let searchInp = document.querySelector('.searchInp');

    if (!searchInp) {
        const searchInp = document.createElement('input');
        searchInp.classList.add('searchInp');
        searchInp.placeholder = 'Search transactions...';

        cnrBtn.prepend(searchInp);

        searchInp.addEventListener('input', () => {
            search = searchInp.value.trim().toLowerCase();
            applyFilters();
        })
    } else {
        searchInp.focus();
    }
})

categoryFilter.addEventListener('change', applyFilters);

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
    const confirmDelete = confirm('Are you sure you want to delete this transaction?')

    if (!confirmDelete) return;

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

const overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
})

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});
