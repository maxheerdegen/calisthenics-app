import { useParams } from "react-router-dom";
import { useWorkoutById } from "../../hooks/useWorkoutAndExercises";
import { useState } from "react";
import WorkoutForm from "../WorkoutForm/WorkoutForm";

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
            <div>
                <div>{workout.name}</div>
                <button onClick={() => setUpdateWorkout(true)}>Edit</button>
            </div>
        )} 
        </>
    )
}

export default WorkoutDetail;