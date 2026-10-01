import { useState } from "react";

import JPGToPDF from "./pages/JPGToPDF";
import TextToPDF from "./pages/TextToPDF";
import ImageCompressor from "./pages/ImageCompressor";
import PDFMerger from "./pages/PDFMerger";
import PDFSplitter from "./pages/PDFSplitter";
import PDFToImage from "./pages/PDFToImage";
import ImageCropper from "./pages/ImageCropper";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import CVBuilder from "./pages/CVBuilder";

import "./App.css";

function App() {
  const [currentTool, setCurrentTool] = useState("home");

  /* =========================
     TOOL PAGE
  ========================= */

  const toolPages = {
    "text-pdf": {
      title: "Text to PDF",
      component: <TextToPDF />,
    },

    "jpg-pdf": {
      title: "JPG to PDF",
      component: <JPGToPDF />,
    },

    "image-compress": {
      title: "Image Compressor",
      component: <ImageCompressor />,
    },

    "pdf-merger": {
      title: "PDF Merger",
      component: <PDFMerger />,
    },

    "pdf-splitter": {
      title: "PDF Splitter",
      component: <PDFSplitter />,
    },

    "pdf-image": {
      title: "PDF to JPG / PNG",
      component: <PDFToImage />,
    },

    "image-cropper": {
      title: "Image Cropper",
      component: <ImageCropper />,
    },

    "qr-generator": {
      title: "QR Code Generator",
      component: <QRCodeGenerator />,
    },

    "cv-builder": {
      title: "CV / Resume Builder",
      component: <CVBuilder />,
    },
  };

  /* =========================
     TOOL PAGE RENDER
  ========================= */

  if (currentTool !== "home") {
    const selectedTool = toolPages[currentTool];

    return (
      <div className="app">

        <header className="navbar">

          <div
            className="logo"
            onClick={() => setCurrentTool("home")}
            style={{ cursor: "pointer" }}
          >
            Toolora
          </div>

          <button
            className="back-button"
            onClick={() => setCurrentTool("home")}
          >
            ← Back to Tools
          </button>

        </header>

        <main>
          {selectedTool.component}
        </main>

      </div>
    );
  }

  /* =========================
     HOMEPAGE
  ========================= */

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div
          className="logo"
          onClick={() => setCurrentTool("home")}
          style={{ cursor: "pointer" }}
        >
          Toolora
        </div>

        <div className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
        </div>

      </header>


      {/* HERO */}

      <section className="hero">

        <div className="hero-label">
          FREE ONLINE TOOLS
        </div>

        <h1>
          Powerful tools.
          <br />
          <span>Simple & fast.</span>
        </h1>

        <p>
          Free online tools to make your everyday tasks easier.
          Fast, simple and easy to use.
        </p>

      </section>


      {/* TOOLS */}

      <section id="tools">

        <div className="tools-grid">


          {/* TEXT TO PDF */}

          <div className="tool-card">

            <div className="tool-icon">
              📄
            </div>

            <h3>
              Text to PDF
            </h3>

            <p>
              Convert your text into a professional PDF file.
            </p>

            <button
              onClick={() => setCurrentTool("text-pdf")}
            >
              Open Tool
            </button>

          </div>


          {/* JPG TO PDF */}

          <div className="tool-card">

            <div className="tool-icon">
              🖼️
            </div>

            <h3>
              JPG to PDF
            </h3>

            <p>
              Convert images into PDF documents quickly.
            </p>

            <button
              onClick={() => setCurrentTool("jpg-pdf")}
            >
              Open Tool
            </button>

          </div>


          {/* IMAGE COMPRESSOR */}

          <div className="tool-card">

            <div className="tool-icon">
              ⚡
            </div>

            <h3>
              Image Compressor
            </h3>

            <p>
              Reduce image file size while keeping good quality.
            </p>

            <button
              onClick={() => setCurrentTool("image-compress")}
            >
              Open Tool
            </button>

          </div>


          {/* PDF MERGER */}

          <div className="tool-card">

            <div className="tool-icon">
              📚
            </div>

            <h3>
              PDF Merger
            </h3>

            <p>
              Merge multiple PDF files into one document.
            </p>

            <button
              onClick={() => setCurrentTool("pdf-merger")}
            >
              Open Tool
            </button>

          </div>


          {/* PDF SPLITTER */}

          <div className="tool-card">

            <div className="tool-icon">
              ✂️
            </div>

            <h3>
              PDF Splitter
            </h3>

            <p>
              Split a PDF into separate pages quickly.
            </p>

            <button
              onClick={() => setCurrentTool("pdf-splitter")}
            >
              Open Tool
            </button>

          </div>


          {/* PDF TO IMAGE */}

          <div className="tool-card">

            <div className="tool-icon">
              🖼️
            </div>

            <h3>
              PDF to JPG / PNG
            </h3>

            <p>
              Convert PDF pages into JPG or PNG images.
            </p>

            <button
              onClick={() => setCurrentTool("pdf-image")}
            >
              Open Tool
            </button>

          </div>


          {/* IMAGE CROPPER */}

          <div className="tool-card">

            <div className="tool-icon">
              ✂️
            </div>

            <h3>
              Image Cropper
            </h3>

            <p>
              Crop, zoom and rotate images easily.
            </p>

            <button
              onClick={() => setCurrentTool("image-cropper")}
            >
              Open Tool
            </button>

          </div>


          {/* QR GENERATOR */}

          <div className="tool-card">

            <div className="tool-icon">
              🔗
            </div>

            <h3>
              QR Code Generator
            </h3>

            <p>
              Generate a QR code from any link or URL.
            </p>

            <button
              onClick={() => setCurrentTool("qr-generator")}
            >
              Open Tool
            </button>

          </div>


          {/* CV BUILDER */}

          <div className="tool-card">

            <div className="tool-icon">
              📋
            </div>

            <h3>
              CV / Resume Builder
            </h3>

            <p>
              Create a professional CV and resume in minutes.
            </p>

            <button
              onClick={() => setCurrentTool("cv-builder")}
            >
              Open Tool
            </button>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section id="about">

        <h2>
          About Toolora
        </h2>

        <p>
          Toolora provides simple, fast and useful online tools
          for everyday tasks. Everything is designed to be easy
          to use without unnecessary complexity.
        </p>

      </section>

    </div>
  );
}

export default App;