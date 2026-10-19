

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// PostgreSQL connection
const pool = require("./config/db");

// Customer routes
const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customers", customerRoutes);

// Test backend
app.get("/", (req, res) => {
  res.send("CRM Backend is running successfully!");
});

// Test PostgreSQL connection
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "PostgreSQL connected successfully!",
      time: result.rows[0].now
    });
  } catch (error) {
    console.error("PostgreSQL connection error:", error.message);
    res.status(500).json({
      message: "PostgreSQL connection failed"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`CRM Backend running on port ${PORT}`);
});
