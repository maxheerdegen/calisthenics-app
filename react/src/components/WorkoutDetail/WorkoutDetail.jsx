import { useParams, Link } from "react-router-dom";
import { useWorkoutById } from "../../hooks/useWorkoutAndExercises";
import { useState } from "react";
import WorkoutForm from "../WorkoutForm/WorkoutForm";
import styles from "./WorkoutDetail.module.css"

function WorkoutDetail () {
    const { id } = useParams();
    const { processedWorkout: workout, loading, error } = useWorkoutById(id);
    const [updateWorkout, setUpdateWorkout] = useState(false);
    console.log(workout);

    if (loading) return <p>"Loading..."</p>;
    if (error) return <p>"A network error was encountered."</p>

    return (
        <>
        {updateWorkout ? (
            <WorkoutForm mode="edit" onClose={() => setUpdateWorkout(false)} workout = {workout}/>
        ) : (
            <div className={styles.workout}>
                <div className={styles.workoutTitle}>{workout.name}</div>
                <div className={styles.container}>
                    {workout.exercises.map((ex) =>(
                    <div className={styles.exercise}>
                        <div className={styles.exerciseTitle}>{ex.name}</div>
                        <img src={ex.imgURL} alt="" className={styles.exerciseImg}/>
                        <div>Sets: {ex.sets} </div>
                        <div>Reps: {ex.reps}</div>
                    </div>
                ))}</div>
                <button onClick={() => setUpdateWorkout(true)}>Edit</button>
                <Link to={`start`} state={{ workout }}>Start Workout</Link>
            </div>
        )} 
        </>
    )
}

export default WorkoutDetail;