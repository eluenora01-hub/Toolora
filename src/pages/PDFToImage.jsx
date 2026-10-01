import { useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

function PDFToImage() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("jpg");
  const [quality, setQuality] = useState(0.9);
  const [scale, setScale] = useState(1.5);
  const [converting, setConverting] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await getDocument({
        data: arrayBuffer,
      }).promise;

      setFile(selectedFile);
      setPageCount(pdf.numPages);
    } catch (error) {
      console.error(error);
      alert("Could not read this PDF file.");
    }
  };

  const convertPDF = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    try {
      setConverting(true);

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await getDocument({
        data: arrayBuffer,
      }).promise;

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: Number(scale),
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const mimeType =
          format === "png"
            ? "image/png"
            : "image/jpeg";

        const imageQuality =
          format === "jpg"
            ? Number(quality)
            : undefined;

        const blob = await new Promise((resolve) => {
          canvas.toBlob(
            resolve,
            mimeType,
            imageQuality
          );
        });

        if (!blob) {
          throw new Error("Could not create image.");
        }

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `toolora-page-${pageNumber}.${format}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        await new Promise((resolve) =>
          setTimeout(resolve, 300)
        );
      }

      alert("PDF converted successfully!");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while converting the PDF."
      );
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="pdf-image-page">

      {/* Header */}

      <div className="pdf-image-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          PDF to JPG / PNG
        </h1>

        <p>
          Convert PDF pages into high-quality images
          directly in your browser.
        </p>

      </div>


      {/* Main Card */}

      <div className="pdf-converter-card">

        {!file ? (

          /* Upload State */

          <label className="pdf-upload-area">

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
            />

            <div className="pdf-upload-icon">
              📄
            </div>

            <h2>
              Drop your PDF here
            </h2>

            <p>
              Upload a PDF file to convert its pages
              into JPG or PNG images.
            </p>

            <span className="browse-pdf-button">
              Browse PDF
            </span>

            <small>
              PDF files only • Processed locally
            </small>

          </label>

        ) : (

          /* Selected PDF */

          <div className="pdf-selected">

            <div className="pdf-file-card">

              <div className="pdf-file-icon">
                📄
              </div>

              <div className="pdf-file-details">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {pageCount}{" "}
                  {pageCount === 1
                    ? "page"
                    : "pages"}
                </span>

              </div>

              <label className="change-pdf-button">

                Change

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                />

              </label>

            </div>


            {/* Options */}

            <div className="pdf-options">

              <div className="pdf-option">

                <label>
                  Output Format
                </label>

                <select
                  value={format}
                  onChange={(e) =>
                    setFormat(e.target.value)
                  }
                  disabled={converting}
                >
                  <option value="jpg">
                    JPG
                  </option>

                  <option value="png">
                    PNG
                  </option>
                </select>

              </div>


              {format === "jpg" && (

                <div className="pdf-option">

                  <label>
                    JPG Quality
                  </label>

                  <select
                    value={quality}
                    onChange={(e) =>
                      setQuality(e.target.value)
                    }
                    disabled={converting}
                  >
                    <option value="0.7">
                      70% — Smaller
                    </option>

                    <option value="0.8">
                      80% — Balanced
                    </option>

                    <option value="0.9">
                      90% — High
                    </option>

                    <option value="1">
                      100% — Maximum
                    </option>
                  </select>

                </div>

              )}


              <div className="pdf-option">

                <label>
                  Image Resolution
                </label>

                <select
                  value={scale}
                  onChange={(e) =>
                    setScale(e.target.value)
                  }
                  disabled={converting}
                >
                  <option value="1">
                    Standard
                  </option>

                  <option value="1.5">
                    High
                  </option>

                  <option value="2">
                    Very High
                  </option>

                  <option value="3">
                    Ultra
                  </option>
                </select>

              </div>

            </div>


            {/* Convert */}

            <button
              className="convert-pdf-button"
              onClick={convertPDF}
              disabled={converting}
            >

              {converting ? (
                <>
                  <span className="loading-spinner"></span>
                  Converting PDF...
                </>
              ) : (
                <>
                  Convert to{" "}
                  {format.toUpperCase()}
                  <span>→</span>
                </>
              )}

            </button>


            {/* Information */}

            <div className="pdf-security-note">

              <span>🔒</span>

              <div>
                <strong>
                  Your files stay private
                </strong>

                <p>
                  PDF processing happens in your browser.
                  Your file is not uploaded to a server.
                </p>
              </div>

            </div>

          </div>

        )}

      </div>


      {/* Bottom Features */}

      <div className="pdf-features">

        <div>
          <span>⚡</span>
          <strong>Fast conversion</strong>
          <p>Convert PDF pages quickly.</p>
        </div>

        <div>
          <span>🔒</span>
          <strong>Private</strong>
          <p>Your files stay on your device.</p>
        </div>

        <div>
          <span>🖼️</span>
          <strong>High quality</strong>
          <p>Choose your preferred resolution.</p>
        </div>

      </div>

    </div>
  );
}

export default PDFToImage;