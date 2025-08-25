import { Link } from "react-router-dom";
import { useWorkouts } from "../../hooks/useWorkoutAndExercises";
import styles from "./Dashboard.module.css";

function Dashboard () {

    const { workouts, loading, error, deleteWorkout } = useWorkouts();

    if (loading) return <p>Loading...</p>
    if (error) return <p>A newtork error was encountered.</p>

    return (
        <>
            <div className={styles.container}>
                {workouts &&
                workouts.map((workout) => (
                    <div key={workout.id} className={styles.workout}>
                        <div className={styles.workoutTitle}>{workout.name}</div>
                        <div className={styles.details}><Link to={`workouts/${workout.id}`}>Show Details</Link></div>
                        <button onClick={() => deleteWorkout(workout.id)}>Delete Workout</button>
                    </div>

                ))}
            </div>
            <button className={styles.newButton}><Link to="new">Add new workout</Link></button>
        </>
    )
}

export default Dashboard;