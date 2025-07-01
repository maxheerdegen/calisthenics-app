import { Router } from 'express';
import {createExercise, getExercises, getExerciseById, updateExercise, deleteExercise} from '../controllers/exerciseController.js';

const exerciseRouter = Router();

exerciseRouter.post('/', createExercise);
exerciseRouter.get('/', getExercises);
exerciseRouter.get('/:id', getExerciseById);
exerciseRouter.put('/:id', updateExercise);
exerciseRouter.delete('/:id', deleteExercise);

export { exerciseRouter };