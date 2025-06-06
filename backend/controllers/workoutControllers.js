import Workout from '../models/workoutModel.js'; // Fixed import path
import mongoose from 'mongoose';

// GET ALL workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// GET a SINGLE workout by ID
const getAllWorkouts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).jso({error: 'No such workout'})
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: "NO WORKOUT" });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// CREATE a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('title')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ 
            error : 'Please fill in all the fields' , emptyFields
        }) 
    }




    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({ error: "NO WORKOUT" });
        }

        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(
            id,             // <-- Just the string ID here
            req.body,       // data to update
            { new: true }  // returns updated document
        );

        if (!workout) {
            return res.status(404).json({ error: 'No workout found' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createWorkout,
    getWorkouts,
    getAllWorkouts,
    deleteWorkout,
    updateWorkout,
};