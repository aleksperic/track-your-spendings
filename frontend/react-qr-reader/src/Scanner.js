import React, { useRef, useState } from 'react';
import QrReader from 'react-qr-reader';

export default function Scanner() {
  const [result, setResult] = useState(null);
  const qrCodeReader = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      qrCodeReader.current.clear();
    }
  }

  return (
    <div>
      <QrReader
        ref={qrCodeReader}
        onScan={handleScan}
      />
      {result ? <p>URL: {result}</p> : null}
    </div>
  );
}