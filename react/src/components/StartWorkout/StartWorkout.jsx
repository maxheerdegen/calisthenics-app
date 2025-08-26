import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./StartWorkout.module.css";

function StartWorkout () {

    const { state } = useLocation();
    const workout = state.workout;
    const [seconds, setSeconds] = useState(3);
    const [currentExercise, setCurrentExercise] = useState(workout.exercises[0]);
    const [index, setIndex] = useState(0);
    const [setCounter, setSetCounter] = useState(1);
    const [workoutDone, setWorkoutDone] = useState(false);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds])

    const handleNextSet = async () => {

        const nextCount = setCounter + 1;
        const totalSets = workout.exercises[index].sets;
        
        if (nextCount > totalSets) {
            
            const isLastExercise = index + 1 >= workout.exercises.length;
            
            if(isLastExercise) {
                setWorkoutDone(true);
                return;
            }
            
            setIndex(index + 1);
            setCurrentExercise(workout.exercises[index+1]);
            setSetCounter(1);
            setSeconds(180);
        }
        else {
            setSetCounter((setCounter) => setCounter + 1);
            setSeconds(60);
        }
    }

    return (
        <>  
            {workoutDone ? (
            <div className={styles.done}>Workout done! Congratulations!</div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.countdown}>{seconds > 0 ? seconds : 'Start!'}</div>      
                    {currentExercise && (
                    <>
                        <div className={styles.nextExercise}>Next Exercise:</div>
                        <div>{currentExercise.name}</div>
                        <div>Set: {setCounter}/{workout.exercises[index].sets}</div>
                        <img src={currentExercise.imgURL} alt="" className={styles.exerciseImg}/>
                        <button onClick={handleNextSet}>Set done!</button>
                        <Link to="/Dashboard" className={styles.endWorkout}>End Workout</Link>
                    </> 
                    )}
                </div>
            )}
        </>
    )
}

export default StartWorkout;