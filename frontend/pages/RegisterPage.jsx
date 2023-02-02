import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {

    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

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

        if (data.password !== data.password2) {
            setErrMsg('Lozinke se ne podudaraju!');
        } else {
            try {
                const response = await fetch("http://localhost:8000/api/users/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (response.status === 201) {
                    setSuccessMsg('Uspešna registracija korisnika!')
                    setTimeout(() => {navigate('/login')}, 4000)
                    
                } else {
                    console.log(await response.json());
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        let interval = setInterval(() => {
            if (errMsg) {
                setErrMsg(null)
            }
        }, 4000)
        return () => clearInterval(interval)

    }, [errMsg])

    return (
        <div id='container'>
            <div id="register">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fname" placeholder="First name" required />
                    <input type="text" name="lname" placeholder="Last name" />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <input type="password" name="password2" placeholder="Confirm Password" required />
                    {errMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errMsg}</p>}
                    <input type="submit" value="Registruj se" />
                    {successMsg && <p style={{ color: 'green', textAlign: 'center' }}>{successMsg}</p>}
                </form>
            </div>
        </div>
    )
}

export default RegisterPage