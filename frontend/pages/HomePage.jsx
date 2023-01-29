import { Link } from "react-router-dom"


const HomePage = () => {
    return (
        <div id="welcome-page">
            <h2>
                Dobrodošli na Skeniraj račun
            </h2>
            <Link to={'/login'}>
                <button>Prijavi se</button>
            </Link>
            <h3>Nemate nalog? <Link to={'/register'}>Registruj se</Link>.</h3>
        </div>

    )
}

export default HomePage