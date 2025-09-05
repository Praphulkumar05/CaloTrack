const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const calorieRoutes = require("./routes/calorieRoutes");
const googleRoutes = require("./routes/googleRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require('./routes/aiRoutes');   // ✅ FIXED
const scanRoutes = require("./routes/scanRoutes");
const foodRoutes = require("./routes/foodRoutes");

app.use("/api/calories", calorieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);   // ✅ This mounts your AI endpoints
app.use("/api/scan", scanRoutes);
app.use("/api/food", foodRoutes);
// Health check route
app.get('/api/healthz', (req, res) => res.status(200).json({
    status: 'OK',
    message: 'CaloTrack backend is live!'
}));



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(process.env.PORT, () => 
            console.log(`🚀 Server running at port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
