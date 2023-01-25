import { redirect } from "react-router-dom";

const authTokens = JSON.parse(localStorage.getItem('authTokens'))

export async function action({ params }) {
    const receiptId = params.receiptId

    const response = await fetch(`http://localhost:8000/api/receipt/${receiptId}/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access
        },
    });
    const data = await response.json()
    return redirect('/')
}