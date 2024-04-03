import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import QrReaderPage from './QrReaderPage';
import QrScannerPage from './QrScannerPage';
import JsqrPage from './JsqrPage.jsx';
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
        Select QR Code Scanner 1
      </p>
      <Link className='html5-qrcode' to="/html5-qrcode">html5-qrcode</Link>
      <Link className='qr-scanner' to="/qr-scanner ">qr-scanner</Link>
      <Link className='jsqr' to="/jsqr ">jsqr scanner</Link>

      <Routes>
        <Route path="/html5-qrcode" element={<QrReaderPage />} />
        <Route path="/qr-scanner" element={<QrScannerPage />} />
        <Route path="/jsqr" element={<JsqrPage />} />
      </Routes>
    </>
  );
}

export default App;
