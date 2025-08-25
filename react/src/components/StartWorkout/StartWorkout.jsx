import { useLocation } from "react-router-dom";

function StartWorkout () {

    const { state } = useLocation();
    const workout = state.workout;

    console.log(workout);


    return
}

export default StartWorkout;