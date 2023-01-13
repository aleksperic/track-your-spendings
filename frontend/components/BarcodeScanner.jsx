import { useState, useEffect } from "react";
import { Form } from "react-router-dom";

import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {

  const [qrData, setQrData] = useState('');
  const [items, setItems] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [lastScanned, setLastScanned] = useState("");
  const [result, setResult] = useState("");

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  const handleQrScan = async () => {
    if (result && result !== lastScanned) {
      setLastScanned(result);
      try {
        const response = await fetch('http://localhost:8000/api/receipt/scan/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrCode: result })
        });
        if (response.status === 200) {
          const data = await response.json();
          setQrData(data);
          setItems(JSON.parse(data.items))
          setIsScanned(true);
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
        <div id="receipt" style={
          {
            overflow: 'scroll',
            height: '100%'
          }
        }>
          <div id='scan-div'>
            {qrData.store && (
              <>
                Prodajno mesto: <input className="scan-input" type="text" value={qrData.store} readOnly disabled />
                Artikli: <textarea className="scan-input" type="text" value={itemsList} readOnly disabled />
                Ukupan iznos: <input className="scan-input" type="text" value={qrData.total_price} readOnly disabled />
                PDV: <input className="scan-input" type="text" value={qrData.tax_price} readOnly disabled />
                Vreme: <input className="scan-input" type="text" value={qrData.purchase_time} readOnly disabled />
                Datum: <input className="scan-input" type="text" value={qrData.purchase_date} readOnly disabled />
                PFR broj računa: <input className="scan-input" type="text" value={qrData.receipt_id} readOnly disabled />
              </>
            )
            }{" "}
          </div>
          <div id='scan-buttons'>
            <Form method="post">
              <button type="submit">Save</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (!confirm("Please confirm you want to delete this record.")) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div> : <video ref={ref} />}
    </>
  );
};