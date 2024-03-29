import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const LogoutPage = () => {

    const { logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser()
        navigate('/')
    }

    return (
        <div id='container'>
            <div id="logout">
                <button onClick={handleLogout}>
                    Odjavi se
                </button>
            </div>
        </div>
    )
}

export default LogoutPage