import React from "react"
import { redirect } from "react-router-dom"

const RegisterPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        return redirect('/')
    }

    return (

        <div id='container'>
            <div id="register">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fname" placeholder="First name" />
                    <input type="text" name="flname" placeholder="Last name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="conf-password" placeholder="Confirm Password" />
                    <input type="submit" value="Registruj se" />
                </form>
            </div>
        </div>
    )
}

export default RegisterPage