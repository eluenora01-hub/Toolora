import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

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

/* =========================
   NAVBAR
========================= */

function Navbar({ toolPage = false }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Toolora
      </div>

      {toolPage ? (
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Tools
        </button>
      ) : (
        <div className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
        </div>
      )}

    </header>
  );
}

/* =========================
   TOOL PAGE LAYOUT
========================= */

function ToolPage({ children }) {
  return (
    <div className="app">

      <Navbar toolPage={true} />

      <main>
        {children}
      </main>

    </div>
  );
}

/* =========================
   HOMEPAGE
========================= */

function Home() {
  return (
    <div className="app">

      {/* NAVBAR */}

      <Navbar />

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

            <Link to="/text-to-pdf">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/jpg-to-pdf">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/image-compressor">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/pdf-merger">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/pdf-splitter">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/pdf-to-image">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/image-cropper">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/qr-code-generator">
              <button>
                Open Tool
              </button>
            </Link>

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

            <Link to="/cv-builder">
              <button>
                Open Tool
              </button>
            </Link>

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


/* =========================
   APP ROUTES
========================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* TOOLS */}

        <Route
          path="/text-to-pdf"
          element={
            <ToolPage>
              <TextToPDF />
            </ToolPage>
          }
        />

        <Route
          path="/jpg-to-pdf"
          element={
            <ToolPage>
              <JPGToPDF />
            </ToolPage>
          }
        />

        <Route
          path="/image-compressor"
          element={
            <ToolPage>
              <ImageCompressor />
            </ToolPage>
          }
        />

        <Route
          path="/pdf-merger"
          element={
            <ToolPage>
              <PDFMerger />
            </ToolPage>
          }
        />

        <Route
          path="/pdf-splitter"
          element={
            <ToolPage>
              <PDFSplitter />
            </ToolPage>
          }
        />

        <Route
          path="/pdf-to-image"
          element={
            <ToolPage>
              <PDFToImage />
            </ToolPage>
          }
        />

        <Route
          path="/image-cropper"
          element={
            <ToolPage>
              <ImageCropper />
            </ToolPage>
          }
        />

        <Route
          path="/qr-code-generator"
          element={
            <ToolPage>
              <QRCodeGenerator />
            </ToolPage>
          }
        />

        <Route
          path="/cv-builder"
          element={
            <ToolPage>
              <CVBuilder />
            </ToolPage>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;