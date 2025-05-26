import express from 'express';
import { createWorkout, getWorkouts, getAllWorkouts, deleteWorkout, updateWorkout } from '../controllers/workoutControllers.js';

const router = express.Router();

router.get('/', getWorkouts); // Get all workouts
router.get('/:id', getAllWorkouts); // Get single workout
router.post('/', createWorkout); // Create workout
router.patch('/:id', updateWorkout); // Update workout
router.delete('/:id', deleteWorkout); // Delete workout

export default router;