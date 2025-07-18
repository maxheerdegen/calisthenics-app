import { useExercises } from "../../hooks/useWorkoutAndExercises";

function Exercises () {

    const { exercises, loading, error } = useExercises();

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