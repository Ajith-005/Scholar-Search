require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const scholarshipsRoutes = require("./routes/scholarships");
const contactRoute = require('./routes/contact');
const app = express();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/scholarshipdb";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipsRoutes);

app.use(express.json());
app.use(contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err.stack || err);
});
process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection:', reason);
});
