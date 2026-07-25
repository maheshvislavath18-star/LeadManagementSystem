import { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/token/",
            {
                username,
                password,
            }
        );

        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        alert("Login Successful!");

        window.location.reload();

    } catch (error) {
        alert("Invalid Username or Password");
        console.log(error);
    }
};

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={loginUser}>

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;