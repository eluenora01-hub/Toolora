import { useState } from "react";

function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(70);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressing, setCompressing] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setImage(URL.createObjectURL(file));
    setOriginalSize(file.size);
    setCompressedImage(null);
    setCompressedSize(0);
  };

  const compressImage = () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setCompressing(true);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setCompressing(false);
            return;
          }

          const url = URL.createObjectURL(blob);

          setCompressedImage(url);
          setCompressedSize(blob.size);
          setCompressing(false);
        },
        "image/jpeg",
        quality / 100
      );
    };

    img.onerror = () => {
      setCompressing(false);
      alert("Could not process this image.");
    };

    img.src = image;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const compressionPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(
          0,
          Math.round(
            ((originalSize - compressedSize) / originalSize) * 100
          )
        )
      : 0;

  return (
    <div className="compressor-page">

      {/* Header */}

      <div className="compressor-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          Image Compressor
        </h1>

        <p>
          Reduce image file size while keeping
          the quality you need.
        </p>

      </div>


      {/* Main Card */}

      <div className="compressor-card">

        {!image ? (

          /* Upload */

          <label className="compressor-upload">

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            <div className="compressor-upload-icon">
              ⚡
            </div>

            <h2>
              Drop your image here
            </h2>

            <p>
              Upload an image and choose the
              compression quality you want.
            </p>

            <span className="browse-image-button">
              Browse Image
            </span>

            <small>
              JPG, PNG, WEBP and other image formats
            </small>

          </label>

        ) : (

          /* Image Workspace */

          <div className="compressor-content">

            {/* Top */}

            <div className="compressor-top">

              <div>
                <h2>
                  Image compression
                </h2>

                <p>
                  Adjust the quality and compress
                  your image.
                </p>
              </div>

              <label className="change-image-button-compressor">

                Change Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>


            {/* Preview */}

            <div className="compressor-preview-card">

              <div className="compressor-image-box">

                <img
                  src={image}
                  alt="Original preview"
                />

              </div>

              <div className="compressor-image-info">

                <span className="preview-label">
                  ORIGINAL IMAGE
                </span>

                <strong>
                  {formatSize(originalSize)}
                </strong>

                <span>
                  Original file size
                </span>

              </div>

            </div>


            {/* Quality */}

            <div className="quality-section">

              <div className="quality-header">

                <div>
                  <strong>
                    Compression Quality
                  </strong>

                  <p>
                    Lower quality creates a smaller
                    file size.
                  </p>
                </div>

                <div className="quality-value">
                  {quality}%
                </div>

              </div>

              <input
                className="quality-slider"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) =>
                  setQuality(Number(e.target.value))
                }
                disabled={compressing}
              />

              <div className="quality-scale">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>

            </div>


            {/* Compress Button */}

            <button
              className="compress-image-button"
              onClick={compressImage}
              disabled={compressing}
            >

              {compressing ? (
                <>
                  <span className="compress-spinner"></span>
                  Compressing Image...
                </>
              ) : (
                <>
                  Compress Image
                  <span>→</span>
                </>
              )}

            </button>


            {/* Result */}

            {compressedImage && (

              <div className="compression-result">

                <div className="result-header">

                  <div>
                    <span className="result-label">
                      COMPRESSED RESULT
                    </span>

                    <h3>
                      Your image is ready
                    </h3>
                  </div>

                  <div className="saved-badge">
                    {compressionPercent > 0
                      ? `${compressionPercent}% smaller`
                      : "Optimized"}
                  </div>

                </div>


                <div className="result-grid">

                  <div className="result-image-box">
                    <img
                      src={compressedImage}
                      alt="Compressed preview"
                    />
                  </div>


                  <div className="result-details">

                    <div className="size-comparison">

                      <div>
                        <span>
                          Original
                        </span>

                        <strong>
                          {formatSize(originalSize)}
                        </strong>
                      </div>

                      <div className="size-arrow">
                        →
                      </div>

                      <div>
                        <span>
                          Compressed
                        </span>

                        <strong>
                          {formatSize(compressedSize)}
                        </strong>
                      </div>

                    </div>


                    <a
                      href={compressedImage}
                      download="toolora-compressed.jpg"
                      className="download-compressed-button"
                    >
                      Download Image
                      <span>↓</span>
                    </a>

                  </div>

                </div>

              </div>

            )}


            {/* Security */}

            <div className="compressor-security">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your image stays private
                </strong>

                <p>
                  Image compression happens directly
                  in your browser. Your file is not
                  uploaded to a server.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>


      {/* Features */}

      <div className="compressor-features">

        <div>
          <span>⚡</span>

          <strong>
            Fast compression
          </strong>

          <p>
            Compress images quickly in your browser.
          </p>
        </div>

        <div>
          <span>📉</span>

          <strong>
            Smaller files
          </strong>

          <p>
            Reduce file size with adjustable quality.
          </p>
        </div>

        <div>
          <span>🔒</span>

          <strong>
            Private
          </strong>

          <p>
            Your images stay on your device.
          </p>
        </div>

      </div>

    </div>
  );
}

export default ImageCompressor;