import { Router } from 'express';
import { getWorkouts, createWorkout, getWorkoutById, updateWorkout, deleteWorkout } from '../controllers/workoutControllers.js';

const workoutRouter = Router();

workoutRouter.get('/', getWorkouts);
workoutRouter.post('/', createWorkout);
workoutRouter.get('/:id', getWorkoutById);
workoutRouter.put('/:id', updateWorkout);
workoutRouter.delete('/:id', deleteWorkout);

export { workoutRouter };
