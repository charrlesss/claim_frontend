import { Button, IconButton } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

const UploadModal = forwardRef(({ handleOnSave, handleOnClose }: any, ref) => {
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState<any>([]);
  const [documentSelected, setDocumentSelected] = useState<{
    id: number;
    label: string;
    document_id: string;
    files: Array<File> | null;
    required: boolean;
    reference: string;
  } | null>(null);

  const fileRef = useRef([]);
  const [dragActive, setDragActive] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [handleDelayClose, setHandleDelayClose] = useState(false);
  const [blick, setBlick] = useState(false);

  const closeDelay = (e: any, state: any) => {
    setHandleDelayClose(true);
    setTimeout(() => {
      setShowModal(false);
      setHandleDelayClose(false);
      handleOnClose(e, state);
    }, 100);
  };
  const closeDelayRef = useRef<any>(closeDelay);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      setSelected(0);
      setFile(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: any) => {
    if (e.target.files.length > 0) {
      setSelected(0);
      setFile(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e: any) => {
      if (e.key === "Escape") {
        closeDelayRef.current();
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setShowModal(true);
    },
    clsoeModal: () => {
      setShowModal(false);
    },
    getRefs: () => {
      const refs = {};
      return refs;
    },
    setSelectedDocument: (data: any) => {
      if (data.files) {
        setFile(data.files);
        fileRef.current = data.files;
      }
      setDocumentSelected(data);
    },
    resetUpload: () => {
      setFile([]);
      setSelected(0);
      setDocumentSelected(null);
    },
    closeDelay: (state: any) => {
      closeDelay(null, state);
    },
  }));

  return showModal ? (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "transparent",
          zIndex: "88",
        }}
        onClick={() => {
          setBlick(true);
          setTimeout(() => {
            setBlick(false);
          }, 250);
        }}
      ></div>
      <div
        style={{
          height: blick ? "90.1vh" : "90vh",
          width: blick ? "70.1%" : "70%",
          border: "1px solid #64748b",
          position: "absolute",
          top: "50%",
          left: "50%",
          bottom: "0",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          zIndex: handleDelayClose ? -100 : 9999,
          opacity: handleDelayClose ? 0 : 1,
          transition: "all 150ms",
          boxShadow: "3px 6px 32px -7px rgba(0,0,0,0.75)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#F1F1F1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            className="btn-check-exit-modal"
            style={{
              padding: "0 5px",
              borderRadius: "0px",
              background: "transparent",
              color: "black",
              height: "22px",
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 999,
              border: "none",
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (file.length > 0) {
                const state = {
                  id: documentSelected?.id,
                  label: documentSelected?.label,
                  document_id: documentSelected?.document_id,
                  required: documentSelected?.required,
                  files: file.map((itm: File) => {
                    return {
                      link: URL.createObjectURL(itm),
                      filename: itm.name,
                      document_id: documentSelected?.document_id,
                      reference: documentSelected?.reference,
                      id: documentSelected?.id,
                    };
                  }),
                };
                closeDelay(e, state);
                return;
              } else {
                const state = {
                  id: documentSelected?.id,
                  label: documentSelected?.label,
                  document_id: documentSelected?.document_id,
                  required: documentSelected?.required,
                  files: null,
                };

                closeDelay(e, state);
                return;
              }
            }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </button>
          <div
            style={{
              display: "flex",
              padding: "20px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px",
                flex: 1,
                border: "2px dashed #ccc",
              }}
            >
              <div
                className={`dropzone ${dragActive ? "active" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
                style={{
                  background: file.length > 0 ? "black" : "transparent",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <FolderCopyIcon
                    sx={{
                      fontSize: "22rem",
                      color: dragActive ? "#c3facf" : "#ebe8e8",
                    }}
                  />
                </div>
                {file.length > 0 && (
                  <img
                    src={URL.createObjectURL(file[selected])}
                    alt={file[selected].name}
                    style={{
                      position: "absolute",
                      width: "auto",
                      maxWidth: "100%",
                      height: "100%",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                )}
                {file.length > 1 && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected((i) => {
                          if (i <= 0) {
                            return file.length - 1;
                          }
                          return i - 1;
                        });
                      }}
                      sx={{
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      color="success"
                    >
                      <ArrowBackIosIcon
                        sx={{
                          fontSize: "3rem",
                          color: "white",
                          textAlign: "center",
                          marginLeft: "10px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected((i) => {
                          if (i >= file.length - 1) {
                            return 0;
                          }
                          return i + 1;
                        });
                      }}
                      color="success"
                    >
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "3rem", color: "white" }}
                      />
                    </IconButton>
                  </>
                )}
                <div className="dropzone-text-field">
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileSelect}
                  />
                  <p
                    className="placeholder-text"
                    style={{ color: file.length > 0 ? "white" : "#686161" }}
                  >
                    Drag & Drop a file here
                  </p>
                  <p
                    className="placeholder-text"
                    style={{ color: file.length > 0 ? "white" : "#686161" }}
                  >
                    or
                  </p>
                  <p
                    className="placeholder-text"
                    style={{ color: file.length > 0 ? "white" : "#686161" }}
                  >
                    Click to select
                  </p>
                  <div style={{ height: "20px" }}></div>
                </div>
                {file.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "15px",
                    }}
                  >
                    <p style={{ color: "white" }}>
                      {selected + 1} / {file.length} {file[selected].name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            disabled={file.length <= 0}
            color="primary"
            sx={{
              borderRadius: 0,
              width: "100%",
            }}
            variant="contained"
            onClick={(e: any) => {
              if (file.length <= 0) {
                return alert("No File Uploaded!");
              }
              if (file.length > 0) {
                const state = {
                  id: documentSelected?.id,
                  label: documentSelected?.label,
                  document_id: documentSelected?.document_id,
                  required: documentSelected?.required,
                  files: file.map((itm: File) => {
                    return {
                      link: URL.createObjectURL(itm),
                      filename: itm.name,
                      document_id: documentSelected?.document_id,
                      reference: documentSelected?.reference,
                      id: documentSelected?.id,
                    };
                  }),
                };
                handleOnSave(e, state);
                return;
              } else {
                const state = {
                  id: documentSelected?.id,
                  label: documentSelected?.label,
                  document_id: documentSelected?.document_id,
                  required: documentSelected?.required,
                  files: null,
                };

                handleOnSave(e, state);
                return;
              }
            }}
          >
            Save Upload
          </Button>
        </div>
        <style>
          {`
              .btn-check-exit-modal:hover{
                background:red !important;
                color:white !important;
              }
            `}
        </style>
      </div>
    </>
  ) : null;
});

export default UploadModal;
