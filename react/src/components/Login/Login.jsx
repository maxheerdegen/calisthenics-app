import AuthForm from "../AuthForm/AuthForm.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login () {

    const navigate = useNavigate();
    const { setUser } = useOutletContext();

    const handleLogin = async (username, password) => {
        
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
                credentials: "include",
            })
    
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            const result = await response.json();
    
            console.log(result);
            setUser(result.username);
            navigate("/dashboard");

        } catch (err) {
            console.log(err);
        }

    }

    return <AuthForm onSubmit = {handleLogin} buttonName = "Log In"/>
}

export default Login;