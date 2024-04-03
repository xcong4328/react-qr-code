import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Html5qrcode from './Html5qrcode';
import Html5Custom from './Html5Custom';
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
        Select QR Code Scanner
      </p>
      <div className='select-list'>
        <Link className='html5-qrcode' to="/html5-qrcode">html5-qrcode</Link>
        <Link className='html5-qrcode' to="/html5-custom">html5-custom</Link>
        <Link className='qr-scanner' to="/qr-scanner ">qr-scanner</Link>
        <Link className='jsqr' to="/jsqr ">jsQR</Link>
      </div>

      <Routes>
        <Route path="/html5-qrcode" element={<Html5qrcode />} />
        <Route path="/html5-custom" element={<Html5Custom />} />
        <Route path="/qr-scanner" element={<QrScannerPage />} />
        <Route path="/jsqr" element={<JsqrPage />} />
      </Routes>
    </>
  );
}

export default App;
