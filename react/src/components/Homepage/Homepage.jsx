import { Link } from "react-router-dom";

function Homepage () {
    return (
        <>
        <div>Your fitness journey starts here!</div>
        <Link to="sign-up">Sign-Up!</Link>
        </>
    )
}

export default Homepage;