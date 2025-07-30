import { useState } from "react";
import styles from "./AuthForm.module.css"
import { Link } from "react-router-dom";

function AuthForm ({ onSubmit, mode }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>{mode}</legend>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your Username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your Password"
                    />
                </div>
            </fieldset>
            <button type="submit">{mode}</button>
        </form>
        {mode === "Sign Up" && 
        (
        <div className={styles.existingAccount}>
            <div>Already have an account?</div>
            <Link to="/login">Login</Link>
        </div>
        )}
        </>
    )
}

export default AuthForm;