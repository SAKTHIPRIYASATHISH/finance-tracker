import API from '../api/axios'

const CATEGORY_ICONS = {
  Salary: '💼',
  Food: '🍔',
  Rent: '🏠',
  Transport: '🚗',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Health: '💊',
  Other: '📦'
}

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return
    try {
      await API.delete(`/transactions/${id}`)
      onDelete()
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h3>Recent Transactions</h3>
        <div className="empty-state">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
          <p>No transactions this month</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Add one using the form
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3>Recent Transactions
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 400,
          color: '#aaa',
          marginLeft: '8px'
        }}>
          {transactions.length} total
        </span>
      </h3>
      {transactions.map(t => (
        <div key={t._id} className="transaction-item">
          <div className="transaction-left">
            <div className={`transaction-icon ${t.type === 'income' ? 'icon-income' : 'icon-expense'}`}>
              {CATEGORY_ICONS[t.category] || '📦'}
            </div>
            <div className="transaction-info">
              <h4>{t.category}</h4>
              <p>
                {t.description || 'No description'} · {new Date(t.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="transaction-right">
            <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
              {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
            </span>
            <button
              className="btn-delete"
              onClick={() => handleDelete(t._id)}
              title="Delete transaction"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList