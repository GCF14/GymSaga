require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

// middlewear
app.use(express.json())
app.use(cookieParser()) // This will enable the use of cookies
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Frontend URL
    credentials: true  // Allow cookies in requests
}))

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API endpoint for workouts
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and Server started")
        });
    })
    .catch((error) => {
        console.log(error)

    })

app.get('/api/mapbox-token', (req, res) => {
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
});

