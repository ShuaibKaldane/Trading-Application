require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// Start server and connect to database
app.listen(PORT, async () => {
  console.log(`Server Started on port ${PORT}`);
  try {
    await mongoose.connect(url);
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
});

// Allow credentials so frontend can send cookies. In production set a specific origin.
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// Session + Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "sessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // secure should be true in production with HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport-Local-Mongoose exposes helpers on the model
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode)
      return res.status(400).json({ message: "Missing order fields" });

    // Process BUY
    if (mode === "BUY") {
      // find existing position
      let pos = await PositionsModel.findOne({ name });
      if (pos) {
        const oldQty = pos.qty || 0;
        const oldAvg = pos.avg || 0;
        const newQty = oldQty + Number(qty);
        const newAvg = (oldAvg * oldQty + Number(price) * Number(qty)) / newQty;
        pos.qty = newQty;
        pos.avg = newAvg;
        pos.price = Number(price);
        await pos.save();
      } else {
        // create new position
        const newPos = new PositionsModel({
          product: "EQUITY",
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "",
          day: "",
          isLoss: false,
        });
        await newPos.save();
      }
      const newOrder = new OrdersModel({ name, qty, price, mode });
      await newOrder.save();
      return res.json({ message: "Buy order processed" });
    }

    // Process SELL
    if (mode === "SELL") {
      let pos = await PositionsModel.findOne({ name });
      if (!pos) {
        return res.status(400).json({ message: "Position not found" });
      }
      const available = pos.qty || 0;
      if (available < Number(qty)) {
        return res.status(400).json({ message: "Insufficient quantity to sell" });
      }
      const newQty = available - Number(qty);
      if (newQty === 0) {
        await PositionsModel.deleteOne({ _id: pos._id });
      } else {
        pos.qty = newQty;
        pos.price = Number(price);
        await pos.save();
      }
      const newOrder = new OrdersModel({ name, qty, price, mode });
      await newOrder.save();
      return res.json({ message: "Sell order processed" });
    }

    // Unknown mode
    return res.status(400).json({ message: "Unknown order mode" });
  } catch (err) {
    console.error("/newOrder error", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Signup: create a new user
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  try {
    UserModel.register(new UserModel({ username }), password, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Signup successful" });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login: authenticate and create a session
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
});

// Protected route: only accessible when logged in
app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({
      message: "Welcome to dashboard",
      user: req.user.username,
    });
  }
  return res.status(401).json({ message: "Unauthorized" });
});

// Logout
app.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});
