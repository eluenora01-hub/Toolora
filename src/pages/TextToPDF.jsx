import { useState } from "react";
import { jsPDF } from "jspdf";

function TextToPDF() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("toolora-document");
  const [fontSize, setFontSize] = useState(14);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [creating, setCreating] = useState(false);

  const createPDF = () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    try {
      setCreating(true);

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      let style = "normal";

      if (bold && italic) {
        style = "bolditalic";
      } else if (bold) {
        style = "bold";
      } else if (italic) {
        style = "italic";
      }

      pdf.setFont("helvetica", style);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(0, 0, 0);

      const lines = pdf.splitTextToSize(text, maxWidth);

      let y = margin;

      const lineHeight = fontSize * 0.45;

      lines.forEach((line) => {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        let x = margin;

        if (alignment === "center") {
          x = pageWidth / 2;
        }

        if (alignment === "right") {
          x = pageWidth - margin;
        }

        pdf.text(line, x, y, {
          align: alignment,
        });

        y += lineHeight;
      });

      const safeName =
        fileName.trim() || "toolora-document";

      pdf.save(`${safeName}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the PDF.");
    } finally {
      setCreating(false);
    }
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="text-pdf-page">

      {/* Header */}

      <div className="text-pdf-header">

        <div className="tool-badge">
          TOOLORA TOOL
        </div>

        <h1>
          Text to PDF
        </h1>

        <p>
          Create clean, professional PDF documents
          from your text in seconds.
        </p>

      </div>


      {/* Editor Layout */}

      <div className="text-pdf-workspace">

        {/* LEFT — Editor */}

        <div className="text-editor-card">

          <div className="editor-card-header">

            <div>
              <h2>
                Document Editor
              </h2>

              <p>
                Write or paste your content below.
              </p>
            </div>

            {text && (
              <button
                className="clear-text-button"
                onClick={clearText}
              >
                Clear
              </button>
            )}

          </div>


          {/* File Name */}

          <div className="editor-field">

            <label>
              PDF File Name
            </label>

            <div className="filename-input">

              <input
                type="text"
                value={fileName}
                onChange={(e) =>
                  setFileName(e.target.value)
                }
                placeholder="my-document"
              />

              <span>.pdf</span>

            </div>

          </div>


          {/* Formatting Toolbar */}

          <div className="format-toolbar">

            <div className="toolbar-group">

              <span className="toolbar-label">
                Text
              </span>

              <select
                value={fontSize}
                onChange={(e) =>
                  setFontSize(Number(e.target.value))
                }
              >
                <option value={10}>10 px</option>
                <option value={12}>12 px</option>
                <option value={14}>14 px</option>
                <option value={16}>16 px</option>
                <option value={18}>18 px</option>
                <option value={20}>20 px</option>
                <option value={24}>24 px</option>
              </select>

            </div>


            <div className="toolbar-divider"></div>


            <div className="toolbar-group">

              <span className="toolbar-label">
                Style
              </span>

              <div className="format-buttons">

                <button
                  type="button"
                  className={bold ? "active" : ""}
                  onClick={() =>
                    setBold((value) => !value)
                  }
                >
                  <b>B</b>
                </button>

                <button
                  type="button"
                  className={italic ? "active" : ""}
                  onClick={() =>
                    setItalic((value) => !value)
                  }
                >
                  <i>I</i>
                </button>

              </div>

            </div>


            <div className="toolbar-divider"></div>


            <div className="toolbar-group">

              <span className="toolbar-label">
                Align
              </span>

              <div className="alignment-buttons">

                <button
                  type="button"
                  className={
                    alignment === "left"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setAlignment("left")
                  }
                  title="Left"
                >
                  ≡
                </button>

                <button
                  type="button"
                  className={
                    alignment === "center"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setAlignment("center")
                  }
                  title="Center"
                >
                  ☰
                </button>

                <button
                  type="button"
                  className={
                    alignment === "right"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setAlignment("right")
                  }
                  title="Right"
                >
                  ≡
                </button>

              </div>

            </div>

          </div>


          {/* Text Editor */}

          <div className="textarea-wrapper">

            <textarea
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              placeholder="Start writing your document here..."
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: bold
                  ? "700"
                  : "400",
                fontStyle: italic
                  ? "italic"
                  : "normal",
                textAlign: alignment,
              }}
            />

            <div className="editor-counter">
              {text.length} characters
            </div>

          </div>


          {/* Document Settings */}

          <div className="document-settings">

            <div className="setting-item">

              <label>
                Page Size
              </label>

              <select
                value={pageSize}
                onChange={(e) =>
                  setPageSize(e.target.value)
                }
              >
                <option value="a4">
                  A4
                </option>

                <option value="a5">
                  A5
                </option>

                <option value="letter">
                  Letter
                </option>
              </select>

            </div>


            <div className="setting-item">

              <label>
                Orientation
              </label>

              <select
                value={orientation}
                onChange={(e) =>
                  setOrientation(e.target.value)
                }
              >
                <option value="portrait">
                  Portrait
                </option>

                <option value="landscape">
                  Landscape
                </option>
              </select>

            </div>

          </div>


          {/* Download */}

          <button
            className="text-pdf-download"
            onClick={createPDF}
            disabled={creating}
          >

            {creating ? (
              <>
                <span className="text-pdf-spinner"></span>
                Creating PDF...
              </>
            ) : (
              <>
                Download PDF
                <span>↓</span>
              </>
            )}

          </button>


          {/* Privacy */}

          <div className="text-pdf-security">

            <span>
              🔒
            </span>

            <div>

              <strong>
                Your document stays private
              </strong>

              <p>
                PDF generation happens directly
                in your browser.
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT — Preview */}

        <div className="document-preview-card">

          <div className="preview-header">

            <div>
              <span>
                LIVE PREVIEW
              </span>

              <h2>
                Document
              </h2>
            </div>

            <div className="preview-page-badge">
              {pageSize.toUpperCase()}
            </div>

          </div>


          <div
            className={`document-paper ${
              orientation === "landscape"
                ? "landscape"
                : ""
            }`}
          >

            <div
              className={`paper-content ${
                alignment
              }`}
              style={{
                fontSize: `${Math.max(
                  7,
                  fontSize * 0.55
                )}px`,
                fontWeight: bold
                  ? "700"
                  : "400",
                fontStyle: italic
                  ? "italic"
                  : "normal",
              }}
            >

              {text ? (
                text
                  .split("\n")
                  .map((line, index) => (
                    <div
                      key={index}
                      className="paper-line"
                    >
                      {line || "\u00A0"}
                    </div>
                  ))
              ) : (
                <div className="paper-placeholder">
                  Your document preview
                  will appear here...
                </div>
              )}

            </div>

          </div>


          <div className="preview-footer">

            <span>
              {orientation === "portrait"
                ? "Portrait"
                : "Landscape"}
            </span>

            <span>
              •
            </span>

            <span>
              {pageSize.toUpperCase()}
            </span>

          </div>

        </div>

      </div>


      {/* Features */}

      <div className="text-pdf-features">

        <div>
          <span>✍️</span>

          <strong>
            Easy editing
          </strong>

          <p>
            Write and format your document easily.
          </p>
        </div>

        <div>
          <span>👁️</span>

          <strong>
            Live preview
          </strong>

          <p>
            See your document while you write.
          </p>
        </div>

        <div>
          <span>🔒</span>

          <strong>
            Private
          </strong>

          <p>
            Your document stays on your device.
          </p>
        </div>

      </div>

    </div>
  );
}

export default TextToPDF;