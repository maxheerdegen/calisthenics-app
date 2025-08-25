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

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result);

            setData((prev) => prev.filter((data) => data.id !== id));

        } catch (err) {
            console.log(err);
        }
    }

    return { data, loading, error, deleteData };
}

function useWorkouts () {
    const { data: workouts, loading, error, deleteData: deleteWorkout } = useFetchData("workouts");

    return { workouts, loading, error, deleteWorkout };
}

function useExercises () {
    const { data: exercises, loading, error } = useFetchData("exercises");

    return { exercises, loading, error };
}

function useWorkoutById (id) {
    const {data: workout, loading, error } = useFetchData(`workouts/${id}`);
    let processedWorkout = null;

    console.log(workout);

    if (workout.exercises) {
        processedWorkout = {
            ...workout,
            exercises: workout.exercises.map(({ exercise, ...rest }) => ({
                name: exercise.name,
                imgURL: exercise.imgURL,
                id: exercise.id,
                ...rest,
            }))
        }
    }

    console.log(processedWorkout);

    return { processedWorkout, loading, error };
}

export { useWorkouts, useExercises, useWorkoutById };