const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// -------------------
// Middlewares
// -------------------
// app.use(cors());
const allowedOrigins = [
  "http://localhost:3000",            // local frontend
  "https://calo-track-lime.vercel.app" // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// -------------------
// Route Imports
// -------------------
const calorieRoutes = require("./routes/calorieRoutes");
const googleRoutes = require("./routes/googleRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require('./routes/aiRoutes');
const scanRoutes = require("./routes/scanRoutes");
const foodRoutes = require("./routes/foodRoutes");

// -------------------
// Route Mounting
// -------------------
app.use("/api/calories", calorieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/food", foodRoutes);

// -------------------
// Health Check Route
// -------------------
app.get('/api/healthz', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'CaloTrack backend is live!'
    });
});

// -------------------
// MongoDB Connection & Server Start
// -------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(process.env.PORT, () => 
            console.log(`🚀 Server running at port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
