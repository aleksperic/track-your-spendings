import { useNavigate } from "react-router-dom"

const LogoutPage = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('authTokens')
        navigate('/login', { replace: true })
        navigate(0)
    }
    return (
        <div id='container'>
            <div id="logout">
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutPage