import React, { useContext } from "react"
import { Form, Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Header = () => {
    const { user } = useContext(AuthContext)

    return (
        <div id="header">
            <div>
                <Form id="search-form" role="search">
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
                </Form>
                <form method="post">
                </form>
            </div>
            <div id="links">
                <nav>
                    <Link to={'/'}>Home</Link>
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
                </nav>
            </div>
        </div>
    )
}
export default Header