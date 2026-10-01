import { useState } from "react";
import "./QRCodeGenerator.css";

function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQR = () => {
    if (!url.trim()) {
      alert("Please enter a link or URL.");
      return;
    }

    const encodedURL = encodeURIComponent(url.trim());

    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodedURL}`
    );
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "toolora-qr-code.png";
    link.target = "_blank";
    link.click();
  };

  const clearQR = () => {
    setUrl("");
    setQrCode("");
  };

  return (
    <div className="qr-page">

      {/* PAGE HEADER */}
      <div className="qr-heading">
        <span>TOOLORA TOOL</span>

        <h1>QR Code Generator</h1>

        <p>
          Create a high-quality QR code from any link or URL in seconds.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="qr-container">

        {/* LEFT SIDE */}
        <div className="qr-form-card">

          <div className="qr-icon">
            ▦
          </div>

          <h2>Create your QR Code</h2>

          <p className="qr-description">
            Enter your website, social media profile, video, or any URL.
          </p>

          <label>Link / URL</label>

          <div className="qr-input-wrapper">
            <span>🔗</span>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  generateQR();
                }
              }}
            />
          </div>

          <button
            className="generate-qr-btn"
            onClick={generateQR}
          >
            Generate QR Code
            <span>→</span>
          </button>

          {url && (
            <button
              className="clear-qr-btn"
              onClick={clearQR}
            >
              Clear
            </button>
          )}

          <div className="qr-tips">
            <span>✓</span>
            Works with websites, social links and URLs
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="qr-preview-card">

          {!qrCode ? (
            <div className="qr-empty">

              <div className="empty-qr-icon">
                ▦
              </div>

              <h3>Your QR code will appear here</h3>

              <p>
                Enter a URL and click “Generate QR Code”.
              </p>

            </div>
          ) : (
            <div className="qr-result">

              <div className="qr-success">
                <span>✓</span>
                QR Code Generated
              </div>

              <div className="qr-image-box">
                <img
                  src={qrCode}
                  alt="Generated QR Code"
                />
              </div>

              <p className="qr-result-url">
                {url}
              </p>

              <button
                className="download-qr-btn"
                onClick={downloadQR}
              >
                ↓ Download QR Code
              </button>

              <button
                className="new-qr-btn"
                onClick={clearQR}
              >
                Create Another
              </button>

            </div>
          )}

        </div>

      </div>

      {/* FEATURES */}
      <div className="qr-features">

        <div>
          <span>⚡</span>
          <h3>Fast</h3>
          <p>Generate your QR code instantly.</p>
        </div>

        <div>
          <span>🔒</span>
          <h3>Simple</h3>
          <p>No complicated settings required.</p>
        </div>

        <div>
          <span>📱</span>
          <h3>Scan Anywhere</h3>
          <p>Works with phones and QR scanners.</p>
        </div>

      </div>

    </div>
  );
}

export default QRCodeGenerator;