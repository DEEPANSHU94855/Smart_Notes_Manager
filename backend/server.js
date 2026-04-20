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

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

