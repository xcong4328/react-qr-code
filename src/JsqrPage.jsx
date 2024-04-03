import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const JsqrPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState('No result');

    const startScanning = () => {
      setIsScanning(true);
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          .then(stream => {
              videoRef.current.srcObject = stream;
              videoRef.current.oncanplay = () => {
                  videoRef.current.play();
                  requestAnimationFrame(scanQR);
              };
          })
          .catch(err => {
              console.error("Error accessing the camera", err);
              setIsScanning(false);
          });
    };

    console.log('🚀 log of isScanning:', isScanning)
    console.log('🚀 log of videoRef.current:', videoRef.current)
    const scanQR = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        console.log("Scanning !!! ");
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert", });
        if (code) {
          console.log("QR Code detected:", code.data);
          setResult(code.data);
          stopScanning();
          return;
        }
        requestAnimationFrame(scanQR);
      } else if (isScanning) {
        requestAnimationFrame(scanQR);
      }
    };
    
    const stopScanning = () => {
      if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          videoRef.current.oncanplay = null;
      }
      setIsScanning(false);
    };
    
    useEffect(() => {
        return () => stopScanning();
    }, []);

    return (
        <div>
            <h2>jsQr Scanner</h2>
            {!isScanning && <button onClick={startScanning}>Start Scanning</button>}
            {isScanning && <button onClick={stopScanning}>Stop Scanning</button>}
            <p>Result: {result}</p>
            <video ref={videoRef} style={{ display: isScanning ? 'block' : 'none', width: '500px', height: '500px' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default JsqrPage;
