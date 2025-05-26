import express from 'express';
import dotenv from 'dotenv';
import workoutRoute from './routes/workout.js'

import mongoose from 'mongoose';

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoute);

// app.post()

// Port
const PORT = process.env.PORT || 4000;

// DB Connection + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen( process.env.PORT, () => {
      console.log('\nServer connected at port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error);
  });

