import { Link } from "react-router-dom";

function Homepage () {
    return (
        <>
        <div>Your fitness journey starts here!</div>
        <Link to="sign-up"></Link>
        </>
    )
}

export default Homepage;