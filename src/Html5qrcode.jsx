import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Html5qrcode = () => {
  const [data, setData] = useState('No result');
  const qrRef = useRef(null);

  useEffect(() => {
    let html5QrCodeScanner;

    if (qrRef.current) {
      html5QrCodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 }, false
      );

      const onScanSuccess = (decodedText, decodedResult) => {
        setData(decodedText);
        console.log(decodedText, decodedResult);
        html5QrCodeScanner.clear(); 
      };

      html5QrCodeScanner.render(onScanSuccess);
    }

    // clean component
    return () => {
      // check and stop scanner
      if (html5QrCodeScanner) {
        html5QrCodeScanner.clear(); 
      }
    };
  }, []);

  return (
    <div>
      <h2>Html5qrcodeのHtml5QrcodeScannerクラス</h2>
      <p className='html5-desc'>
        Html5QrcodeScanner: これは、QR コード スキャン用の完全なユーザー インターフェイス (UI) を提供するように設計されたクラスです。
      </p>
      <div id="qr-reader" ref={qrRef}></div>
      <p>Result: {data}</p>
    </div>
  );
};

export default Html5qrcode;
