import { useEffect, useState } from "react";

function useWorkouts () {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/exercises", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            if(response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => setExercises(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { exercises, loading, error };
}

function Exercises () {

    const { exercises, loading, error } = useWorkouts();

    if (loading) return <p>Loading...</p>
    if (error) return <p>A newtork error was encountered.</p>


    return (
        <div>
            {exercises &&
            exercises.map((exercise) => (
                <div key={exercise.id}>{exercise.name}</div>
            ))}
        </div>
    )
}

export default Exercises;