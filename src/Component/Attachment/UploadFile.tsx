import { Button, IconButton, Tooltip } from "@mui/material";
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
import { red } from "@mui/material/colors";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { TextInput } from "../UpwardFields";
import "../../Style/uploadfile.css";

const UploadModal = forwardRef(({ handleOnSave, handleOnClose }: any, ref) => {
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState<any>([]);
  const [remarks, setRemarks] = useState<Array<string>>([]);

  const [documentSelected, setDocumentSelected] = useState<{
    id: number;
    label: string;
    document_id: string;
    files: Array<File> | null;
    required: boolean;
    reference: string;
  } | null>(null);

  const remarksRef = useRef<HTMLInputElement>(null);
  const saveRemarkButtonRef = useRef<HTMLButtonElement>(null);

  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const fileRef = useRef([]);
  const remarksContainerRef = useRef([]);

  const [dragActive, setDragActive] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [handleDelayClose, setHandleDelayClose] = useState(false);
  const [blick, setBlick] = useState(false);

  const closeDelay = (e: any) => {
    setHandleDelayClose(true);
    setTimeout(() => {
      setShowModal(false);
      setHandleDelayClose(false);
      handleOnClose(e);
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

      const fileSelected = Array.from(e.dataTransfer.files);
      const newFiles = [...file, ...fileSelected];
      setFile(newFiles);

      const newRemarks = [
        ...remarks,
        ...new Array(fileSelected.length).fill(""),
      ];
      setRemarks(newRemarks);
      if (remarksRef.current) {
        remarksRef.current.value = newRemarks[0];
      }
    }
  };
  const handleFileSelect = (e: any) => {
    if (e.target.files.length > 0) {
      setSelected(0);
      const fileSelected = Array.from(e.target.files);
      const newFiles = [...file, ...fileSelected];
      setFile(newFiles);
      const newRemarks = [
        ...remarks,
        ...new Array(fileSelected.length).fill(""),
      ];
      setRemarks(newRemarks);

      if (remarksRef.current) {
        remarksRef.current.value = newRemarks[0];
      }
    }
  };
  const handleRemoveImage = () => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${file[selected].name}`
    );
    if (confirm) {
      if (file.length === 1) {
        setFile([]);
        setSelected(0);
        setRemarks([]);
      } else {
        const newFile = file.filter(
          (item: any, index: number) => index !== selected
        );
        setFile(newFile);

        const newRemarks = remarks.filter(
          (item: any, index: number) => index !== selected
        );
        setRemarks(newRemarks);

        if (remarksRef.current) {
          remarksRef.current.value = newRemarks[selected];
        }
        if (selected > newFile.length - 1) {
          setSelected(selected - 1);
          if (remarksRef.current) {
            remarksRef.current.value = newRemarks[selected - 1];
          }
        }
      }
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
        setRemarks(data.remarks);
        fileRef.current = data.files;
        remarksContainerRef.current = data.remarks;
        localStorage.setItem("remark-container", JSON.stringify(data.remarks));
      }
      setDocumentSelected(data);
    },
    resetUpload: () => {
      setFile([]);
      setSelected(0);
      setDocumentSelected(null);
      fileRef.current = [];
      setRemarks([]);
    },
    getPrevFile: () => {
      return fileRef.current;
    },
    closeDelay,
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
          zIndex: "2133",
        }}
        onClick={() => {
          setBlick(true);
          setTimeout(() => {
            setBlick(false);
          }, 250);
        }}
      ></div>
      <div
        className="uplaod-container"
        style={{
          height: blick ? "96vh" : "95vh",
          width: blick ? "80.1%" : "80%",
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
          <div
            style={{
              position: "absolute",
              bottom: "75px",
              right: "10px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 213123123,
            }}
            onClick={handleRemoveImage}
          >
            <Tooltip title="delete Image" sx={{ zIndex: "123213 !important" }}>
              <IconButton
                disabled={file.length <= 0}
                aria-label="delete"
                size="large"
                sx={{
                  background: red[800],
                  ":hover": {
                    background: red[900],
                  },
                }}
              >
                <RestoreFromTrashIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
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
              const remarksString =
                localStorage.getItem("remark-container") || "[]";
              const data = JSON.parse(remarksString);
              const state = {
                id: documentSelected?.id,
                label: documentSelected?.label,
                document_id: documentSelected?.document_id,
                required: documentSelected?.required,
                files: fileRef.current.map((itm: File) => {
                  return {
                    link: URL.createObjectURL(itm),
                    filename: itm.name,
                    document_id: documentSelected?.document_id,
                    reference: documentSelected?.reference,
                    id: documentSelected?.id,
                  };
                }),
                remarks: data,
              };
              handleOnClose(e, state);
            }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </button>
          <div
            className="content"
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
                    className="folder-icon"
                    sx={{
                      fontSize: "22rem",
                      color: dragActive ? "#c3facf" : "#ebe8e8",
                    }}
                  />
                </div>
                {file.length > 0 && (
                  <img
                    loading="lazy"
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
                      ref={prevRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        let newSelected = 0;

                        if (selected <= 0) {
                          newSelected = file.length - 1;
                        } else {
                          newSelected = selected - 1;
                        }
                        if (remarksRef.current) {
                          remarks[selected] = remarksRef.current.value;
                          remarksRef.current.value = remarks[newSelected];
                        }
                        setSelected(newSelected);
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
                          color: "green",
                          textAlign: "center",
                          marginLeft: "10px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      ref={nextRef}
                      sx={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        let newSelected = 0;

                        if (selected >= file.length - 1) {
                          newSelected = 0;
                        } else {
                          newSelected = selected + 1;
                        }

                        if (remarksRef.current) {
                          remarks[selected] = remarksRef.current.value;
                          remarksRef.current.value = remarks[newSelected];
                        }
                        setSelected(newSelected);
                      }}
                      color="success"
                    >
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "3rem", color: "green" }}
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
              </div>
            </div>
          </div>
          {file.length > 0 && (
            <div
              style={{
                position: "absolute",
                left: "15px",
                margin: 0,
                fontSize: "12px",
                height: "15px",
              }}
            >
              <p style={{ color: "black", padding: 0, margin: 0 }}>
                {selected + 1} / {file.length} {file[selected].name}
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "0px 20px",
              boxSizing: "border-box",
            }}
          >
            <TextInput
              containerStyle={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                rowGap: "5px",
                marginBottom: "5px",
              }}
              label={{
                title: "",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  flex: 1,
                  display: "none",
                },
              }}
              input={{
                disabled: file.length <= 0,
                type: "text",
                style: {
                  width: "calc(100% - 10px)",
                  height: "25px ",
                  borderRadius: "0px",
                },
                defaultValue: remarks[selected],
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === "NumpadEnter") {
                    e.preventDefault();
                    saveRemarkButtonRef.current?.click();
                  }
                },
              }}
              inputRef={remarksRef}
              offValidation={true}
            />
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
                const newRemarkList = [...remarks];

                if (remarksRef.current) {
                  newRemarkList[selected] = remarksRef.current.value;
                }

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
                  remarks: newRemarkList,
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
                  remarks: [],
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

export const ZoomModal = forwardRef(({ handleOnClose }: any, ref) => {
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState<any>([]);
  const [remarks, setRemarks] = useState<any>([]);

  const [documentSelected, setDocumentSelected] = useState<{
    id: number;
    label: string;
    document_id: string;
    files: Array<File> | null;
    required: boolean;
    reference: string;
  } | null>(null);

  const fileRef = useRef([]);

  const [showModal, setShowModal] = useState(false);
  const [handleDelayClose, setHandleDelayClose] = useState(false);

  const [scale, setScale] = useState(1); // Zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const imgRef = useRef(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const MOVE_SPEED = 10; // Movement speed for arrow keys

  const handleWheelZoom = (e: any) => {
    e.preventDefault();
    setScale((prevScale) => {
      let newScale = prevScale + (e.deltaY < 0 ? 0.1 : -0.1);
      return Math.min(Math.max(newScale, MIN_ZOOM), MAX_ZOOM);
    });
  };
  // Handle arrow key movement
  const handleKeyDown = (e: any) => {
    if (scale === 1) return; // No movement when not zoomed in

    setPosition((prevPos) => {
      switch (e.key) {
        case "ArrowUp":
          return { ...prevPos, y: prevPos.y + MOVE_SPEED };
        case "ArrowDown":
          return { ...prevPos, y: prevPos.y - MOVE_SPEED };
        case "ArrowLeft":
          return { ...prevPos, x: prevPos.x + MOVE_SPEED };
        case "ArrowRight":
          return { ...prevPos, x: prevPos.x - MOVE_SPEED };
        default:
          return prevPos;
      }
    });
  };

  // Listen for keyboard events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scale]);

  const closeDelay = (e: any, state: any) => {
    setSelected(0);
    setFile([]);
    setDocumentSelected(null);
    setPosition({ x: 0, y: 0 });
    setScale(1);

    handleOnClose(documentSelected);
    setHandleDelayClose(true);
    setTimeout(() => {
      setShowModal(false);
      setHandleDelayClose(false);
    }, 100);
  };

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
        setRemarks(data.remarks);
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
      ></div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          border: "none",
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
          boxShadow: "none",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#F1F1F1",
            display: "flex",
            flexDirection: "row",
            position: "relative",
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
          <div className="zoom-container" onWheel={handleWheelZoom}>
            {file.length > 0 && (
              <img
                ref={imgRef}
                src={URL.createObjectURL(file[selected])}
                alt={file[selected].name}
                className="zoom-image"
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  cursor: scale > 1 ? "grab" : "zoom-in",
                  width: "auto",
                  height: "100%",
                }}
              />
            )}
            <div
              style={{
                height: "30px",
                position: "absolute",
                background: "#F1F1F1",
                padding: "5px 10px",
                top: "5px",
                left: "5px",
              }}
            >
              <span>{remarks[selected]}</span>
            </div>
          </div>
          {file.length > 1 && (
            <>
              <IconButton
                onClick={(e) => {
                  setPosition({ x: 0, y: 0 });
                  setScale(1);
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
                    color: "black",
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
                  setPosition({ x: 0, y: 0 });
                  setScale(1);
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
                  sx={{ fontSize: "3rem", color: "black" }}
                />
              </IconButton>
            </>
          )}
        </div>

        <style>
          {`
          .zoom-container {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            width: 100%;
            height: 100vh; /* Full-screen view */
            background-color: #f8f8f8;
            flex-direction:column;
          }

          .zoom-image {
            transition: transform 0.2s ease-in-out;
            max-width: 100%;
            height: auto;
            user-select: none; /* Prevent text selection while dragging */
          }

            `}
        </style>
      </div>
    </>
  ) : null;
});

export default UploadModal;
