import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import AuthContext from "../context/AuthContext"


const PrivateRoutes = () => {

    const location = useLocation()
    const { authTokens } = useContext(AuthContext)
    return (
        authTokens ?
            <Outlet /> :
            <Navigate to='/login' state={{ from: location }} replace />
            )
}
export default PrivateRoutes