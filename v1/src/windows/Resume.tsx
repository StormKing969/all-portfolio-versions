import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import WindowWrapper from "../hoc/WindowWrapper.tsx";
import { WindowControls } from "../components";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const handleCurrentPage = (direction: string) => {
    if (direction === "prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }

    if (direction === "next" && currentPage !== numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"resume"} />
        <h2>Resume.pdf</h2>

        <a
          href={"/files/resume.pdf"}
          download
          className={"cursor-pointer"}
          title={"Download Resume"}
        >
          <Download className={"icon"} />
        </a>
      </div>

      <Document
        file="/files/resume.pdf"
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
        }}
        onLoadError={(error) => {
          setError(error.message);
        }}
        loading={<div>Loading PDF...</div>}
        error={<div>Error loading PDF: {error || "Unknown error"}</div>}
      >
        <Page
          pageNumber={currentPage}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>

      <div className={"flex-center gap-2 pb-1"}>
        <ChevronLeft
          className={"icon"}
          onClick={() => handleCurrentPage("prev")}
        />
        <p>
          Page {currentPage} of {numPages}
        </p>
        <ChevronRight
          className={"icon"}
          onClick={() => handleCurrentPage("next")}
        />
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;