import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

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
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="" />
                <div className={styles.logoText}>Cali App</div>
            </Link>
            <ul>
                {
                !user ?  (
                    <li><Link to="login">Login</Link></li>
                ) : (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )
                }
                <li><Link to="sign-up" className={styles.getStarted}>Get Started</Link></li>
            </ul>
        </header>
    )
}

export default Header;