import { useExercises } from "../../hooks/useWorkoutAndExercises";

function Exercises () {

    const { exercises, loading, error } = useExercises();

    if (loading) return <p>Loading...</p>
    if (error) return <p>A newtork error was encountered.</p>


    return (
        <div>
            {exercises &&
            exercises.map((exercise) => (
                <div key={exercise.id}>
                    <div>{exercise.name}</div>
                    <div>{exercise.description}</div>
                    <img src={exercise.imgURL} alt="" />
                </div>
            ))}
        </div>
    )
}

export default Exercises;