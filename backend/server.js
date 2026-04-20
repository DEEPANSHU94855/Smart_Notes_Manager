const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config(); // load .env into process.env

const app = express();

// Middleware
app.use(cors()); // allow frontend to call backend (important for deployment)
app.use(express.json()); // allow JSON body in requests

// Simple test route
app.get("/", (req, res) => {
  res.send("Smart Notes Manager API is running");
});

// Notes API routes
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

// Render needs the server to bind a port quickly.
// So we start listening first, then connect to DB.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().catch((err) => {
  // Keep server alive (port stays open) so Render doesn't fail "no open ports".
  // If DB is wrong, you will see this error in logs.
  console.error("DB connection failed. Fix MONGO_URI and redeploy.");
});

