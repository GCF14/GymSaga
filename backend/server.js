require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// middlewear
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});



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

app.listen(process.env.PORT, () => {
    console.log("Server started")
});

