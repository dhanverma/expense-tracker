const transList = document.getElementById('transactions');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input')
const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.menuBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.querySelector('.overlay')

let transactions = JSON.parse(
    localStorage.getItem('expense-transactions')
) || [];



const renderTransactions = (items) => {
    transList.innerHTML = '';

    if (items.length === 0) {
        const msg = document.createElement('p')
        msg.textContent = 'No transactions found. Add your first transaction!'
        msg.classList.add('empty-msg')
        transList.appendChild(msg)
        return;
    };
    items.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add('transaction-item');

        const details = document.createElement('span');
        details.textContent = `${transaction.date} - ${transaction.description} - ${transaction.category} - ₹${transaction.amount.toFixed(2)} (${transaction.type})`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');

        editBtn.addEventListener('click', () => {
            editTransaction(transaction.id);
        })

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

const applyFilters = () => {
    const search = searchInput.value.trim().toLowerCase();

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter.value === "All Categories" ||
            categoryFilter.value === t.category;

        return matchesSearch && matchesCategory;
    })
    const sorted = filteredTransactions.slice().sort((a, b) => {
        return b.date.localeCompare(a.date);
    });
    renderTransactions(sorted);
};

const deleteTransaction = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this transaction?')

    if (!confirmDelete) return;

    transactions = transactions.filter(t => t.id !== id);

    localStorage.setItem(
        'expense-transactions',
        JSON.stringify(transactions)
    );

    applyFilters();
};


searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

applyFilters();

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});
