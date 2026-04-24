const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Temporary debug route
app.get('/api/debug', protect, async (req, res) => {
  const mongoose = require('mongoose');
  const Transaction = require('./models/Transaction');

  const userId = new mongoose.Types.ObjectId(req.user._id);

  const all = await Transaction.find({});
  const mine = await Transaction.find({ userId: req.user._id });
  const agg = await Transaction.aggregate([{ $match: { userId: userId } }]);

  res.json({
    totalInDB: all.length,
    myTransactions: mine.length,
    aggMatch: agg.length,
    myUserId: req.user._id.toString(),
    firstTransaction: all[0] || null
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));