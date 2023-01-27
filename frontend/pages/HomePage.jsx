import { Link } from "react-router-dom"


const HomePage = () => {
    return (
        <>
            <div>
                Dobrodošli na Skeniraj račun
            </div>
            <Link to={'/login'}>
                <button>Prijavi se</button>
            </Link>
        </>
    )
}

export default HomePage