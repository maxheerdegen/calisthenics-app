import { useState } from "react";
import { useExercises } from "../../hooks/useWorkoutAndExercises";

function NewWorkoutForm () {

    const [showExercises, setShowExercises] = useState(false);
    const { exercises, loading, error } = useExercises();
    const [exercisesInWorkout, setExercisesInWorkout] = useState([]);

    const addExerciseToWorkout = (id) => {
        setShowExercises(false);
        setExercisesInWorkout([...exercisesInWorkout, {id}])
    }

    const handleSubmit = async () => {

    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>A network error was encountered.</p>

    return (
        <>
        {showExercises ? (
        <div>
            {exercises && exercises.map((exercise) => (
                <div>
                    <div key={exercise.id}>{exercise.name}</div>
                    <button onClick={() => addExerciseToWorkout(exercise.id)}>Add exercise</button>
                </div>
            ))}
        </div>
        ):
        (
        <form onSubmit={handleSubmit}>
            <label htmlFor="workoutName">
                Workout name:
                <input type="text" id="workoutName" required/>
                <div>
                    {exercisesInWorkout.map((workoutEx) => {
                        const match = exercises.find((ex) => ex.id === workoutEx.id)
                        return <div>{match.name}</div>
                    })}
                </div>
            </label>
            <div>
                Exercises:
                <button onClick={() => setShowExercises(true)}>Add exercise</button>
            </div>
            <button type="submit">Add workout</button>
        </form>
        )}
        </>
    )
}

export default NewWorkoutForm;