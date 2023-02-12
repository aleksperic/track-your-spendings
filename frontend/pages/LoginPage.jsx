import React, { useContext } from "react"
import { Link, Navigate, redirect } from "react-router-dom"
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { user, loginUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e.target.username.value, e.target.password.value);
        return redirect('/')
    }

    return (

        <div id='container'>
            {user ? <Navigate to='/' /> :
                (<div id="login">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Enter username..." />
                        <input type="password" name="password" placeholder="Enter password..." />
                        <input type="submit" value="Prijavi se" />
                    </form>
                    <h3>Nemate nalog? <Link to={'/register'}>Registruj se</Link>.</h3>
                </div>
                )}
        </div>
    )
}

export default LoginPage