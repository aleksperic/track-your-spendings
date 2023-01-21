import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";


const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ?
            JSON.parse(localStorage.getItem('authTokens')) : null
    )
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ?
            jwt_decode(localStorage.getItem('authTokens')) : null
    )
    const [loading, setLoading] = useState(true)

    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                })
            })
            const data = await response.json()
            if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else if (response.status === 401) {
                alert(response.statusText + '\nPlease provide valid credentials...')
            } else if (response.status === 400) {
                alert(response.statusText + '\nPlease provide valid credentials...')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('authTokens')
        setUser(null)
        setAuthTokens(null)
    }

    const refreshToken = async () => {
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,

    }

    useEffect(() => {
        if (loading) {
            refreshToken()
        }
        const nineMinutes = 1000 * 60 * 9
        let interval = setInterval(() => {
            if (authTokens) {
                refreshToken()
            }
        }, nineMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}