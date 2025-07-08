import AuthForm from "../AuthForm/AuthForm.jsx";

function Login () {

    const handleLogin = async (username, password) => {

    }

    return <AuthForm onSubmit = {handleLogin} buttonName = "Log In"/>
}

export default Login;