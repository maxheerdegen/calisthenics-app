import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StartWorkout () {

    const { state } = useLocation();
    const workout = state.workout;
    const [seconds, setSeconds] = useState(3);
    const [currentExercise, setCurrentExercise] = useState();
    const [index, setIndex] = useState(0);
    const [repBreak, setRepBreak] = useState(true);
    const [setBreak, setSetBreak] = useState(false);
    const [workoutDone, setWorkoutDone] = useState(false);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
        if (seconds === 0) {
            if (index < workout.exercises.length) {
                setCurrentExercise(workout.exercises[index])
                setIndex((index) => index+1);
                setSeconds(3);
            }
            else {
                setSeconds(undefined);
                setCurrentExercise(undefined);
                setWorkoutDone(true);
            }
        }
    }, [seconds, index, workout.exercises])

    console.log(index)

    return (
        <>  
            {seconds > 0 &&
            <div>{seconds}</div>
            }
            {currentExercise &&
            <>
                <div>{currentExercise.name}</div>
                <img src={currentExercise.imgURL} alt="" />
            </> 
            }
            {
                workoutDone &&
                <div>Workout done!</div>
            }  
        </>
    )
}

export default StartWorkout;