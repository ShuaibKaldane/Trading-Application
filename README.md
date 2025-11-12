# Trading Application

A full-stack trading platform built with React, Express, and MongoDB. The application provides a complete trading experience with user authentication, buy/sell functionality, real-time portfolio tracking, and comprehensive trading analytics.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Workflow](#project-workflow)

---

## 📁 Project Structure

The project is organized into three main applications:

```
Trading-Application/
├── backend/              # Express.js backend server
│   ├── index.js         # Main server file
│   ├── package.json
│   ├── .env             # Environment variables
│   ├── model/           # Mongoose models
│   │   ├── UserModel.js
│   │   ├── OrdersModel.js
│   │   ├── PositionsModel.js
│   │   └── HoldingsModel.js
│   └── schema/          # Mongoose schemas
│       ├── UserSchema.js
│       ├── OrdersSchema.js
│       ├── PositionsSchema.js
│       └── HoldingsSchema.js
├── frontend/            # React landing page & authentication
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── landing_page/    # Public pages
│   │   │   ├── home/        # Homepage
│   │   │   ├── about/       # About page
│   │   │   ├── pricing/     # Pricing page
│   │   │   ├── product/     # Product page
│   │   │   ├── support/     # Support page
│   │   │   ├── login/       # Login page
│   │   │   ├── signup/      # Signup page
│   │   │   └── NotFound.jsx
│   ├── package.json
│   └── .env
└── dashboard/           # React trading dashboard
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── Home.jsx
    │   │   ├── Menu.jsx
    │   │   ├── TopBar.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Holdings.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Positions.jsx
    │   │   ├── Funds.jsx
    │   │   ├── WatchList.jsx
    │   │   ├── BuyActionWindow.jsx   # Buy order UI
    │   │   ├── SellActionWindow.jsx  # Sell order UI
    │   │   ├── Summary.jsx
    │   │   ├── DoughnoutChart.jsx
    │   │   ├── VerticalGraph.jsx
    │   │   ├── GeneralContext.jsx    # Context for UI state
    │   │   └── [other components]
    │   ├── data/
    │   │   └── data.js      # Mock watchlist data
    │   └── package.json
    └── public/
        └── media/          # Images and media files
```

---

## ✨ Features

### Authentication
- **User Registration**: Create new trading accounts with email and password
- **User Login**: Secure login with session-based authentication using Passport.js
- **User Logout**: Clear session and redirect to homepage

### Trading Operations
- **Buy Orders**: Place buy orders for stocks with quantity and price
  - Automatic position creation or update
  - Average price calculation for multiple purchases
- **Sell Orders**: Place sell orders for existing positions
  - Validates sufficient quantity before selling
  - Removes position when quantity reaches zero
  - Inline error handling for invalid sells

### Portfolio Management
- **Positions**: Real-time view of all open positions with:
  - Quantity, average price, and current LTP (Last Traded Price)
  - Profit & Loss (P&L) calculations
  - Daily change tracking
- **Holdings**: View holdings details
- **Orders**: Complete order history (Buy & Sell)
- **Funds**: Account funds and margin tracking

### Dashboard Features
- **WatchList**: Monitor multiple stocks with:
  - Quick Buy/Sell buttons
  - Price charts and analytics
  - Doughnut charts for portfolio visualization
- **Summary**: Portfolio overview and statistics
- **Responsive UI**: Clean, intuitive interface with Material-UI components

---

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy & passport-local-mongoose
- **Session Management**: express-session
- **CORS**: Enabled for cross-origin requests
- **Port**: 3002 (configurable via .env)

### Frontend (Landing Page)
- **Framework**: React 19
- **Routing**: React Router v7
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Port**: 3000 (by default) → 5173 (configured in .env)

### Dashboard (Trading Platform)
- **Framework**: React 18
- **Routing**: React Router v6
- **UI Library**: Material-UI (MUI)
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Port**: 5174 (configured in .env)

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** Atlas account or local MongoDB instance

### Clone Repository
```bash
git clone <repository-url>
cd Trading-Application
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Dashboard Setup
```bash
cd dashboard
npm install
```

---

## ⚙️ Configuration

### Backend Configuration (backend/.env)
```properties
# MongoDB Connection URL
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=<app-name>

# Session Secret (optional, defaults to 'sessionsecret')
SESSION_SECRET=your_secret_key_here

# Server Port (optional, defaults to 3002)
PORT=3002
```

### Frontend Configuration (frontend/.env)
```properties
# Dashboard URL for post-login redirect
VITE_DASHBOARD_URL=http://localhost:5174
```

### Dashboard Configuration (dashboard/.env)
```properties
# Backend API URL (if different from default)
VITE_API_URL=http://localhost:3002
```

---

## 🚀 Running the Application

### Start All Services (Recommended)

**Option 1: Run each in separate terminals**

**Terminal 1 - Backend Server**
```bash
cd backend
npm start
# Server runs on http://localhost:3002
```

**Terminal 2 - Frontend (Landing Page)**
```bash
cd frontend
npm run dev
# Landing page runs on http://localhost:5173
```

**Terminal 3 - Dashboard (Trading Platform)**
```bash
cd dashboard
npm run dev
# Dashboard runs on http://localhost:5174
```

### Build for Production

**Frontend**
```bash
cd frontend
npm run build
```

**Dashboard**
```bash
cd dashboard
npm run build
```

**Backend**
```bash
cd backend
# No build step needed, runs directly with Node
npm start
```

---

## 📡 API Endpoints

### Authentication

**POST** `/signup`
- Create a new user account
- Body: `{ username: string, password: string }`
- Returns: `{ message: "Signup successful" }`

**POST** `/login`
- Authenticate user and create session
- Body: `{ username: string, password: string }`
- Returns: `{ message: "Login successful" }`

**POST** `/logout`
- Logout user and destroy session
- Returns: `{ message: "Logged out" }`

**GET** `/dashboard`
- Protected route - returns user dashboard info
- Requires: Active session
- Returns: `{ message: "Welcome to dashboard", user: string }`

### Orders & Positions

**GET** `/allOrders`
- Fetch all orders (Buy & Sell history)
- Returns: Array of orders

**POST** `/newOrder`
- Place a new Buy or Sell order
- Body: `{ name: string, qty: number, price: number, mode: "BUY" | "SELL" }`
- Returns: `{ message: "Order processed" }`
- Errors:
  - `400`: Position not found (for SELL)
  - `400`: Insufficient quantity to sell
  - `400`: Missing order fields

**GET** `/allPositions`
- Fetch all open positions
- Returns: Array of positions with details

### Holdings

**GET** `/allHoldings`
- Fetch all holdings
- Returns: Array of holdings

---

## 🔄 Project Workflow

### 1. User Registration & Login
1. User navigates to frontend homepage (`http://localhost:5173`)
2. Clicks "Sign Up" → Creates account with email/password
3. Logs in with credentials
4. Backend validates via Passport.js and creates session
5. User redirected to dashboard (`http://localhost:5174`)

### 2. Placing Buy Orders
1. User views WatchList on dashboard
2. Hovers over a stock and clicks "Buy"
3. BuyActionWindow opens with qty and price fields
4. User enters quantity and price, clicks "Buy"
5. POST request sent to `/newOrder` with mode: "BUY"
6. Backend:
   - Creates new Position or updates existing
   - Calculates average price if quantity increased
   - Saves Order record
7. Dashboard refreshes, new/updated Position appears in Positions component

### 3. Placing Sell Orders
1. User navigates to Positions page
2. Clicks "Sell" on a stock they own
3. SellActionWindow opens
4. User enters quantity and price, clicks "Sell"
5. POST request sent to `/newOrder` with mode: "SELL"
6. Backend:
   - Validates position exists
   - Checks if available quantity ≥ requested quantity
   - Reduces position quantity or deletes if zero
   - Saves Order record
   - Returns error message if validation fails
7. Error displays inline in SellActionWindow (no page reload on error)
8. On success, dashboard refreshes and Position updates

### 4. Portfolio Management
1. Holdings page shows all holdings
2. Orders page displays complete order history (buy/sell)
3. Positions page shows open positions with P&L
4. Funds page displays available margin and account balance

### 5. Logout
1. User clicks "Logout" button in Menu
2. Backend `/logout` endpoint called
3. Session destroyed
4. User redirected to frontend homepage

---

## 🎨 UI/UX Features

### Dashboard Components
- **Menu**: Navigation sidebar with logout button
- **TopBar**: Header with user info
- **WatchList**: Stock monitoring with charts
- **BuyActionWindow**: Modal for placing buy orders with inline error display
- **SellActionWindow**: Modal for placing sell orders with inline error display
- **Positions**: Real-time position tracking
- **Summary**: Portfolio overview

### Error Handling
- Inline error messages for Buy/Sell orders
- Form validation on client and server
- Graceful fallbacks (e.g., logout redirects even on error)
- User-friendly error messages

---

## 🔒 Security Features

- **Passport.js Authentication**: Secure user authentication
- **Session Management**: Server-side session storage
- **CORS**: Configured for secure cross-origin requests
- **Password Hashing**: Automatic via passport-local-mongoose
- **Protected Routes**: Dashboard endpoints require authentication

---

## 📝 Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `MONGO_URL` | MongoDB connection string | Required |
| `SESSION_SECRET` | Session encryption key | `'sessionsecret'` |
| `PORT` | Backend server port | `3002` |
| `VITE_DASHBOARD_URL` | Frontend → Dashboard redirect | `http://localhost:5174` |

---

## 🚨 Known Limitations & Future Enhancements

### Current
- Page reload after successful Buy/Sell (full refresh)
- Mock watchlist data (not real-time market data)
- Inline styling for some components

### Potential Enhancements
- Replace page reload with context-based state refresh
- Integrate real-time market data APIs
- Add unit/integration tests
- Implement refresh token-based auth
- Add transaction history filtering
- Real-time WebSocket updates for positions
- Advanced charting and analytics
- Multi-strategy position management

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📧 Support

For issues or questions, please reach out to the development team.

---

---

**Last Updated**: November 2025
