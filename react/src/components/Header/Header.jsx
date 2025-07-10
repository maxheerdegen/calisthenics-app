import { Link } from "react-router-dom";

function Header ({ user, setUser }) {

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            })
    
            const result = await response.json();

            console.log(result);
            setUser(null);

        } catch(err) {
            console.log(err);
        }

    }

    return (
        <header>
            <Link to="/">Fitness App Logo</Link>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                {
                !user ?  (
                    <li><Link to="login">Login</Link></li>
                ) : (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )
                }
            </ul>
        </header>
    )
}

export default Header;