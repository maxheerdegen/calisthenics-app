import { Link } from "react-router-dom";

function ErrorPage () {
    return (
        <div>
            <h1>Oops, something went wrong. This page doesn't exist!</h1>
            <Link to="/">You can go back to the homepage by clicking here!</Link>
        </div>
    )
}

export default ErrorPage;