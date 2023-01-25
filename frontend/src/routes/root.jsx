import { useContext } from "react";
import { Outlet, useLoaderData, NavLink, useNavigation } from "react-router-dom";
import Header from "../../components/Header";
import AuthContext from "../../context/AuthContext";

export async function loader() {

  const authTokens = JSON.parse(localStorage.getItem('authTokens'))

  const response = await fetch('http://localhost:8000/api/receipt/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authTokens?.access}`
    },
  });
  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    return null
  }
}

export default function Root() {

  const receipts = useLoaderData()
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  return (
    <div id='container'>
      <Header />
      <div id='content'>
        <div id="sidebar">
          <h1>Skeniraj račun</h1>
          <nav>
            {user && receipts?.length ? (
              <ul>
                <h3 style={{borderBottom: 'solid black'}}>Vaši računi</h3>
                {receipts.map((receipt) => (
                  <li key={receipt.id}>
                    <NavLink to={`receipts/${receipt.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                            ? "pending"
                            : ""
                      }>
                      {receipt.store ? (
                        <>
                          {receipt.store.slice(0, 18)}... {receipt.purchase_date}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>Nemate skeniranih računa</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail"
          className={navigation.state === "loading" ? "loading" : ""}>
          <h1>{user ? ('Zdravo ' + user.first_name) : ''}</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
}