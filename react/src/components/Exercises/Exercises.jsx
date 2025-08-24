import { useExercises } from "../../hooks/useWorkoutAndExercises";
import styles from "./Exercises.module.css";

function Exercises () {

    const { exercises, loading, error } = useExercises();

    if (loading) return <p>Loading...</p>
    if (error) return <p>A newtork error was encountered.</p>


    return (
        <div className={styles.container}>
            {exercises &&
            exercises.map((exercise) => (
                <div className={styles.exercise} key={exercise.id}>
                    <div className={styles.exerciseTitle}>{exercise.name}</div>
                    <div className={styles.exerciseDescription}>{exercise.description}</div>
                    <img src={exercise.imgURL} alt="" className={styles.exerciseIMG}/>
                </div>
            ))}
        </div>
    )
}

export default Exercises;