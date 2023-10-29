"use client";

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./PDFViewer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../skeleton/Loading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function PDFViewerComponent() {
  const [file, setFile] = useState<PDFFile>(
    "./Cryptography_and_Network_Security.pdf"
  );
  const [numPages, setNumPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);

  const loadMorePages = () => {
    if (loadedPages < numPages) {
      setLoadedPages(loadedPages + 1);
    }
  };

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <InfiniteScroll
              dataLength={loadedPages}
              next={loadMorePages}
              hasMore={loadedPages < numPages}
              loader={<Loading />}
            >
              {Array.from({ length: loadedPages }).map((_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              ))}
            </InfiniteScroll>
          </Document>
        </div>
      </div>
    </div>
  );
}
