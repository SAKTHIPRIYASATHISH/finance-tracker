import { useState, useEffect } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import SummaryCards from '../components/SummaryCards'
import SpendingBarChart from '../components/charts/SpendingBarChart'
import CategoryPieChart from '../components/charts/CategoryPieChart'

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

const Dashboard = () => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryBreakdown: []
  })
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)
  const [loadingTransactions, setLoadingTransactions] = useState(true)
  const [loadingSummary, setLoadingSummary] = useState(true)

  const fetchTransactions = async () => {
    setLoadingTransactions(true)
    try {
      const res = await API.get(`/transactions?month=${month}&year=${year}`)
      setTransactions(res.data)
    } catch (err) {
      console.error('Failed to fetch transactions', err)
    } finally {
      setLoadingTransactions(false)
    }
  }

  const fetchSummary = async () => {
    setLoadingSummary(true)
    try {
      const res = await API.get(`/transactions/summary?month=${month}&year=${year}`)
      setSummary(res.data)
    } catch (err) {
      console.error('Failed to fetch summary', err)
    } finally {
      setLoadingSummary(false)
    }
  }

  const fetchAll = () => {
    fetchTransactions()
    fetchSummary()
  }

  useEffect(() => {
    fetchAll()
  }, [month, year])

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <div>
      <Navbar />
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="month-filter">
            <select value={month} onChange={e => setMonth(Number(e.target.value))}>
              {MONTHS.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
            <select value={year} onChange={e => setYear(Number(e.target.value))}>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards summary={summary} loading={loadingSummary} />

        {/* Charts */}
        <div className="charts-section">
          <SpendingBarChart categoryBreakdown={summary.categoryBreakdown} />
          <CategoryPieChart
            categoryBreakdown={summary.categoryBreakdown}
            totalExpense={summary.totalExpense}
          />
        </div>

        {/* Transactions */}
        <div className="dashboard-grid">
          <TransactionForm onTransactionAdded={fetchAll} />
          {loadingTransactions ? (
            <div className="loading">Loading transactions...</div>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={fetchAll}
            />
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard