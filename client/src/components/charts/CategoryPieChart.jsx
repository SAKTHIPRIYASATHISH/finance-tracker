import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = [
  '#667eea', '#764ba2', '#f093fb',
  '#4facfe', '#43e97b', '#fa709a',
  '#fee140', '#30cfd0'
]

const CategoryPieChart = ({ categoryBreakdown, totalExpense }) => {
  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return (
      <div className="chart-card">
        <h3>Expense Breakdown</h3>
        <div className="no-data">No expense data yet</div>
      </div>
    )
  }

  const data = categoryBreakdown.map(item => ({
    name: item._id,
    value: item.total
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percent = ((payload[0].value / totalExpense) * 100).toFixed(1)
      return (
        <div style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px'
        }}>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill }}>
            ₹{payload[0].value.toLocaleString()}
          </p>
          <p style={{ color: '#888' }}>{percent}% of expenses</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="chart-card">
      <h3>Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: '12px', color: '#666' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategoryPieChart