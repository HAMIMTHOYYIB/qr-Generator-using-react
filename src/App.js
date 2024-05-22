import React, { useState, useRef } from 'react';
import './App.css';
import QRCode from 'qrcode.react';

function App() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const qrRef = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <div className="container">
      <div className="qr-code-section">
        {text && (
          <div ref={qrRef}>
            <QRCode value={text} size={256} fgColor={color} />
          </div>
        )}
      </div>
      <div className="controls-section">
        <h1>Generate QR Code</h1>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter URL"
        />
        {text && <button onClick={handleDownload} id='download-btn'>Download QR Code</button>}
        {text && 
        <div className="color-buttons">
          <button className="color-button" style={{ backgroundColor: 'black' }} onClick={() => handleColorChange('black')}></button>
          <button className="color-button" style={{ backgroundColor: 'green' }} onClick={() => handleColorChange('green')}></button>
          <button className="color-button" style={{ backgroundColor: 'yellow' }} onClick={() => handleColorChange('#d1cd16')}></button>
          <button className="color-button" style={{ backgroundColor: '#0f475f' }} onClick={() => handleColorChange('#0f475f')}></button>
        </div>}
      </div>
    </div>
  );
}

export default App;
