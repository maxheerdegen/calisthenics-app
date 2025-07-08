import { Link } from "react-router-dom";

function Header () {
    return (
        <header>
            <Link to="/">Fitness App Logo</Link>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="login">Login</Link></li>
            </ul>
        </header>
    )
}

export default Header;