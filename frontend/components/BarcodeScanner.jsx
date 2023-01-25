import { useState, useEffect, useContext } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import AuthContext from "../context/AuthContext";

export const BarcodeScanner = () => {

  const [qrData, setQrData] = useState('');
  const [items, setItems] = useState(null);
  const [receiptOrg, setReceiptOrg] = useState(null)
  const [isScanned, setIsScanned] = useState(false)
  const [lastScanned, setLastScanned] = useState("")
  const [result, setResult] = useState("")
  const [notSupportedQr, setNotSupportedQr] = useState(null)

  const navigate = useNavigate()
  const { logoutUser, authTokens } = useContext(AuthContext)

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  const handleSave = async () => {
    const response = await fetch('http://localhost:8000/api/receipt/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      },
      body: JSON.stringify(qrData)
    });

    if (response.status === 201) {
      navigate('/')
    }
  }

  const handleQrScan = async () => {
    if (result && result !== lastScanned) {
      setLastScanned(result);
      try {
        const response = await fetch('http://localhost:8000/api/receipt/scan/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          },
          body: JSON.stringify({ qrCode: result })
        });
        if (response.status === 200) {
          const data = await response.json();
          setQrData(data);
          setItems(JSON.parse(data.items))
          setReceiptOrg(JSON.parse(data.receipt_org))
          setIsScanned(true);
        } else if (response.status === 401) {
          logoutUser()
        } else if (response.status === 406) {
          setIsScanned(true);
          setNotSupportedQr('Nepodržani QR kod, aplikacija podržava samo QR kodove sa fiskalnih računa izdatih u Republici Srbiji! 🇷🇸')
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    handleQrScan();
  }, [result]);

  let itemsList = ''
  for (let key in items) {
    itemsList += `${key}. ${items[key]}\n`
  }
  return (
    <>
      {isScanned ?
        notSupportedQr ?
          <>
            <h2 style={{ color: '#f44250' }}>{notSupportedQr}</h2>
            <Link onClick={() => window.location.reload(false)}>Pokušaj ponovo</Link>
          </> :
          <div id="receipt">
            {qrData.store && (
              <div id='receipt-detail'>
                <div id='scan-div'>
                  <>
                    Prodajno mesto: <input className="scan-input" type="text" value={qrData.store} readOnly disabled />
                    Artikli: <textarea className="scan-input" type="text" value={itemsList} readOnly disabled />
                    Ukupan iznos: <input className="scan-input" type="text" value={qrData.total_price} readOnly disabled />
                    PDV: <input className="scan-input" type="text" value={qrData.tax_price} readOnly disabled />
                    Vreme: <input className="scan-input" type="text" value={qrData.purchase_time} readOnly disabled />
                    Datum: <input className="scan-input" type="text" value={qrData.purchase_date} readOnly disabled />
                    PFR broj računa: <input className="scan-input" type="text" value={qrData.receipt_id} readOnly disabled />
                  </>
                  <div id='scan-buttons'>
                    <Form method="post">
                      <button type="submit" onClick={() => { handleSave() }}>Sačuvaj</button>
                    </Form>
                    <button type="button" style={{ color: '#f44250' }} onClick={() => { navigate('/') }}>
                      Otkaži
                    </button>
                  </div>
                </div>
                <div id="receipt-org">
                  <pre>
                    {receiptOrg.receipt_start}
                    <br />
                    <img width={250} height={250} src={receiptOrg.receipt_qr} />
                    {receiptOrg.receipt_end}
                  </pre>
                </div>
              </div>)
            }{" "}
          </div> :
        <video ref={ref} />}
    </>
  );
};