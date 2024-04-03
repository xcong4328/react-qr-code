import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Html5qrcodeComponent = () => {
  const [data, setData] = useState('No result');
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');

  useEffect(() => {
    Html5Qrcode.getCameras().then(cameras => {
      setCameras(cameras);
      if (cameras.length > 0) {
        setSelectedCameraId(cameras[0].id); // setting first camera is default
      }
    }).catch(err => console.error("fetch camera err", err));
  }, []);

  const startScan = () => {
    if (!html5QrCodeRef.current) {
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;
    }
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    if (selectedCameraId) {
      html5QrCodeRef.current.start(selectedCameraId, config, (decodedText) => {
        setData(decodedText);
        console.log("decodedText: ", decodedText);
        if(decodedText){
          html5QrCodeRef.current.stop()
        }
      }).catch(err => {
        console.error('start camera failed', err);
      });
      setIsScanning(true);
      setData('');
    }
  };

  const stopScan = () => {
    if (html5QrCodeRef.current && isScanning) {
      html5QrCodeRef.current.stop().then(() => {
        setIsScanning(false);
        console.log('Scanner stopped');
      }).catch(err => {
        console.error('stop scanner failed!!!', err);
      });
    }
  };

  return (
    <div>
      <h2>Custom QR Code Scanner</h2>
      <p  className='html5-desc'>
        Html5Qrcode: これは、QR コード リーダーの実装における柔軟性を高める下位クラスです。 これにはユーザー インターフェイスが含まれていないため、アプリケーションへのより深い統合が必要なユースケースに適しており、カスタム インターフェイスを作成したり、既存のユーザー インターフェイスのコンポーネントにスキャン機能を統合したりできます。
      </p>
      <p>Choose Camera:</p>
      <select
        onChange={(e) => setSelectedCameraId(e.target.value)}
        value={selectedCameraId}
      >
        {cameras.map(camera => (
          <option key={camera.id} value={camera.id}>{camera.label}</option>
        ))}
      </select>
      <br/>
      {!isScanning ? (
        <button onClick={startScan}>Start</button>
      ) : (
        <button onClick={stopScan}>Stop</button>
      )}
      <p>Result: {data}</p>
      <div id="qr-reader" style={{ width: "100%", height: "auto" }}></div>
    </div>
  );
};

export default Html5qrcodeComponent;
