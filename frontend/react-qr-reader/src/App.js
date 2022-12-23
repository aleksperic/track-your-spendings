import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import DataFetching from "./DataFetching";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import "./style.css";

export default function App() {


  const url = 'http://localhost:8000/api/receipt/scan/'
  const [scanResult, setScanResult] = useState(null);
  const [items, setItems] = useState(null);
  const [receiptOrg, setReceiptOrg] = useState(null);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false)

  let sendData = () => {
    axios.post(url, result)
      .then(res => {
        setScanResult(res.data)
        setItems(JSON.parse(scanResult.items))
        setReceiptOrg(scanResult.receipt_org)
        console.log('Data sent', scanResult)

      }, [])
      .catch(err => console.log(err.data))
  }
  
  let handleScan = data => {
    if (data) {
      setResult(data);
      setMessage("Success!")
      sendData();
    }
  };

  let handleError = err => {
    // alert(err);
  };

  const handleClick = () => {
    setShowQrScanner(!showQrScanner);
  }
  

  return (
    // <div className="flex-container">
    //   <div className='one'>
    //     <button className="scanBtn" onClick={handleClick}>{showQrScanner ? `Close` : `Scan`}</button>
    //     <div className="innerOne">
    //       {showQrScanner ? <QrReader
    //         delay={300}
    //         onError={handleError}
    //         onScan={handleScan}
    //         style={{ width: "50%" }}
    //         facingMode="user"
    //       /> : ''}
    //     </div>
    //     <div className='success'>{message}</div>
    //   </div>
    //   <div className="two">
    //     <div className="innerTwo">{scanResult === null ? '' : scanResult.store}</div>
    //     <ul>
    //       {items === null ? '' : Object.keys(items).map((key) => {
    //         return (
    //           <li key={key}>
    //             {items[key]}
    //           </li>
    //         )
    //       })}
    //     </ul>
    //     <div className="price">{scanResult === null ? '' : 'Ukupno: ' + scanResult.total_price + ' din'}</div>
    //   </div>
    // </div>
    <LoginForm />
    // <SignUpForm />
  );
}
