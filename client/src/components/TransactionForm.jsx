import { useState } from 'react'
import API from '../api/axios'

const CATEGORIES = [
  'Salary', 'Food', 'Rent', 'Transport',
  'Shopping', 'Entertainment', 'Health', 'Other'
]

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: 'Salary',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await API.post('/transactions', formData)
      setFormData({
        type: 'income',
        amount: '',
        category: 'Salary',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
      onTransactionAdded()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3>Add Transaction</h3>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-add" disabled={loading}>
          {loading ? 'Adding...' : '+ Add Transaction'}
        </button>
      </form>
    </div>
  )
}

export default TransactionForm