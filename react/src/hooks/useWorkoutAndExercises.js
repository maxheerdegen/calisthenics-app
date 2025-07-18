import { useState, useEffect } from "react";

function useFetchData (endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/${endpoint}`, {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            if(response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, [endpoint]);

    return { data, loading, error };
}

function useWorkouts () {
    const { data: workouts, loading, error } = useFetchData("workouts");

    return { workouts, loading, error };
}

function useExercises () {
    const { data: exercises, loading, error } = useFetchData("exercises");

    return { exercises, loading, error };
}

export { useWorkouts, useExercises };