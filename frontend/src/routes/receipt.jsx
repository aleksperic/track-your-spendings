import { useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


export async function loader({ params }) {
  const id = params.receiptId
  const authTokens = JSON.parse(localStorage.getItem('authTokens'))

  const response = await fetch(`http://localhost:8000/api/receipt/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authTokens?.access
    },
  });
  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    return null
  }
}

export default function Receipt() {
  const receipt = useLoaderData()
  const { user } = useContext(AuthContext)

  const items = receipt ? JSON.parse(receipt.items) : null
  const receiptOrg = receipt ? JSON.parse(receipt.receipt_org) : null

  let itemsList = ''
  for (let key in items) {
    itemsList += `${key}. ${items[key]}\n`
  }

  return (
    <div id="receipt">
      {user && receipt ? (
        <div id='receipt-detail'>
          <div id='scan-div'>
              Prodajno mesto: <input className="scan-input" type="text" value={receipt.store} readOnly disabled />
              Artikli: <textarea className="scan-input" type="text" value={itemsList} readOnly disabled />
              Ukupan iznos: <input className="scan-input" type="text" value={receipt.total_price} readOnly disabled />
              PDV: <input className="scan-input" type="text" value={receipt.tax_price} readOnly disabled />
              Vreme: <input className="scan-input" type="text" value={receipt.purchase_time} readOnly disabled />
              Datum: <input className="scan-input" type="text" value={receipt.purchase_date} readOnly disabled />
              PFR broj računa: <input className="scan-input" type="text" value={receipt.receipt_id} readOnly disabled />
            <div>
              <Form
                method="delete"
                action="destroy"
                style={{ textAlign: 'center', margin: '2rem' }}
                onSubmit={(event) => {
                  if (
                    !confirm(
                      "Please confirm you want to delete this record."
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Obriši račun</button>
              </Form>
            </div>
          </div>
          <div id="receipt-org">
            <>
              <pre>
                {receiptOrg.receipt_start}
                <br />
                <img width={250} height={250} src={receiptOrg.receipt_qr} />
                {receiptOrg.receipt_end}
              </pre>
            </>
          </div>
        </div>
      ) : (
        <i>Nemate skeniranih računa</i>
      )}{" "}
    </div>
  );
}