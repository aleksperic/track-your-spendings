import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const RegisterPage = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [msg, setMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputData = {
            first_name: e.target.fname.value,
            last_name: e.target.lname.value,
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
        }
        const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

        if (!Object.values(inputData).every(x => x !== null && x !== '')) {
            setMsg('Sva polja moraju biti popunjena!')
        } else if (!emailRegex.test(inputData.email)) {
            setMsg('Unesite ispravnu email adresu!');
        } else if (inputData.password.length < 5 || inputData.password2.length < 5) {
            setMsg("Lozinke moraju biti minimum 5 karaktera!");
        } else if (inputData.password !== inputData.password2) {
            setMsg("Lozinke se ne podudaraju!");
        } else {
            try {
                const response = await fetch("http://localhost:8000/api/users/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inputData),
                });
                const data = await response.json()

                if (response.status === 201) {
                    console.log(await response.json());
                    setSuccessMsg('Uspešna registracija korisnika!')
                    setTimeout(() => { navigate('/login') }, 4000)
                } else if (data.username) {
                    setMsg(data.username)
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
            if (msg) {
                setMsg(null)
            }
        }, 2000)
        return () => clearInterval(interval)

    }, [msg])

    return (
        <div id='container'>
            {user ? <Navigate to='/' /> :
                (
                    <div id="register">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="fname" placeholder="Ime" />
                            <input type="text" name="lname" placeholder="Prezime" />
                            <input type="text" name="email" placeholder="Email" />
                            <input type="text" name="username" placeholder="Korisničko ime" />
                            <input type="password" name="password" id="password" placeholder="Lozinka" />
                            <input type="password" name="password2" id="password2" placeholder="Ponovi lozinku" />
                            {msg && <p style={{ color: 'red', textAlign: 'center' }}>{msg}</p>}
                            <input type="submit" value="Registruj se" />
                            {successMsg && <p style={{ color: 'green', textAlign: 'center' }}>{successMsg}</p>}
                        </form>
                        <h3>Imate nalog? <Link to={'/login'}>Uloguj se</Link>.</h3>
                    </div>
                )}
        </div>
    )
}

export default RegisterPage