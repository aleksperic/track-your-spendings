import React from "react"
import { redirect } from "react-router-dom"

const RegisterPage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            first_name: e.target.fname.value,
            last_name: e.target.lname.value,
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
        };

        const response = await fetch("http://localhost:8000/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            redirect('/login');
        } else {
            console.log(response.statusText);
            console.error("Failed to register user");
        }
    };


    return (

        <div id='container'>
            <div id="register">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fname" placeholder="First name" />
                    <input type="text" name="lname" placeholder="Last name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="password2" placeholder="Confirm Password" />
                    <input type="submit" value="Registruj se" />
                </form>
            </div>
        </div>
    )
}

export default RegisterPage