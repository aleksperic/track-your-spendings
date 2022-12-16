import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import DataFetching from "./DataFetching";
import parse from 'html-react-parser'
import "./style.css";

export default function App() {

  const url = 'http://localhost:8000/api/receipt/scan/'
  const [scanResult, setScanResult] = useState(null);
  const [items, setItems] = useState(null);
  const [receiptOrg, setReceiptOrg] = useState(null);
  let sendData = () => {
    axios.post(url, result)
      .then(res => {
        setScanResult(res.data)
        setItems(JSON.parse(scanResult.items))
        setReceiptOrg(JSON.parse(scanResult.receipt_org))
        console.log(receiptOrg)

        

        console.log('Data sent', scanResult)
        // console.log('JSON', JSON.parse(scanResult.items))
      }, [])
      .catch(err => console.log(err.data))
  }

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  let handleScan = data => {
    if (data) {
      setResult(data);
      setMessage("Success!")
      
      sendData();
      
      // console.log(data)
      // console.log(result)
    }
  };

  let handleError = err => {
    // alert(err);
  };

  let stringToHTML = function (str) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.firstChild;
  };
  console.log(scanResult)

  
  return (      
    <div className="flex-container">
      <div className='one'>

        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          facingMode="user"
        />

        <p id='success'>{message}</p>
        {/* <p>{result}</p> */}
      </div>
      <div className="two">
        <p><h1>{scanResult === null ? '' : scanResult.store}</h1></p>
        <ul>
          {items === null ? '' : Object.keys(items).map((key) => {
            return (
              <li key={key}>
                {items[key]}
              </li>
            )
          })}
        </ul>
        <p>{scanResult === null ? '' : scanResult.total_price + ' din'}</p>
        
      </div>
    </div>

  );
}
