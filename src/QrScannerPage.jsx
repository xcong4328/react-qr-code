import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';

const QRScannerPage = () => {
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null); // Store selected camera
    const [result, setResult] = useState('No result');

    useEffect(() => {
        QrScanner.listCameras(true).then(cameras => {
            setCameras(cameras);
            if (cameras.length > 0) {
                setSelectedCamera(cameras[0]); // default get first camera
            }
        });
    }, []);

    useEffect(() => {
        if (videoRef.current && selectedCamera) {
            qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
                console.log('decoded qr code:', result);
                setResult(result);
                qrScannerRef.current.stop();
                setIsScanning(false);
            }, undefined, { deviceId: selectedCamera.id });

            if (isScanning) {
                qrScannerRef.current.start();
            }
        }

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop();
            }
        };
    }, [selectedCamera, isScanning]);

    const startScanning = () => {
        setResult('No result');
        setIsScanning(true);
    };

    const stopScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            setIsScanning(false);
        }
    };

    const handleCameraChange = (event) => {
        const cameraId = event.target.value;
        const camera = cameras.find(camera => camera.id === cameraId);
        setSelectedCamera(camera);
    };

    return (
        <div>
            <h2>QR Scanner</h2>
            {cameras.length > 0 && (
                <select onChange={handleCameraChange} value={selectedCamera?.id}>
                    {cameras.map(camera => (
                        <option key={camera.id} value={camera.id}>{camera.label}</option>
                    ))}
                </select>
            )}
            {!isScanning && <button className='start-btn' onClick={startScanning}>Start Scanning</button>}
            {isScanning && <button className='stop-btn' onClick={stopScanning}>Stop Scanning</button>}
            <p>Result: {result}</p>
            <video ref={videoRef} style={{ width: '500px', height: '500px' }}></video>
        </div>
    );
};

export default QRScannerPage;
