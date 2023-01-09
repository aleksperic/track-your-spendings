import { Outlet, Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const receipts = await fetch('http://localhost:8000/api/receipt/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    });
    return receipts.json()
  } catch (error) {
    console.error(error);
  }
}

export default function Root() {

  const receipts = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>QR code scanner</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search receipts"
              placeholder="Search"
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
          </form>
          <form method="post">
            <button type="submit">Scan</button>
          </form>
        </div>
        <nav>
          {receipts.length ? (
            <ul>
              {receipts.map((receipt) => (
                <li key={receipt.id}>
                  <Link to={`receipts/${receipt.id}`}>
                    {receipt.store ? (
                      <>
                        {receipt.store} {receipt.total_price}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No receipts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}