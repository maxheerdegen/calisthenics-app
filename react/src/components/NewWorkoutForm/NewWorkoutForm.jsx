import { useState } from "react";
import { Form } from "react-router-dom";

function NewWorkoutForm () {

    const [exercises, setExercises] = useState(false);

    const handleSubmit = async () => {

    }

    return (
        <>
        {exercises ?
        (<button onClick={() => setExercises(false)}>Add exercise</button>)
        :
        (<form onSubmit={handleSubmit}>
            <label htmlFor="workoutName">
                Workout name:
                <input type="text" id="workoutName" required/>
            </label>
            <div>
                Exercises:
                <button onClick={() => setExercises(true)}>Add exercise</button>
            </div>
            <button type="submit">Add workout</button>
        </form>)}
        </>
    )
}

export default NewWorkoutForm;