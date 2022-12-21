import { useState } from 'react';
import './style.css';


export default function SignUpForm() {


    async function sendData(data) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            console.log(data)
            sendData(data)
        })
    }

    return (
        <form>
            <label>
                Email:
                <input type="email" name="email" />
            </label>
            <br />
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <br />
            <input type="submit" value="Sign Up" />
        </form>
    );
}
