const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./src/config/db.js");
const authRouter = require("./src/routes/auth.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ MySQL connected");
  } catch (err) {
    console.log("❌ DB Error:", err);
  }
})();

// Routes
app.use("/api", authRouter);

// Server start
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
