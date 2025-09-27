// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/packers';

// Middleware
app.use(express.json()); // parse JSON bodies

// Simple logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/players', playerRoutes);

// Default route
app.get('/', (req, res) => res.send('MEN API running'));

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
