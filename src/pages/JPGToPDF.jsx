import { useState } from "react";
import { jsPDF } from "jspdf";

function JPGToPDF() {
  const [images, setImages] = useState([]);
  const [converting, setConverting] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const imageData = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages(imageData);
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const addMoreImages = (e) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const newImages = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((currentImages) => [
      ...currentImages,
      ...newImages,
    ]);
  };

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () =>
        reject(new Error("Could not load image."));

      img.src = url;
    });
  };

  const createPDF = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      setConverting(true);

      const pdf = new jsPDF(
        "portrait",
        "mm",
        "a4"
      );

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;

      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      for (let index = 0; index < images.length; index++) {
        const image = images[index];

        const img = await loadImage(image.url);

        let width = img.width;
        let height = img.height;

        const ratio = Math.min(
          maxWidth / width,
          maxHeight / height
        );

        width *= ratio;
        height *= ratio;

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          img,
          "JPEG",
          x,
          y,
          width,
          height
        );
      }

      pdf.save("toolora-images.pdf");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while creating the PDF."
      );
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="jpg-pdf-page">

      {/* Header */}

      <div className="jpg-pdf-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          JPG to PDF
        </h1>

        <p>
          Convert your images into a clean PDF
          document in seconds.
        </p>

      </div>


      {/* Main Card */}

      <div className="jpg-pdf-card">

        {images.length === 0 ? (

          /* Upload */

          <label className="jpg-pdf-upload">

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleImages}
            />

            <div className="jpg-pdf-upload-icon">
              🖼️
            </div>

            <h2>
              Drop your images here
            </h2>

            <p>
              Select one or multiple images and
              convert them into a single PDF.
            </p>

            <span className="browse-jpg-button">
              Browse Images
            </span>

            <small>
              JPG, PNG, WEBP • Multiple images supported
            </small>

          </label>

        ) : (

          /* Selected Images */

          <div className="jpg-pdf-content">

            <div className="jpg-pdf-top">

              <div>

                <h2>
                  Selected images
                </h2>

                <p>
                  {images.length}{" "}
                  {images.length === 1
                    ? "image"
                    : "images"}{" "}
                  ready to convert
                </p>

              </div>

              <label className="add-images-button">

                + Add Images

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={addMoreImages}
                />

              </label>

            </div>


            {/* Image Grid */}

            <div className="jpg-pdf-grid">

              {images.map((image, index) => (

                <div
                  className="jpg-pdf-image-card"
                  key={`${image.file.name}-${index}`}
                >

                  <div className="jpg-pdf-image-preview">

                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                    />

                    <div className="jpg-pdf-number">
                      {index + 1}
                    </div>

                    <button
                      className="remove-jpg-button"
                      onClick={() =>
                        removeImage(index)
                      }
                      disabled={converting}
                      aria-label="Remove image"
                    >
                      ×
                    </button>

                  </div>

                  <div className="jpg-pdf-image-info">

                    <strong>
                      Image {index + 1}
                    </strong>

                    <span>
                      {image.file.name}
                    </span>

                  </div>

                </div>

              ))}

            </div>


            {/* Convert Button */}

            <button
              className="create-pdf-button"
              onClick={createPDF}
              disabled={converting}
            >

              {converting ? (
                <>
                  <span className="jpg-pdf-spinner"></span>
                  Creating PDF...
                </>
              ) : (
                <>
                  Convert {images.length}{" "}
                  {images.length === 1
                    ? "Image"
                    : "Images"}{" "}
                  to PDF
                  <span>→</span>
                </>
              )}

            </button>


            {/* Security */}

            <div className="jpg-pdf-security">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your images stay private
                </strong>

                <p>
                  PDF creation happens directly
                  in your browser. Your images are
                  not uploaded to a server.
                </p>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* Features */}

      <div className="jpg-pdf-features">

        <div>
          <span>🖼️</span>

          <strong>
            Multiple images
          </strong>

          <p>
            Combine multiple images into one PDF.
          </p>
        </div>

        <div>
          <span>⚡</span>

          <strong>
            Fast conversion
          </strong>

          <p>
            Create your PDF directly in your browser.
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

export default JPGToPDF;