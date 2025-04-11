import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { DEPARTMENT } from "./Dashboard";

import UploadModal, { ZoomModal } from "./Attachment/UploadFile";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import CropFreeIcon from "@mui/icons-material/CropFree";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "../Style/attachment.css";
import PageHelmet from "./PageHelmet";
import { Loading } from "./Loading";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ModalDocument } from "./Attachment";

const ReimbursementBasicDocument = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [state, setState] = useState<any>(null);

  const addDocumentModalRef = useRef<any>(null);
  const uploadModalRef = useRef<any>(null);
  const zoomModalRef = useRef<any>(null);

  const onClickItem = async (event: any, data: any) => {
    const urlToFile = async (url: any, fileName: any) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName, { type: "image/png" });
    };
    setLoading(true);

    try {
      if (data.files && data.files.length > 0) {
        const filePromises = data.files.map((url: any, index: any) => {
          return urlToFile(url.link, url.filename);
        });

        const fileArray = await Promise.all(filePromises);
        data.files = fileArray;
      }
      setLoading(false);

      uploadModalRef.current.showModal();
      uploadModalRef.current.setSelectedDocument(data);
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      // End loading after the process is done
      setLoading(false);
    }
  };
  const resetUpload = (itm: any, idx: number) => {
    const isConfirm = window.confirm(
      `Are you sure you want to reset this document? \n${itm.label}`
    );

    if (isConfirm) {
      setDocuments((prevData: any) =>
        prevData.map((doc: any) =>
          doc.id === itm.id ? { ...doc, files: null, remarks: [] } : doc
        )
      );
    }
  };
  const deleteOthers = (itm: any, idx: number) => {
    const isConfirm = window.confirm(
      `Are you sure you want to reset this document? \n${itm.label}`
    );

    if (isConfirm) {
      setDocuments((prevData: any) =>
        prevData.filter((doc: any) => doc.id !== itm.id)
      );
    }
  };
  const renameOthers = (itm: any, idx: number) => {
    addDocumentModalRef.current.showOnUpdateModal(itm.label, idx);
  };
  const handleAddDocument = () => {
    addDocumentModalRef.current.showModal();
  };
  const handleSaveBasicDocuments = () => {
    const encodedData = encodeURIComponent(
      JSON.stringify({ ...state, basicDocuments: JSON.stringify(documents) })
    );
    navigate(
      `/${DEPARTMENT}/dashboard/reimbursement?Mkr44Rt2iuy13R=${encodedData}`
    );
  };
  const printDocument = (itm: any) => {
    const image = itm.files;

    const newWindow = window.open();
    if (newWindow) {
      let printContent = "";
      image.forEach((file: any, idx: number) => {
        printContent += `
          <div class="page">
            <img src="${file.link}" alt="image-${idx + 1}"  />
          </div>`;
      });

      newWindow.document.open();
      newWindow.document.write(`
          <html>
          <head>
            <title>Print Images</title>
            <style>
          @page { 
              size: A4 portrait; 
              margin: 0; 
            }
            body { margin: 0; padding: 0; }
            .page { 
              width: 100vw; 
              height: 100vh; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              overflow: hidden;
              page-break-after: always;
            }
            img { 
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            </style>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
          </html>
        `);
      newWindow.document.close();
    }
  };
  const downloadDocument = async (itm: any) => {
    const images = itm.files;
    if (images.length > 1) {
      const zip = new JSZip();
      const folder = zip.folder("images");

      // Fetch each image and add to zip
      const fetchAndAddToZip = async (url: string, index: number) => {
        const response = await fetch(url);
        const blob = await response.blob();
        folder?.file(`image${index + 1}.jpg`, blob);
      };

      await Promise.all(
        images.map((file: any, index: number) =>
          fetchAndAddToZip(file.link, index)
        )
      );

      // Generate zip and trigger download
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "images.zip");
      });
    } else {
      const response = await fetch(images[0].link);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  const zoomDocument = async (data: any) => {
    const urlToFile = async (url: any, fileName: any) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName, { type: "image/png" });
    };

    if (data.files && data.files.length > 0) {
      const filePromises = data.files.map((url: any, index: any) => {
        return urlToFile(url.link, url.filename);
      });

      const fileArray = await Promise.all(filePromises);
      data.files = fileArray;
    }

    zoomModalRef.current.showModal();
    zoomModalRef.current.setSelectedDocument(data);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dataParam = queryParams.get("Mkr44Rt2iuy13R");
    if (dataParam) {
      const state = JSON.parse(decodeURIComponent(dataParam));
      const basicDocuments = JSON.parse(state.basicDocuments);
      if (basicDocuments.length > 0) {
        setDocuments(basicDocuments);
      }
      setState(state);
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      <PageHelmet title="Basic Documents" />
      <ZoomModal
        ref={zoomModalRef}
        handleOnClose={(state: any) => {
          if (state) {
            setDocuments((itm: any) => {
              const newItm = itm.map((__file: any) => {
                if (state.id === __file.id) {
                  __file.files = __file.files.map((file: File) => {
                    return {
                      filename: file.name,
                      link: URL.createObjectURL(file),
                    };
                  });
                }
                return __file;
              });
              return newItm;
            });
          }
        }}
      />
      <UploadModal
        ref={uploadModalRef}
        handleOnSave={(event: any, state: any) => {
          if (state) {
            const newdocuments = documents.map((itm: any) => {
              if (itm.id === state.id) {
                itm = { ...itm, ...state };
              }
              return itm;
            });
            setDocuments(newdocuments);
            uploadModalRef.current.resetUpload();
            uploadModalRef.current.clsoeModal();
          }
        }}
        handleOnClose={(event: any, state: any) => {
          if (state) {
            if (state.files && state.files.length <= 0) {
              state.files = null;
            }
            const newdocuments = documents.map((itm: any) => {
              if (itm.id === state.id) {
                itm = { ...itm, ...state };
              }
              return itm;
            });
            setDocuments(newdocuments);
            uploadModalRef.current.resetUpload();
            uploadModalRef.current.clsoeModal();
          }
        }}
      />
      <ModalDocument
        ref={addDocumentModalRef}
        handleOnSave={(event: any, label: any, selected: any) => {
          if (selected !== null) {
            const docu = [...documents];
            docu[selected].label = label;
            setDocuments(docu);
          } else {
            setDocuments((docu: any) => [
              ...docu,
              {
                id: docu.length,
                label,
                files: null,
                others: true,
                remarks: [],
              },
            ]);
          }

          addDocumentModalRef.current.clsoeModal();
        }}
        handleOnClose={(event: any, state: any) => {}}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          className="basic-document-content"
          style={{
            width: "40%",
            border: "1px solid #ebeef2",
            height: "100vh",
            position: "relative",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "40px",
              borderBottom: "1px solid #ebeef2",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ffc107",
            }}
          >
            <Tooltip title="Back to Dashboard">
              <IconButton
                sx={{
                  position: "absolute",
                  left: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => {
                  const encodedData = encodeURIComponent(JSON.stringify(state));
                  navigate(
                    `/${DEPARTMENT}/dashboard/reimbursement?Mkr44Rt2iuy13R=${encodedData}`
                  );
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <span>
              Claim ID: {state?.claimId ? JSON.parse(state?.claimId) : ""}
            </span>
            <Tooltip title="Add Other Document">
              <IconButton
                aria-label="delete"
                size="large"
                sx={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={handleAddDocument}
              >
                <ControlPointIcon sx={{ color: "#696966" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            style={{
              flex: 1,
              height: "100%",
              position: "relative",
              width: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <nav
              aria-label="main mailbox folders"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                marginBottom: "50px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  padding: "5px 10px",
                }}
              >
                Documents
              </p>

              <List>
                {documents.map((itm: any, idx: number) => {
                  return (
                    <HandleListHover
                      key={idx}
                      itm={itm}
                      idx={idx}
                      onClickItem={onClickItem}
                      deleteOthers={deleteOthers}
                      resetUpload={resetUpload}
                      printDocument={printDocument}
                      downloadDocument={downloadDocument}
                      zoomDocument={zoomDocument}
                      renameOthers={renameOthers}
                    />
                  );
                })}
              </List>
            </nav>
          </div>

          <Button
            onClick={handleSaveBasicDocuments}
            sx={{
              borderRadius: 0,
              height: "40px",
            }}
            variant="contained"
            color="success"
          >
            SAVE BASIC DOCUMENTS
          </Button>
        </div>
      </div>
    </>
  );
};

// <div
// style={{
//   position: "absolute",
//   bottom: "45px",
//   right: "20px",
//   width: "50px",
//   height: "50px",
//   borderRadius: "50%",
//   cursor: "pointer",
//   zIndex: 999,
// }}
// onClick={handleAddDocument}
// >
// <Tooltip title="Add Other Document">
//   <IconButton
//     aria-label="delete"
//     size="large"
//     sx={{
//       background: green[800],
//       ":hover": {
//         background: green[900],
//       },
//     }}
//   >
//     <AddIcon sx={{ color: "white" }} />
//   </IconButton>
// </Tooltip>
// </div>
export const HandleListHover = ({
  itm,
  idx,
  onClickItem,
  deleteOthers,
  resetUpload,
  printDocument,
  downloadDocument,
  zoomDocument,
  renameOthers,
}: any) => {
  const [hover, setHover] = useState(false);
  return (
    <ListItem
      disablePadding
      sx={{
        backgroundColor: itm.files ? "#e7e5e4" : "",
        position: "relative",
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ListItemIcon
        sx={{
          cursor: "pointer",
          width: "auto !important",
          minWidth: "auto",
        }}
      ></ListItemIcon>
      <Tooltip title="Upload Document">
        <ListItemButton onClick={(e) => onClickItem(e, itm)}>
          <ListItemText
            primaryTypographyProps={{ fontSize: "12px" }}
            primary={`${idx + 1}.   ${itm.label}`}
          />
          {itm.required &&
            !itm.files && ( // Show error only if required and no file uploaded
              <ErrorOutlineIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "error.main",
                }}
              />
            )}
        </ListItemButton>
      </Tooltip>
      {hover && itm.others && (
        <Tooltip title="Rename Row">
          <IconButton
            color="secondary"
            onClick={() => {
              renameOthers(itm, idx);
            }}
          >
            <DriveFileRenameOutlineIcon
              color="secondary"
              sx={{ fontSize: "20px" }}
            />
          </IconButton>
        </Tooltip>
      )}
      {hover && itm.files && itm.files.length > 0 && (
        <Tooltip title="Zoom">
          <IconButton
            color="primary"
            onClick={() => {
              zoomDocument(itm, idx);
            }}
          >
            <CropFreeIcon color="primary" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
      {hover && itm.files && itm.files.length > 0 && (
        <Tooltip title="Donwload">
          <IconButton
            color="primary"
            onClick={() => {
              downloadDocument(itm, idx);
            }}
          >
            <DownloadIcon color="primary" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
      {hover && itm.files && itm.files.length > 0 && (
        <Tooltip title="Print">
          <IconButton
            color="primary"
            onClick={() => {
              printDocument(itm, idx);
            }}
          >
            <PrintIcon color="primary" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
      {hover && itm.files && itm.files.length > 0 && (
        <Tooltip title="Reset Upload">
          <IconButton
            color="primary"
            onClick={() => {
              resetUpload(itm, idx);
            }}
          >
            <RotateLeftIcon color="primary" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
      {hover && itm.others && (
        <Tooltip title="Delete Row">
          <IconButton
            color="error"
            onClick={() => {
              deleteOthers(itm, idx);
            }}
          >
            <DeleteForeverIcon color="error" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
    </ListItem>
  );
};

export default ReimbursementBasicDocument;
