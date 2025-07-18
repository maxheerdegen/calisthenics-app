import { useState } from "react";
import { useExercises } from "../../hooks/useWorkoutAndExercises";

function NewWorkoutForm () {

    const [showExercises, setShowExercises] = useState(false);
    const { exercises, loading, error } = useExercises();
    const [exercisesInWorkout, setExercisesInWorkout] = useState([]);

    const addExerciseToWorkout = (exercise) => {
        setShowExercises(false);
        setExercisesInWorkout([...exercisesInWorkout, exercise])
    }

    const handleInputChange = (id, value, field) => {
        setExercisesInWorkout(exercisesInWorkout.map((ex) => {
            return ex.id === id ? {...ex, [field]: value} : ex;
        }))
        console.log(exercisesInWorkout);
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
                <div key={exercise.id}>
                    <div>{exercise.name}</div>
                    <button onClick={() => addExerciseToWorkout(exercise)}>Add exercise</button>
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
                    {exercisesInWorkout.map((ex) => (
                        <div key={`workout-${ex.id}`}>
                            <div>{ex.name}</div>
                            <label htmlFor="sets">
                                Sets:
                                <input 
                                    type="number" 
                                    id="sets" 
                                    value={ex.sets ?? 0} 
                                    min={0}
                                    onChange={(e) => handleInputChange(ex.id, e.target.value, "sets")}/>
                            </label>
                            <label htmlFor="reps">
                                Reps:
                                <input 
                                    type="number" 
                                    id="reps"
                                    value={ex.reps ?? 0}
                                    min={0}
                                    onChange={(e) => handleInputChange(ex.id, e.target.value, "reps")} />
                            </label>
                        </div>
                    ))}
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