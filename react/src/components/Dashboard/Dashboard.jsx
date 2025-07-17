import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function useWorkouts () {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/workouts", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            if(response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => setWorkouts(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { workouts, loading, error };
}

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