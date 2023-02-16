import React, { useContext, useEffect, useState } from "react"
import { Link, Navigate, redirect } from "react-router-dom"
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const { user, loginUser } = useContext(AuthContext)
    const [msg, setMsg] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        if (!username || !password) {
            setMsg('Unesite korisničko ime i lozinku!')
        } else {
            loginUser(username, password);
            return redirect('/')
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (msg) {
                setMsg(null)
            }
        }, 2000)
        return () => clearInterval(interval)

    }, [msg])

    return (

        <div id='container'>
            {user ? <Navigate to='/' /> :
                (<div id="login">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Korisničko ime..." />
                        <input type="password" name="password" placeholder="Lozinka..." />
                        {msg && <p style={{ color: 'red', textAlign: 'center' }}>{msg}</p>}
                        <input type="submit" value="Prijavi se" />
                    </form>
                    <h3>Nemate nalog? <Link to={'/register'}>Registruj se</Link>.</h3>
                </div>
                )}
        </div>
    )
}

export default LoginPage