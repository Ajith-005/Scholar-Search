require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const scholarshipsRoutes = require("./routes/scholarships");
const contactRoute = require('./routes/contact');

const app = express();

// ✅ Explicit CORS config
app.use(cors({
  origin: "http://localhost:5173",  // ✅ Vite's port
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json()); // ✅ Only once

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/scholarshipdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipsRoutes);
app.use(contactRoute);

// ✅ Global error handler (required for Express 5 async errors)
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack || err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));