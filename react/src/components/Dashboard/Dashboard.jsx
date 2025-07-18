import { Link } from "react-router-dom";
import { useWorkouts } from "../../hooks/useWorkoutAndExercises";

function Dashboard () {

    const { workouts, loading, error } = useWorkouts();

    if (loading) return <p>Loading...</p>
    if (error) return <p>A newtork error was encountered.</p>


    return (
        <>
            <div>
                {workouts &&
                workouts.map((workout) => (
                    <div key={workout.id}>{workout.name}</div>
                ))}
            </div>
            <button><Link to="new-workout">Add new workout</Link></button>
        </>
    )
}

export default Dashboard;