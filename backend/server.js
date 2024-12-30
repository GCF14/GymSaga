require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

const app = express();

// middlewear
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API endpoint for workouts
app.use('/api/workouts', workoutRoutes);

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

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint for the Mapbox token
app.get('/api/mapbox-token', (req, res) => {
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
});

// Fallback route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
