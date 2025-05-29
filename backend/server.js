import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import workoutRoute from './routes/workout.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoute);

// Port
const PORT = process.env.PORT || 4000;

// DB Connection + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('\n✅ Server connected at port', PORT);
    });
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error);
  });
