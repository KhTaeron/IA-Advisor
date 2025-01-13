const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
require('dotenv').config();
const authRoutes = require("./routes/auth");

const app = express();

connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
