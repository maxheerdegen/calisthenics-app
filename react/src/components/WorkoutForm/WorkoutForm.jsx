import { useState } from "react";
import { useExercises } from "../../hooks/useWorkoutAndExercises";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./WorkoutForm.module.css";

function WorkoutForm ({ mode, onClose, workout }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [showExercises, setShowExercises] = useState(false);
    const { exercises, loading, error } = useExercises();
    const [workoutName, setWorkoutName] = useState(workout?.name || "");
    const [exercisesInWorkout, setExercisesInWorkout] = useState(workout?.exercises || []);

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

    const handleRemove = (id) => {
        setExercisesInWorkout(exercisesInWorkout.filter((ex) => {
            return ex.id !== id;
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exercisesToSubmit = exercisesInWorkout.map((ex, index) => {
            return { id: ex.id, sets: +ex.sets, reps: +ex.reps, order: index };
        })
        const body = {name: workoutName, exercises: exercisesToSubmit}

        const endpoint = mode === "create" ? "api/workouts" : `api/workouts/${id}`;
        const method = mode === "create" ? "POST" : "PUT";

        console.log(endpoint);
        console.log(body);

        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include",
            });
    
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result);
        } catch(err) {
            console.log(err);
        }

        if (onClose) {
            onClose();
        } else {
            navigate("/dashboard");
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>A network error was encountered.</p>

    return (
        <>
        {showExercises ? (
        <div className={styles.container}>
            {exercises && exercises.map((exercise) => (
                <div key={exercise.id} className={styles.exercise}>
                    <div className={styles.exerciseTitle}>{exercise.name}</div>
                    <img src={exercise.imgURL} alt="" className={styles.exerciseIMG}/>
                    <button onClick={() => addExerciseToWorkout(exercise)}>Add exercise</button>
                </div>
            ))}
        </div>
        ):
        (
        <form onSubmit={handleSubmit}>
            <label htmlFor="workoutName">
                Workout Name:
                <input 
                    type="text" 
                    id="workoutName" 
                    placeholder="Workout Name"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    required/>
            </label>
            <div className={styles.exerciseTitle}>Exercises:</div>
            <div className={styles.exercisesInWorkoutContainer}>
                {exercisesInWorkout.map((ex) => (
                    <div key={`workout-${ex.id}`} className={styles.exerciseInWorkout}>
                        <div className={styles.exerciseTitle}>{ex.name}</div>
                        <div className={styles.imgRepsSets}>
                            <img src={ex.imgURL} alt="" className={styles.exerciseIMG}/>
                            <div>
                                <label htmlFor="reps">
                                    Reps:
                                    <input
                                        type="number"
                                        id="reps"
                                        value={ex.reps ?? 0}
                                        min={0}
                                        onChange={(e) => handleInputChange(ex.id, e.target.value, "reps")} />
                                </label>
                                <label htmlFor="sets">
                                    Sets:
                                    <input
                                        type="number"
                                        id="sets"
                                        value={ex.sets ?? 0}
                                        min={0}
                                        onChange={(e) => handleInputChange(ex.id, e.target.value, "sets")}/>
                                </label>
                            </div>
                        </div>
                        <button onClick={() => handleRemove(ex.id)}>Remove exercise</button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setShowExercises(true)}>Add exercise</button>
            </div>
            <button type="submit">{mode === "create" ? "Add new workout" : "Update workout"}</button>
        </form>
        )}
        </>
    )
}

export default WorkoutForm;