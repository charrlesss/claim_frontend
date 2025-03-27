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
import BlockIcon from "@mui/icons-material/Block";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { DEPARTMENT } from "../Dashboard";
import { green } from "@mui/material/colors";
import { ModalDocument } from ".";
import UploadModal from "./UploadFile";

const BasicDocument = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Array<any>>([
    {
      id: 0,
      label: "Insurance Policy",
      files: null,
    },
    {
      id: 1,
      label: "Official Receipt of Premium Payment",
      files: null,
    },
    {
      id: 2,
      label: "Policy endorsement (if any)",
      files: null,
    },
    {
      id: 3,
      label: "Deed of Sale",
      files: null,
    },
    {
      id: 4,
      label: "OR CR",
      files: null,
    },
    {
      id: 5,
      label: "Police Report / Affidavit",
      files: null,
    },
    {
      id: 6,
      label: "Driver’s Statement to the Police (Salaysay)",
      files: null,
    },
    {
      id: 7,
      label: "Driver’s License and O.R",
      files: null,
    },
    {
      id: 8,
      label: "Stencils",
      files: null,
    },
    {
      id: 9,
      label: "Valid I.D",
      files: null,
    },
  ]);
  const [state, setState] = useState<any>(null);

  const addDocumentModalRef = useRef<any>(null);
  const uploadModalRef = useRef<any>(null);

  const onClickItem = async (event: any, data: any) => {
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

    uploadModalRef.current.showModal();
    uploadModalRef.current.setSelectedDocument(data);
  };
  const resetUpload = (itm: any, idx: number) => {
    const isConfirm = window.confirm(
      `Are you sure you want to reset this document? \n${itm.label}`
    );

    if (isConfirm) {
      setDocuments((prevData: any) =>
        prevData.map((doc: any) =>
          doc.id === itm.id ? { ...doc, files: null } : doc
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
  const handleAddDocument = () => {
    addDocumentModalRef.current.showModal();
  };

  const handleSaveBasicDocuments = () => {
    const encodedData = encodeURIComponent(
      JSON.stringify({ ...state, basicDocuments: JSON.stringify(documents) })
    );
    navigate(`/${DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${encodedData}`);
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
      <UploadModal
        ref={uploadModalRef}
        handleOnSave={(event: any, state: any) => {
          uploadModalRef.current.closeDelay(state);
        }}
        handleOnClose={(event: any, state: any) => {
          const newdocuments = documents.map((itm: any) => {
            if (itm.id === state.id) {
              itm = { ...itm, ...state };
            }
            return itm;
          });
          setDocuments(newdocuments);
          uploadModalRef.current.resetUpload();
        }}
      />
      <ModalDocument
        ref={addDocumentModalRef}
        handleOnSave={(event: any, label: any) => {
          setDocuments((docu: any) => [
            ...docu,
            {
              id: docu.length,
              label,
              files: null,
              others: true,
            },
          ]);

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
                    `/${DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${encodedData}`
                  );
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <span>
              Claim ID: {state?.claimId ? JSON.parse(state?.claimId) : ""}
            </span>
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
                Basic Requirement (For Assured)
              </p>

              <List>
                {documents.map((itm: any, idx: number) => {
                  return (
                    <ListItem
                      key={itm.id}
                      disablePadding
                      sx={{
                        backgroundColor: itm.files ? "#b9f6ca" : "",
                        position: "relative",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          cursor: "pointer",
                          width: "auto !important",
                          minWidth: "auto",
                        }}
                      >
                        <Tooltip title="Reset Upload">
                          <IconButton
                            disabled={itm.files === null}
                            color="primary"
                            onClick={() => {
                              resetUpload(itm, idx);
                            }}
                          >
                            <BlockIcon
                              color="primary"
                              sx={{ fontSize: "20px" }}
                            />
                          </IconButton>
                        </Tooltip>
                        {itm.others && (
                          <Tooltip title="Delete Row">
                            <IconButton
                              color="error"
                              onClick={() => {
                                deleteOthers(itm, idx);
                              }}
                            >
                              <DeleteForeverIcon
                                color="error"
                                sx={{ fontSize: "20px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </ListItemIcon>
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
                    </ListItem>
                  );
                })}
              </List>
            </nav>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "45px",
              right: "20px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 999,
            }}
            onClick={handleAddDocument}
          >
            <Tooltip title="Add Other Document">
              <IconButton
                aria-label="delete"
                size="large"
                sx={{
                  background: green[800],
                  ":hover": {
                    background: green[900],
                  },
                }}
              >
                <AddIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
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

export default BasicDocument;
