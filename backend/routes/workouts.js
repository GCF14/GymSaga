const express = require('express')
const router = express.Router()

const {
    createWorkout, 
    getWorkouts,
    getWorkout
} = require('../controllers/workoutController')

// GET all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg:'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg:'UPDATE a new workout'})
})

module.exports = router

