const API_URL = 'http://localhost:5000/transactions';

const balance = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions');

// Fetch and display transactions
async function fetchTransactions() {
  const res = await fetch(API_URL);
  const transactions = await res.json();
  renderTransactions(transactions);
}

function renderTransactions(transactions) {
  transactionsList.innerHTML = '';
  let total = 0;

  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    li.innerHTML = `${transaction.text} - $${transaction.amount} 
      <button onclick="deleteTransaction('${transaction._id}')">X</button>`;
    li.className = transaction.amount > 0 ? 'income' : 'expense';
    transactionsList.appendChild(li);

    total += transaction.amount;
  });

  balance.innerText = `$${total.toFixed(2)}`;
}

// Add new transaction
transactionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.getElementById('text').value;
  const amount = Number(document.getElementById('amount').value);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, amount }),
  });

  if (res.ok) fetchTransactions();
});

// Delete transaction
async function deleteTransaction(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTransactions();
}

fetchTransactions();
