import { useState } from "react";
import { PDFDocument } from "pdf-lib";

function PDFSplitter() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [splitting, setSplitting] = useState(false);

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const totalPages = pdf.getPageCount();

      setFile(selectedFile);
      setPageCount(totalPages);
      setStartPage(1);
      setEndPage(totalPages);
    } catch (error) {
      console.error(error);
      alert("Could not read this PDF file.");
    }
  };

  const splitPDF = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    if (
      startPage < 1 ||
      endPage > pageCount ||
      startPage > endPage
    ) {
      alert("Please enter a valid page range.");
      return;
    }

    try {
      setSplitting(true);

      const arrayBuffer = await file.arrayBuffer();

      const sourcePDF = await PDFDocument.load(arrayBuffer);

      const newPDF = await PDFDocument.create();

      const pageIndexes = [];

      for (
        let i = startPage - 1;
        i < endPage;
        i++
      ) {
        pageIndexes.push(i);
      }

      const copiedPages = await newPDF.copyPages(
        sourcePDF,
        pageIndexes
      );

      copiedPages.forEach((page) => {
        newPDF.addPage(page);
      });

      const pdfBytes = await newPDF.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "toolora-split.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      alert("PDF split successfully!");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while splitting the PDF."
      );
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="splitter-page">

      {/* Header */}

      <div className="splitter-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          PDF Splitter
        </h1>

        <p>
          Extract the pages you need from any PDF
          and download them as a new document.
        </p>

      </div>


      {/* Main Card */}

      <div className="splitter-card">

        {!file ? (

          /* Upload */

          <label className="splitter-upload">

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
            />

            <div className="splitter-upload-icon">
              📄
            </div>

            <h2>
              Drop your PDF here
            </h2>

            <p>
              Upload a PDF to choose which pages
              you want to extract.
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

          <div className="splitter-content">

            {/* File */}

            <div className="splitter-file-card">

              <div className="splitter-file-icon">
                📄
              </div>

              <div className="splitter-file-info">

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

              <label className="change-split-file">

                Change

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                />

              </label>

            </div>


            {/* Page Selection */}

            <div className="page-selection">

              <div className="selection-title">

                <div>
                  <h3>
                    Select pages
                  </h3>

                  <p>
                    Choose the first and last page
                    you want to extract.
                  </p>
                </div>

                <div className="page-count-badge">
                  {pageCount} pages
                </div>

              </div>


              <div className="page-inputs">

                <div className="page-input-group">

                  <label>
                    Start Page
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={startPage}
                    onChange={(e) =>
                      setStartPage(
                        Number(e.target.value)
                      )
                    }
                    disabled={splitting}
                  />

                </div>


                <div className="range-arrow">
                  →
                </div>


                <div className="page-input-group">

                  <label>
                    End Page
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={endPage}
                    onChange={(e) =>
                      setEndPage(
                        Number(e.target.value)
                      )
                    }
                    disabled={splitting}
                  />

                </div>

              </div>


              {/* Range Preview */}

              <div className="range-preview">

                <span>
                  Selected pages
                </span>

                <strong>
                  {startPage} – {endPage}
                </strong>

              </div>

            </div>


            {/* Split Button */}

            <button
              className="split-pdf-button"
              onClick={splitPDF}
              disabled={splitting}
            >

              {splitting ? (
                <>
                  <span className="split-spinner"></span>
                  Splitting PDF...
                </>
              ) : (
                <>
                  Split PDF
                  <span>→</span>
                </>
              )}

            </button>


            {/* Security */}

            <div className="split-security">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your file stays private
                </strong>

                <p>
                  PDF processing happens directly
                  in your browser.
                </p>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* Features */}

      <div className="splitter-features">

        <div>
          <span>✂️</span>

          <strong>
            Select pages
          </strong>

          <p>
            Choose exactly which pages to extract.
          </p>
        </div>


        <div>
          <span>⚡</span>

          <strong>
            Fast processing
          </strong>

          <p>
            Split your PDF quickly in your browser.
          </p>
        </div>


        <div>
          <span>🔒</span>

          <strong>
            Private
          </strong>

          <p>
            Your PDF stays on your device.
          </p>
        </div>

      </div>

    </div>
  );
}

export default PDFSplitter;