import { prisma } from '../config/client.js';
import { Prisma } from '@prisma/client';

async function createExercise(req, res) {
    try {
        const { name, description, imgURL } = req.body;
        await prisma.exercise.create({
            data: {
                name,
                description,
                imgURL
            }
        })

        res.status(201).json({ message: 'Exercise created' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

async function getExercises(req, res) {
    try {
        const exercises = await prisma.exercise.findMany();

        res.status(200).json(exercises);
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

async function getExerciseById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const exercise = await prisma.exercise.findUnique({
            where: {
                id
             }
        })

        if(!exercise) {
            return res.status(404).json({ message: 'Exercise not found'});
        }
        
        res.status(200).json({ exercise });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

async function updateExercise(req,res) {
    try {
        const id = parseInt(req.params.id);
        const { name, description, imgURL } = req.body;
  
        await prisma.exercise.update({
            where: {
                id
            },
            data: {
                name,
                description,
                imgURL
            }
        })
        
        res.status(200).json({ message: "Exercise updated" });

    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(500).json({ message: err });
    }
}

async function deleteExercise(req, res) {
    try {
        const id = parseInt(req.params.id);
    
        const deletedExercise = await prisma.exercise.deleteMany({
            where: {
                id
            }
        })
        
        if (deletedExercise.count === 0) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        res.status(200).json({ message: "Exercise deleted" });

    } catch(err) {
        res.status(500).json({ message: err });
    }
}

export { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise };



//to do: use deletemany for single db lookup withoput throwing error when it fails
