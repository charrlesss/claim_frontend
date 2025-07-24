import { useEffect, useRef, useState } from "react";
import { wait } from "../Lib/wait";
import PageHelmet from "./PageHelmet";

export default function DisplayReport() {
  const [title, setTitle] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    wait(100).then(() => {
      const params = new URLSearchParams(window.location.search);
      const urlParams = params.get("params");
      if (urlParams) {
        const state = JSON.parse(urlParams);
        if (iframeRef.current) {
          iframeRef.current.src = state.pdfUrl;
        }
        console.log(state);
        setTitle(state.reportHeader);
      }
    });
  }, []);

  return (
    <>
      <PageHelmet title={title} />
      <div
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          width: "100vw",
          height: "100vh",
        }}
      >
        <iframe
          ref={iframeRef}
          id="reportFrame"
          style={{
            flex: 1,
            border:"none",
            outline:"none",
            padding:0,
            margin:0,
            boxSizing:"border-box"
          }}
        ></iframe>
      </div>
    </>
  );
}
