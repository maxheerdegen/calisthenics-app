import { prisma } from '../config/client.js';
import { Prisma } from '@prisma/client';

async function getWorkouts (req, res) {
    try {
        const workouts = await prisma.workout.findMany({
            select: {
                id: true,
                name: true,
                exercises: true,
            },
            where: {
                author: {
                    username: req.user.username,
                },
            }
        })

        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: err});
    }
}

async function createWorkout (req, res) {
    try {
        const { name, exercises } = req.body;
        await prisma.workout.create({
            data: {
                name,
                author: {
                    connect: {
                        username: req.user.username,
                    },
                },
                exercises: {
                    create: exercises.map((ex) => ({
                        order: ex.order,
                        sets: ex.sets,
                        reps: ex.reps,
                        exercise: { 
                            connect: {
                                id: parseInt(ex.id),
                            },
                        },
                    })),
                }
            },
        })

        res.status(200).json({ message: 'Workout created' })
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

async function getWorkoutById (req, res) {
    try {
        const id = parseInt(req.params.id);
        const workoutById = await prisma.workout.findUnique({
            select: {
                name: true,
                exercises: {
                    select: {
                        order: true,
                        sets: true,
                        reps: true,
                        exercise: {
                            select: {
                                id: true,
                                name: true,
                                imgURL: true,
                            }
                        }
                    }
                }
             },
            where: {
                id,
                author: { 
                    username: req.user.username,
                },
            },
        });

        if(!workoutById) {
            return res.status(404).json({ message: "Workout not found or unauthorized" })
        }

        res.status(200).json(workoutById);
    } catch (err) {
        res.status(500).json({ message: err});
    }
}

async function updateWorkout (req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, exercises } = req.body;
        
        await prisma.workout.update({
            data: {
                name,
                exercises: {
                    deleteMany: {},
                    create: exercises.map((ex) => ({
                        order: ex.order,
                        sets: ex.sets,
                        reps: ex.reps,
                        exercise: {
                        connect: {
                            id: parseInt(ex.id),
                            }
                        }
                    }))
                }
            },
            where: {
                id,
                author: {
                    username: req.user.username
                }
            }
        })

        res.status(200).json({ message: 'Workout updated' });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).json({ message: "Workout not found or unauthorized" });
        }
        res.status(500).json({ message: err});
    }
}

async function deleteWorkout (req, res) {
    try {
        const id = parseInt(req.params.id);
        
        const deletedWorkout = await prisma.workout.deleteMany({
            where: {
                id,
                author: {
                    username: req.user.username,
                }
            },
        })
        if (deletedWorkout.count === 0) {
            return res.status(404).json({ message: "Workout not found or unauthorized" })
        }
        res.status(200).json({ message: "Workout deleted"});
    } catch (err) {
       res.status(500).json({ message: err});
    }
}

export { getWorkouts, createWorkout, getWorkoutById, updateWorkout, deleteWorkout };