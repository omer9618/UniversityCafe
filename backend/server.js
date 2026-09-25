const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
// Socket.io for Real-time Vendor Updates
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

// Make io accessible to our routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Food Court API is running' });
});

// Register API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Real-time connections
io.on('connection', (socket) => {
  console.log('Client connected for real-time updates:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// TODO: Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

server.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
