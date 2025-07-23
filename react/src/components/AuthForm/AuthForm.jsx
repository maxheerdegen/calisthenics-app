import { useState } from "react";

function AuthForm ({ onSubmit, buttonName }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username:
                <input
                    type="text"
                    value={username}
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label htmlFor="password">
                Password:
                <input
                    type="password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">{buttonName}</button>
        </form>
        </>
    )
}

export default AuthForm;