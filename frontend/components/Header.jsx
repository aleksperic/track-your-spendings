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
                        placeholder="Pretraži..."
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
                    {user && <span>Zdravo, {user.first_name} | </span>}
                    <Link to={'/'}>Početna strana</Link>
                    <span> | </span>
                    <Link to={'/scan'}>Skeniraj račun</Link>
                    <span> | </span>
                    {user ?
                        <>
                            <span> | </span>
                            <Link to={'/logout'}>Odjavi se</Link>
                        </>
                        : <Link to={'/login'}>Prijavi se</Link>
                    }
                </nav>
            </div>
        </div>
    )
}
export default Header