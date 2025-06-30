require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const uploadRoutes = require('./routes/uploadRoutes'); 
const cors = require('cors');
const cookieParser = require('cookie-parser')


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.set('io', io);

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

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    // All users join general_feed room
    socket.join('general_feed');
    console.log(`User ${socket.id} joined general_feed room`);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
})

// API endpoints
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api", uploadRoutes);



// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log("Connected to db and Server started")
        });
    })
    .catch((error) => {
        console.log(error)

    })

app.get('/api/mapbox-token', (req, res) => {
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
});

