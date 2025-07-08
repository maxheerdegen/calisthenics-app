import { useState } from "react";

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username: 
                <input 
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </label>
            <label htmlFor="password">
                Password:
                <input
                    type="text"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;