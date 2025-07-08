import AuthForm from "../AuthForm/AuthForm";

function SignUp () {

    const handleSignUp = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Succes:", result);
        } catch(err) {
            console.log("Error:", err);
        }
    }

    return <AuthForm onSubmit={handleSignUp} buttonName="Sign Up" />
}

export default SignUp;