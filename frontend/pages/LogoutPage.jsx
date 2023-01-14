import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const LogoutPage = () => {

    const { logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = async () => {
        await logoutUser()
        navigate('/login')
    }

    return (
        <div id='container'>
            <div id="logout">
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default LogoutPage