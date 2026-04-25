# 💰 Personal Finance Tracker

A full-stack **MERN application** to track income, expenses, and analyze spending patterns with interactive visualizations.

🌐 **Live Demo:** https://financetracker-orcin.vercel.app

---

## 🎯 Purpose

This project helps users manage their personal finances efficiently by tracking transactions, visualizing spending habits, and gaining insights to make better financial decisions.

---

## ✨ Features

* 🔐 User authentication using JWT (Register, Login, Logout)
* ➕ Add, view, update, and delete transactions
* 📊 Interactive **bar chart** (spending by category)
* 🥧 **Pie chart** for expense distribution
* 📅 Filter transactions by month and year
* 💳 Summary cards showing income, expenses, and balance
* 📱 Fully responsive UI

---

## 🔥 Highlights

* Built a complete **full-stack MERN application** from scratch
* Designed and implemented **RESTful APIs**
* Integrated **secure authentication** with JWT and bcrypt
* Used **Recharts** for dynamic data visualization
* Deployed scalable application using **Vercel + Render + MongoDB Atlas**

---

## 🛠️ Tech Stack

**Frontend:**
React.js, Vite, React Router, Axios, Recharts

**Backend:**
Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

**Deployment:**
Vercel (Frontend), Render (Backend), MongoDB Atlas

---

## 📸 Screenshots

<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/7b633dbe-ac76-4769-95f6-5282bec8ad1a" />



## 🔗 API Endpoints

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | /api/auth/register        | Register new user          |
| POST   | /api/auth/login           | Login user                 |
| GET    | /api/transactions         | Get all transactions       |
| POST   | /api/transactions         | Add transaction            |
| PUT    | /api/transactions/:id     | Update transaction         |
| DELETE | /api/transactions/:id     | Delete transaction         |
| GET    | /api/transactions/summary | Get summary and chart data |

---

## 🚀 Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SAKTHIPRIYASATHISH/finance-tracker.git
cd finance-tracker
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
finance-tracker/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # UI components
│   │   ├── context/        # Auth context
│   │   └── pages/          # Pages (Login, Register, Dashboard)
│
└── server/                 # Node.js backend
    ├── config/             # DB connection
    ├── controllers/        # Business logic
    ├── middleware/         # Auth middleware
    ├── models/             # Schemas
    └── routes/             # API routes
```

---

## 🚧 Future Enhancements

* 📊 Budget alerts & smart notifications
* 📄 Export reports (PDF/Excel)
* 👥 Shared expense tracking (multi-user)
* 🤖 AI-based spending insights

---

## 👩‍💻 Author

**Sakthi Priya S**
🔗 GitHub: https://github.com/SAKTHIPRIYASATHISH
🌐 Live Project: https://financetracker-orcin.vercel.app

---


