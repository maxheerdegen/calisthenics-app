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
                    <div key={workout.id}><Link to={`workouts/${workout.id}`}>{workout.name}</Link></div>
                ))}
            </div>
            <button><Link to="new">Add new workout</Link></button>
        </>
    )
}

export default Dashboard;