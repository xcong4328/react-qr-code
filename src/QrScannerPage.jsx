import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';

const QRScannerPage = () => {
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState('No result')

    useEffect(() => {
        if (videoRef.current) {
            qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
                console.log('decoded qr code:', result);
                setResult(result);
                qrScannerRef.current.stop();
                setIsScanning(false);
            });
        }

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop();
            }
        };
    }, []);

    const startScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.start();
            setResult('No result')
            setIsScanning(true);
        }
    };

    const stopScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            setIsScanning(false);
        }
    };

    return (
        <div>
            <h2>QR Scanner</h2>
            {!isScanning && <button className='start-btn' onClick={startScanning}>Start Scanning</button>}
            {isScanning && <button className='stop-btn' onClick={stopScanning}>Stop Scanning</button>}
            <p>Result: {result}</p>
            <video ref={videoRef} style={{ width: '500px', height: '500px' }}></video>
        </div>
    );
};

export default QRScannerPage;
