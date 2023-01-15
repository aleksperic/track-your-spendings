import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e.target.username.value, e.target.password.value);
        navigate('/')
    }

    return (

        <div id='container'>
            <div id="login">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Enter username..." />
                    <input type="password" name="password" placeholder="Enter password..." />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage