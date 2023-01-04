import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import "../style.css";

export default function ReceiptScan() {


  const url = 'http://localhost:8000/api/receipt/scan/'
  const [scanResult, setScanResult] = useState(null);
  const [items, setItems] = useState(null);
  const [receiptOrg, setReceiptOrg] = useState(null);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false)

  
    let sendData = () => {
    const config = {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    axios.post(url, result, config)
      .then(res => {
        setScanResult(res.data)
        setItems(JSON.parse(scanResult.items))
        setReceiptOrg(scanResult.receipt_org)
        console.log('Data sent', scanResult)
        setShowQrScanner(!showQrScanner);
        
      }, [])
      .catch(err => {
        if (err.response.status === 401) {
          console.log('Please login')
          setMessage('Please login to continue...')
        }
      })
  }
//   async function sendData(data) {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization' : 'Bearer ' + token}
//         });
//         const res = await response.json();
//         console.log(res);
//         setScanResult(res.data)
//         setItems(JSON.parse(scanResult.items))
//         setReceiptOrg(scanResult.receipt_org)
//         console.log('Data sent', scanResult)
//         setShowQrScanner(!showQrScanner);
//     } catch (error) {
//         console.error(error);
//     }
// }

  const handleScan = data => {
    if (data) {
      setResult(data);
      setMessage("Scanned successfully!")
      sendData();

    }
  };

  const handleError = err => {
    alert(err);
  };

  const handleClick = () => {
    setShowQrScanner(!showQrScanner);
    if (message) {
      setMessage(null)
    }
  }

  return (
    <div className="flex-container">
      <div className='one'>
        <button className="scanBtn" onClick={handleClick}>{showQrScanner ? `Close` : `Scan`}</button>
        <div className="innerOne">
          {showQrScanner ? <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "70%" }}
            facingMode="user"
            legacyMode={false}
          /> : ''}
        </div>
        <div className={message === 'Scanned successfully!' ? "success" : "loginMess"}>{message}</div>
      </div>
      <div className="two">
        <div className="innerTwo">{scanResult === null ? '' : scanResult.store}</div>
        <ul>
          {items === null ? '' : Object.keys(items).map((key) => {
            return (
              <li key={key}>
                {items[key]}
              </li>
            )
          })}
        </ul>
        <div className="price">{scanResult === null ? '' : 'Ukupno: ' + scanResult.total_price + ' din'}</div>
      </div>
    </div>
  );
}
