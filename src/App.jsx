import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import QrReaderPage from './QrReaderPage';
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
        <Link to="/">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link className='html5-qrcode' to="/html5-qrcode">html5-qrcode</Link>
      <Link className='jsQR' to="/jsQR ">jsQR</Link>

      <Routes>
        <Route path="/html5-qrcode" element={<QrReaderPage />} />
      </Routes>
    </>
  );
}

export default App;
