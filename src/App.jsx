import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import QrReaderPage from './QrReaderPage';
import QrScannerPage from './QrScannerPage';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <>
      <div>
        <Link to="/">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
      </div>
      <p>
        Select QR Code Scanner
      </p>
      <Link className='html5-qrcode' to="/html5-qrcode">html5-qrcode</Link>
      <Link className='qr-scanner' to="/qr-scanner ">qr-scanner</Link>

      <Routes>
        <Route path="/html5-qrcode" element={<QrReaderPage />} />
        <Route path="/qr-scanner" element={<QrScannerPage />} />
      </Routes>
    </>
  );
}

export default App;
