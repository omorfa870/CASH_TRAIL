require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer"); // needed for error handling
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Centralized error handler (catches multer + others)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // General errors
    return res.status(400).json({ message: err.message });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
