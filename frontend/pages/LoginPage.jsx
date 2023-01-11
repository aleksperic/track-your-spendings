import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

const LoginPage = () => {

    const navigate = useNavigate()

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ?
            JSON.parse(localStorage.getItem('authTokens')) : null
    )
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ?
            jwt_decode(localStorage.getItem('authTokens')) : null
    )

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            })
            if (response.status === 200) {
                const data = await response.json()
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/', { replace: true })

            } else if (response.status === 401) {
                alert(response.statusText + '\nPlease provide valid credentials...')
            } else if (response.status === 400) {
                alert(response.statusText + '\nPlease provide valid credentials...')
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div id='container'>
            <div id="login">
                <form onSubmit={loginUser}>
                    <input type="text" name="username" placeholder="Enter username..." />
                    <input type="password" name="password" placeholder="Enter password..." />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage