const SummaryCards = ({ summary, loading }) => {
  if (loading) {
    return (
      <div className="summary-cards">
        {[1, 2, 3].map(i => (
          <div key={i} className="summary-card" style={{ opacity: 0.5 }}>
            <div className="summary-icon icon-blue">⏳</div>
            <div className="summary-info">
              <label>Loading...</label>
              <h2 style={{ color: '#ddd' }}>₹ ---</h2>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-icon icon-green">💰</div>
        <div className="summary-info">
          <label>Total Income</label>
          <h2 className="text-green">
            ₹{summary.totalIncome.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon icon-red">💸</div>
        <div className="summary-info">
          <label>Total Expenses</label>
          <h2 className="text-red">
            ₹{summary.totalExpense.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon icon-blue">📊</div>
        <div className="summary-info">
          <label>Net Balance</label>
          <h2 className={summary.balance >= 0 ? 'text-green' : 'text-red'}>
            {summary.balance >= 0 ? '' : '-'}₹{Math.abs(summary.balance).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards