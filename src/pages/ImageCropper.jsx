import React, { useState } from "react";

function ImageCropper() {
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState("free");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setZoom(1);
      setRotation(0);
    };

    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setZoom(1);
    setRotation(0);
  };

  const rotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const downloadImage = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxSize = 1200;

      let width = img.width;
      let height = img.height;

      if (width > maxSize || height > maxSize) {
        const scale = Math.min(maxSize / width, maxSize / height);
        width *= scale;
        height *= scale;
      }

      const radians = (rotation * Math.PI) / 180;
      const rotated = rotation % 180 !== 0;

      canvas.width = rotated ? height : width;
      canvas.height = rotated ? width : height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.scale(zoom, zoom);

      ctx.drawImage(
        img,
        -width / 2,
        -height / 2,
        width,
        height
      );

      const link = document.createElement("a");
      link.download = "toolora-cropped-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = image;
  };

  return (
    <div className="cropper-page">

      <div className="tool-header">
        <span className="tool-badge">TOOLORA TOOL</span>

        <h1>Image Cropper</h1>

        <p>
          Crop, rotate, resize and download your image easily.
        </p>
      </div>

      {!image ? (
        <div className="upload-card">

          <div className="upload-icon">✂️</div>

          <h2>Upload your image</h2>

          <p>
            Drag & drop an image here or choose a file from your device.
          </p>

          <label className="upload-button">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>

          <span className="upload-info">
            JPG, PNG, WEBP • Maximum recommended size 10MB
          </span>

        </div>
      ) : (
        <div className="cropper-container">

          <div className="cropper-workspace">

            <div className="crop-preview">

              <div
                className={`crop-frame aspect-${aspect}`}
              >
                <img
                  src={image}
                  alt="Crop preview"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`
                  }}
                />
              </div>

            </div>

            <div className="crop-controls">

              <div className="control-group">

                <label>Zoom</label>

                <div className="zoom-control">
                  <button
                    onClick={() =>
                      setZoom((prev) => Math.max(0.5, prev - 0.1))
                    }
                  >
                    −
                  </button>

                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) =>
                      setZoom(Number(e.target.value))
                    }
                  />

                  <button
                    onClick={() =>
                      setZoom((prev) => Math.min(3, prev + 0.1))
                    }
                  >
                    +
                  </button>
                </div>

              </div>

              <div className="control-group">

                <label>Aspect Ratio</label>

                <div className="aspect-buttons">

                  <button
                    className={aspect === "free" ? "active" : ""}
                    onClick={() => setAspect("free")}
                  >
                    Free
                  </button>

                  <button
                    className={aspect === "1-1" ? "active" : ""}
                    onClick={() => setAspect("1-1")}
                  >
                    1:1
                  </button>

                  <button
                    className={aspect === "4-3" ? "active" : ""}
                    onClick={() => setAspect("4-3")}
                  >
                    4:3
                  </button>

                  <button
                    className={aspect === "16-9" ? "active" : ""}
                    onClick={() => setAspect("16-9")}
                  >
                    16:9
                  </button>

                </div>

              </div>

              <div className="control-group">

                <label>Rotate</label>

                <div className="rotate-buttons">

                  <button onClick={rotateLeft}>
                    ↶ Rotate Left
                  </button>

                  <button onClick={rotateRight}>
                    ↷ Rotate Right
                  </button>

                </div>

              </div>

              <div className="action-buttons">

                <button
                  className="reset-button"
                  onClick={resetImage}
                >
                  Reset
                </button>

                <button
                  className="download-crop-button"
                  onClick={downloadImage}
                >
                  ✂️ Crop & Download
                </button>

              </div>

            </div>
          </div>

          <button
            className="change-image-button"
            onClick={() => {
              setImage(null);
              setZoom(1);
              setRotation(0);
            }}
          >
            ← Choose Another Image
          </button>

        </div>
      )}

    </div>
  );
}

export default ImageCropper;