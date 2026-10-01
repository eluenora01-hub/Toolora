import { useState } from "react";
import { PDFDocument } from "pdf-lib";

function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    setFiles(pdfFiles);
  };

  const removeFile = (indexToRemove) => {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files.");
      return;
    }

    try {
      setMerging(true);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await PDFDocument.load(arrayBuffer);

        const pages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();

      const blob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "toolora-merged.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while merging PDFs."
      );
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="merger-page">

      {/* Header */}

      <div className="merger-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          PDF Merger
        </h1>

        <p>
          Combine multiple PDF files into one
          organized document.
        </p>

      </div>


      {/* Main Card */}

      <div className="merger-card">

        {files.length === 0 ? (

          /* Upload */

          <label className="merger-upload">

            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFiles}
            />

            <div className="merger-upload-icon">
              📚
            </div>

            <h2>
              Drop your PDF files here
            </h2>

            <p>
              Select two or more PDF files to
              combine them into one document.
            </p>

            <span className="browse-merger-button">
              Browse PDF Files
            </span>

            <small>
              Multiple PDF files supported
            </small>

          </label>

        ) : (

          /* Selected Files */

          <div className="merger-content">

            <div className="merger-top">

              <div>

                <h2>
                  Selected PDF files
                </h2>

                <p>
                  {files.length}{" "}
                  {files.length === 1
                    ? "file"
                    : "files"}{" "}
                  ready to merge
                </p>

              </div>

              <label className="add-more-button">

                + Add PDFs

                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(
                      e.target.files
                    ).filter(
                      (file) =>
                        file.type ===
                        "application/pdf"
                    );

                    setFiles((current) => [
                      ...current,
                      ...newFiles,
                    ]);
                  }}
                />

              </label>

            </div>


            {/* File List */}

            <div className="merger-file-list">

              {files.map((file, index) => (

                <div
                  className="merger-file-item"
                  key={`${file.name}-${index}`}
                >

                  <div className="file-order">
                    {index + 1}
                  </div>

                  <div className="merger-pdf-icon">
                    📄
                  </div>

                  <div className="merger-file-info">

                    <strong>
                      {file.name}
                    </strong>

                    <span>
                      PDF document
                    </span>

                  </div>

                  <button
                    className="remove-pdf-button"
                    onClick={() =>
                      removeFile(index)
                    }
                    disabled={merging}
                    aria-label="Remove PDF"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>


            {/* Merge */}

            <button
              className="merge-pdf-button"
              onClick={mergePDFs}
              disabled={
                merging || files.length < 2
              }
            >

              {merging ? (
                <>
                  <span className="merge-spinner"></span>
                  Merging PDFs...
                </>
              ) : (
                <>
                  Merge{" "}
                  {files.length} PDFs
                  <span>→</span>
                </>
              )}

            </button>


            {files.length < 2 && (
              <p className="merge-warning">
                Add at least 2 PDF files to merge.
              </p>
            )}


            {/* Privacy */}

            <div className="merger-security">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your files stay private
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

      <div className="merger-features">

        <div>
          <span>📚</span>

          <strong>
            Multiple files
          </strong>

          <p>
            Combine multiple PDFs together.
          </p>
        </div>

        <div>
          <span>⚡</span>

          <strong>
            Fast merging
          </strong>

          <p>
            Quickly create one PDF document.
          </p>
        </div>

        <div>
          <span>🔒</span>

          <strong>
            Private
          </strong>

          <p>
            Your files stay on your device.
          </p>
        </div>

      </div>

    </div>
  );
}

export default PDFMerger;