import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Header = () => {
    const { user } = useContext(AuthContext)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (user) {
            setUserId(user.username)
        }
    },[user])

    return (
        <div id="header">
            <div>
                <form id="search-form" role="search">
                    <input
                        id="q"
                        aria-label="Search receipts"
                        placeholder="Search"
                        type="search"
                        name="q"
                    />
                    <div
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div
                        className="sr-only"
                        aria-live="polite"
                    ></div>
                </form>
                <form method="post">
                </form>
            </div>
            <div id="links">
                {/* <button type="submit">Scan</button> */}
                

                <Link to={'/'}><button>Home</button></Link>
                
                <span> | </span>
                <Link to={'/scan'}>Scan</Link>
                <span> | </span>
                {user ?
                    <>
                        <span> | </span>
                        <Link to={'/logout'}>Logout</Link>
                    </>
                    : <Link to={'/login'}>Login</Link>
                }
                {user && <span> | Hello {user.first_name}</span>}
            </div>
        </div>
    )
}
export default Header