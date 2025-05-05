import "../../Style/attachment.css";
import {
  useRef,
  useId,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { format } from "date-fns";
import {
  SelectInput,
  TextAreaInput,
  TextFormatedInput,
  TextInput,
} from "../UpwardFields";
import { useState } from "react";
import { Loading } from "../Loading";
import { Button, IconButton, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import "../../Style/DragDropFileUpload.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import UploadModal, { ZoomModal } from "./UploadFile";
import { DEPARTMENT } from "../Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { HandleListHover } from "./BasicDocument";
import PageHelmet from "../PageHelmet";
import { wait } from "../../Lib/wait";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const __CONFIGURATION = [
  {
    documents: [
      {
        id: 10,
        label: "Repair Estimate",
        files: null,
        document_id: "0001",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Picture of Damage",
        files: null,
        document_id: "0001",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0001",
  },
  {
    documents: [
      {
        id: 10,
        label: "Complaint Sheet",
        files: null,
        document_id: "0002",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Alarm Sheet",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Original Sheet",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 13,
        label: "Certificate of No Recovery",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0002",
  },
  {
    documents: [
      {
        id: 10,
        label: "Brgy, Certificate",
        files: null,
        document_id: "0003",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Stencils",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Repair Estimate",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 13,
        label: "Picture of Damage",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0003",
  },
  {
    documents: [
      {
        id: 10,
        label: "Medical Cert",
        files: null,
        document_id: "0004",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "PSA birth certificate",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 13,
        label: "Valid ID",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 14,
        label: "Proof of settlement",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 15,
        label: "PSA Death certificate",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 16,
        label: "Funeral and burial OR",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0004",
  },
  {
    documents: [
      {
        id: 10,
        label: "OR CR",
        files: null,
        document_id: "0005",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Driver’s license and OR",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Driver’s Statement to the Police (Salaysay)",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 13,
        label: "Pictures  Damages",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 14,
        label: "Repair Estimate",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 15,
        label: "Certificate of No Claim",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0005",
  },
  {
    documents: [
      {
        id: 10,
        label: "Medical Cert",
        files: null,
        document_id: "0006",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0006",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Valid ID",
        files: null,
        document_id: "0006",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0006",
  },
  {
    documents: [
      {
        id: 8,
        label: "Medical certificate ",
        files: null,
        document_id: "0007",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 9,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 10,
        label: "PSA birth certificate",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "Valid ID",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Proof of settlement",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0007",
  },
  {
    documents: [
      {
        id: 8,
        label: " PSA Death certificate ",
        files: null,
        document_id: "0008",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 9,
        label: "Funeral and burial OR",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 10,
        label: "PSA certificate of live birth",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 11,
        label: "PSA marriage certificate",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 12,
        label: "Valid ID ",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 13,
        label: "Proof of settlement ",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "0008",
  },
  {
    documents: [
      {
        id: 3,
        label: "Medical Certificate",
        files: null,
        document_id: "00021",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 4,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 5,
        label: "Laboratory Results",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 6,
        label: "Valid ID",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "00021",
  },
  {
    documents: [
      {
        id: 3,
        label: "PSA Death certificate ",
        files: null,
        document_id: "00021",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 4,
        label: "Funeral and burial OR",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 5,
        label: "PSA Birt Certicate",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 6,
        label: "PSA marriage certificate",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 7,
        label: "Heir's Valid ID",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "00021",
  },
  {
    documents: [
      {
        id: 3,
        label: "Valid ID of Assured",
        files: null,
        document_id: "00021",
        required: false,
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 4,
        label: "Picture of Damage Luggage",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 5,
        label: "Affidavit of Incident",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 6,
        label: "Estimate",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
      {
        id: 7,
        label: "Property Iregularity Report",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
        remarks: [],
      },
    ],
    id: "00028",
  },
];

function Attactment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addDocumentModalRef = useRef<any>(null);
  const approvedDateModalRef = useRef<any>(null);
  const zoomModalRef = useRef<any>(null);

  const [contentShow, setContentShow] = useState("Fields");

  const uploadModalRef = useRef<any>(null);
  const [configuration, setConfiguration] = useState<any>(null);
  const [selected, setSelected] = useState("Ongoing");
  const [dataPreview, setDataPreview] = useState<any>(null);
  const [dateApproved, setDateApproved] = useState("");

  const dateReportRef = useRef<HTMLInputElement>(null);
  const dateAccidentRef = useRef<HTMLInputElement>(null);
  const claimStatus = useRef<HTMLSelectElement>(null);
  const dateReceivedDocumentsRef = useRef<HTMLInputElement>(null);
  const amountClaimRef = useRef<HTMLInputElement>(null);
  const amountApprovedRef = useRef<HTMLInputElement>(null);
  const amountParticipationRef = useRef<HTMLInputElement>(null);
  const amountNetAmountRef = useRef<HTMLInputElement>(null);
  const nameOfTTPDRef = useRef<HTMLTextAreaElement>(null);
  const remarksRef = useRef<HTMLTextAreaElement>(null);
  const ongoingRef = useRef<HTMLInputElement>(null);
  const deniedRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLInputElement>(null);
  const approvedSettledRef = useRef<HTMLInputElement>(null);

  const handleCheck = (id: any) => {
    setSelected(id); // Set the selected checkbox and uncheck others
  };

  const onClickItem = async (event: any, data: any) => {
    const urlToFile = async (url: any, fileName: any) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName, { type: "image/png" });
    };

    // Start loading
    setLoading(true);

    try {
      if (data.files && data.files.length > 0) {
        const filePromises = data.files.map((url: any, index: any) => {
          return urlToFile(url.link, url.filename);
        });

        const fileArray = await Promise.all(filePromises);

        // Assign converted files back to data
        data.files = fileArray;
      }

      data.reference = configuration.reference;
      setLoading(false);

      // Show modal after files are processed
      uploadModalRef.current.showModal();
      uploadModalRef.current.setSelectedDocument(data);
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      // End loading after the process is done
      setLoading(false);
    }
  };

  const handleAddDocument = () => {
    addDocumentModalRef.current.showModal();
  };

  const resetUpload = (itm: any, index: number) => {
    const isConfirm = window.confirm(
      `Are you sure you want to reset this document? \n${itm.label}`
    );

    if (isConfirm) {
      setConfiguration((prevData: any) => ({
        ...prevData,
        documents: prevData.documents.map((doc: any) =>
          doc.id === itm.id ? { ...doc, files: null, remarks: [] } : doc
        ),
      }));
    }
  };
  const deleteOthers = (itm: any, index: number) => {
    const isConfirm = window.confirm(
      `Are you sure you want to reset this document? \n${itm.label}`
    );

    if (isConfirm) {
      setConfiguration((prevData: any) => ({
        ...prevData,
        documents: prevData.documents.filter((doc: any) => doc.id !== itm.id),
      }));
    }
  };
  const renameOthers = (itm: any, idx: number) => {
    addDocumentModalRef.current.showOnUpdateModal(itm.label, idx);
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
      const state = JSON.parse(decodeURIComponent(dataParam)).state;
      setDataPreview(JSON.parse(decodeURIComponent(dataParam)).dataPreview);
      const config = __CONFIGURATION.filter((itm) => itm.id === state.id);
      setConfiguration({
        ...state,
        id: config[0].id,
        documents: config[0].documents,
      });
    }
  }, [setDataPreview]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Push initial state
    blockNavigation();

    // Listen for back/forward navigation
    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);

  useEffect(() => {
    if (dateApproved !== "" && selected !== "Approved") {
      const comfirm = window.confirm(
        "Are your sure you want to change the Status?\nThe Approved date will be delete"
      );
      if (comfirm) {
        setDateApproved("");
      } else {
        setSelected("Approved");
      }
    }
  }, [selected]);

  if (!configuration) {
    return <div>Wag Kang susubok masisira ang buhay mo!!!</div>;
  }

  return (
    <>
      {loading && <Loading />}
      <PageHelmet title={configuration.claimType} />

      <ZoomModal
        ref={zoomModalRef}
        handleOnClose={(state: any) => {
          if (state) {
            const newConfigDocuments = configuration.documents.map(
              (itm: any) => {
                if (itm.id === state.id) {
                  state.files = state.files.map((file: File) => {
                    return {
                      filename: file.name,
                      link: URL.createObjectURL(file),
                    };
                  });

                  itm = {
                    ...itm,
                    ...state,
                    reference: configuration.reference,
                  };
                }
                return itm;
              }
            );
            setConfiguration({
              ...configuration,
              documents: newConfigDocuments,
            });
          }
        }}
      />
      <UploadModal
        ref={uploadModalRef}
        handleOnSave={(event: any, state: any) => {
          if (state) {
            const newConfigDocuments = configuration.documents.map(
              (itm: any) => {
                if (itm.id === state.id) {
                  itm = {
                    ...itm,
                    ...state,
                    reference: configuration.reference,
                  };
                }
                return itm;
              }
            );
            setConfiguration({
              ...configuration,
              documents: newConfigDocuments,
            });
            uploadModalRef.current.resetUpload();
            uploadModalRef.current.clsoeModal();
          }
        }}
        handleOnClose={(event: any, state: any) => {
          if (state.files && state.files.length <= 0) {
            state.files = null;
          }
          const newConfigDocuments = configuration.documents.map((itm: any) => {
            if (itm.id === state.id) {
              itm = {
                ...itm,
                ...state,
                reference: configuration.reference,
              };
            }
            return itm;
          });
          setConfiguration({
            ...configuration,
            documents: newConfigDocuments,
          });
          uploadModalRef.current.resetUpload();
          uploadModalRef.current.clsoeModal();
        }}
      />
      <ModalDocument
        ref={addDocumentModalRef}
        handleOnSave={(event: any, label: any, selected: any) => {
          if (selected !== null) {
            const newDocuments = configuration.documents;
            const assuredDocuments = newDocuments.filter(
              (itm: any) => itm.primaryDocuments
            );
            const getOtherSelectedDocument = newDocuments.filter(
              (itm: any) => itm.others
            );
            getOtherSelectedDocument[selected].label = label;
            const newConfiguration = {
              ...configuration,
              documents: [...assuredDocuments, ...getOtherSelectedDocument],
            };
            setConfiguration(newConfiguration);
          } else {
            const newDocuments = configuration.documents;
            const lastDocument = newDocuments[newDocuments.length - 1];

            newDocuments.push({
              id: lastDocument.id + 1,
              label,
              files: null,
              document_id: lastDocument.document_id,
              others: true,
              primaryDocuments: false,
              remarks: [],
            });

            const newConfiguration = {
              ...configuration,
              documents: newDocuments,
            };

            setConfiguration(newConfiguration);
          }
          addDocumentModalRef.current.closeDelay();
        }}
        handleOnClose={(event: any, state: any) => {}}
      />
      <ModalAddapproveDate
        ref={approvedDateModalRef}
        handleOnSave={(event: any, approvedDate: any) => {
          setDateApproved(approvedDate);
          approvedDateModalRef.current.clsoeModal();
        }}
        handleOnClose={(event: any, state: any) => {
          if (dateApproved === "") {
            setSelected("Ongoing");
          }
        }}
      />
      <div
        className="container-attachment"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "50px",
              background: "#ffc107",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              color: "#9e5f03",
              position: "relative",
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
                  const encodedData = encodeURIComponent(
                    JSON.stringify(dataPreview)
                  );
                  navigate(
                    `/${DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${encodedData}`
                  );
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>

            <span className="claim-title-text">{configuration.claimType}</span>
            <div
              className={`documents-other ${
                contentShow === "Documents" ? "active" : ""
              }`}
            >
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
          </div>
          <div className="mobile-button">
            <Button
              onClick={() => {
                setContentShow("Fields");
              }}
              sx={{
                flex: 1,
                borderRadius: 0,
                boxShadow: "none",
              }}
              color={contentShow === "Fields" ? "primary" : "info"}
              variant="contained"
            >
              Fields
            </Button>
            <Button
              onClick={() => {
                setContentShow("Documents");
              }}
              sx={{
                flex: 1,
                borderRadius: 0,
                boxShadow: "none",
              }}
              color={contentShow === "Documents" ? "primary" : "info"}
              variant="contained"
            >
              Documents
            </Button>
          </div>
          <div
            className="content-details"
            style={{
              flex: "1",
              display: "flex",
              position: "relative",
            }}
          >
            <div
              className={`fields ${contentShow === "Fields" ? "active" : ""}`}
              style={{
                flex: "1",
                display: "flex",
                position: "relative",
                flexDirection: "column",
                overflow: "auto",
                height: "100%",
                borderRight: "1px solid #d1d5db",
                borderLeft: "1px solid #d1d5db",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  height: "auto",
                  display: "grid",
                  columnGap: "15px",
                  rowGap: "7px",
                  padding: "20px 10px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    REF#:{" "}
                    <span style={{ color: "green", marginLeft: "10px" }}>
                      {configuration.reference}
                    </span>
                  </span>
                  {dateApproved !== "" && (
                    <span>
                      Date Approved:{" "}
                      <span style={{ color: "green", marginLeft: "10px" }}>
                        {format(new Date(dateApproved), "MM/dd/yyyy")}
                      </span>
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    columnGap: "5px",
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
                    }}
                    label={{
                      title: "Date Report : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        flex: 1,
                      },
                    }}
                    input={{
                      type: "date",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      defaultValue: "",
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === "NumpadEnter") {
                          e.preventDefault();
                          amountClaimRef.current?.focus();

                          // searchCollectionCreditOpenModal(e.currentTarget.value);
                        }
                      },
                    }}
                    inputRef={dateReportRef}
                    offValidation={true}
                  />
                  <TextInput
                    containerStyle={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Date Accident : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        flex: 1,
                      },
                    }}
                    input={{
                      type: "date",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      defaultValue: format(new Date(), "yyyy-MM-dd"),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === "NumpadEnter") {
                          e.preventDefault();
                          amountClaimRef.current?.focus();

                          // searchCollectionCreditOpenModal(e.currentTarget.value);
                        }
                      },
                    }}
                    inputRef={dateAccidentRef}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    columnGap: "5px",
                  }}
                >
                  <SelectInput
                    containerStyle={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                      flex: 1,
                    }}
                    label={{
                      title: "Status : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "60px",
                      },
                    }}
                    selectRef={claimStatus}
                    select={{
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px",
                        borderRadius: "5px",
                      },
                      defaultValue: "",
                      onKeyDown: (e) => {
                        if (e.code === "NumpadEnter" || e.code === "Enter") {
                          e.preventDefault();
                          dateReceivedDocumentsRef.current?.focus();
                        }
                      },
                    }}
                    datasource={[
                      { key: "" },
                      { key: "For Review" },
                      { key: "For Evaluation " },
                      { key: "For Loa" },
                      { key: "For Billing" },
                      { key: "For Check Prep" },
                      { key: "ON HOLD" },
                      { key: "With Lacking Docs" },
                    ]}
                    values={"key"}
                    display={"key"}
                  />
                  <TextInput
                    containerStyle={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Date Received : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        flex: 1,
                      },
                    }}
                    input={{
                      type: "date",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      onFocus: (e) => e.target.blur(),
                      defaultValue: "",
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === "NumpadEnter") {
                          e.preventDefault();
                          amountClaimRef.current?.focus();

                          // searchCollectionCreditOpenModal(e.currentTarget.value);
                        }
                      },
                    }}
                    inputRef={dateReceivedDocumentsRef}
                    offValidation={true}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    columnGap: "5px",
                  }}
                >
                  <TextFormatedInput
                    containerStyle={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Amount of Claim : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "100%",
                      },
                    }}
                    input={{
                      type: "text",
                      defaultValue: "0.00",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      onKeyDown: (e) => {
                        if (e.code === "NumpadEnter" || e.code === "Enter") {
                          amountApprovedRef.current?.focus();
                        }
                      },
                    }}
                    inputRef={amountClaimRef}
                  />
                  <TextFormatedInput
                    containerStyle={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Amount Approved : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "100%",
                      },
                    }}
                    input={{
                      type: "text",
                      defaultValue: "0.00",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      onKeyDown: (e) => {
                        if (e.code === "NumpadEnter" || e.code === "Enter") {
                          amountParticipationRef.current?.focus();
                        }
                      },
                    }}
                    inputRef={amountApprovedRef}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    columnGap: "5px",
                  }}
                >
                  <TextFormatedInput
                    containerStyle={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Participation : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "100%",
                      },
                    }}
                    input={{
                      type: "text",
                      defaultValue: "0.00",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      onKeyDown: (e) => {
                        if (e.code === "NumpadEnter" || e.code === "Enter") {
                          amountNetAmountRef.current?.focus();
                        }
                      },
                    }}
                    inputRef={amountParticipationRef}
                  />
                  <TextFormatedInput
                    containerStyle={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                      rowGap: "5px",
                    }}
                    label={{
                      title: "Net Amount : ",
                      style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "100%",
                      },
                    }}
                    input={{
                      type: "text",
                      defaultValue: "0.00",
                      style: {
                        width: "calc(100% - 10px)",
                        height: "25px ",
                        borderRadius: "5px",
                      },
                      onKeyDown: (e) => {
                        if (e.code === "NumpadEnter" || e.code === "Enter") {
                          nameOfTTPDRef.current?.focus();
                        }
                      },
                    }}
                    inputRef={amountNetAmountRef}
                  />
                </div>
                <TextAreaInput
                  containerStyle={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left",
                    rowGap: "5px",
                  }}
                  label={{
                    title: "Name of TPPD : ",
                    style: {
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "100%",
                    },
                  }}
                  textarea={{
                    style: {
                      width: "calc(100% - 10px)",
                      borderRadius: "5px",
                    },
                    onKeyDown: (e) => {
                      if (e.code === "NumpadEnter" || e.code === "Enter") {
                        remarksRef.current?.focus();
                      }
                    },
                  }}
                  _inputRef={nameOfTTPDRef}
                />
                <TextAreaInput
                  containerStyle={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left",
                    rowGap: "5px",
                  }}
                  label={{
                    title: "Remarks : ",
                    style: {
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "100%",
                    },
                  }}
                  textarea={{
                    rows: 4,
                    style: {
                      width: "calc(100% - 10px)",
                      borderRadius: "5px",
                    },
                    onKeyDown: (e) => {
                      if (e.code === "NumpadEnter" || e.code === "Enter") {
                      }
                    },
                  }}
                  _inputRef={remarksRef}
                />
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    alignItems: "center",
                    padding: "20px 0px",
                  }}
                >
                  <CheckBoxLabel
                    gridRow={1}
                    inputRef={ongoingRef}
                    label="Ongoing"
                    onChange={() => handleCheck("Ongoing")}
                    checked={selected === "Ongoing"}
                  />
                  <CheckBoxLabel
                    gridRow={1}
                    inputRef={deniedRef}
                    label="Denied"
                    onChange={() => handleCheck("Denied")}
                    checked={selected === "Denied"}
                  />
                  <CheckBoxLabel
                    gridRow={1}
                    inputRef={cancelRef}
                    label="Cancel"
                    onChange={() => handleCheck("Cancel")}
                    checked={selected === "Cancel"}
                  />
                  <CheckBoxLabel
                    gridRow={1}
                    inputRef={approvedSettledRef}
                    label="Approved"
                    onChange={() => {
                      approvedDateModalRef.current.showModal();
                      handleCheck("Approved");
                    }}
                    checked={selected === "Approved"}
                  />
                </div>
              </div>
            </div>
            <>
              <div
                className={`documents ${
                  contentShow === "Documents" ? "active" : ""
                }`}
                style={{
                  flex: "1",
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "100%",
                  borderRight: "1px solid #d1d5db",
                }}
              >
                <div
                  style={{
                    background: "red",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                  }}
                >
                  {/* documents */}
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
                      {configuration.claimType}
                    </p>
                    <List>
                      {configuration.documents
                        .filter((itm: any) => itm.primaryDocuments)
                        .map((itm: any, idx: number) => {
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
                    {configuration.documents.filter((itm: any) => itm.others)
                      .length > 0 && (
                      <>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            padding: "5px 10px",
                          }}
                        >
                          Other Documents
                        </p>
                        <List>
                          {configuration.documents
                            .filter((itm: any) => itm.others)
                            .map((itm: any, idx: number) => {
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
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </>
          </div>
          <div style={{ height: "40px", background: "#d1d5db" }}>
            <Tooltip title="Submit Claim">
              <Button
                variant="contained"
                color="success"
                sx={{
                  width: "100%",
                  borderRadius: 0,
                  height: "100%",
                }}
                onClick={() => {
                  let missingFiles: any = [];

                  // Check required documents
                  configuration.documents.forEach((doc: any, idx: number) => {
                    if (doc.required && !doc.files) {
                      missingFiles.push(`${idx + 1}. ${doc.label}`);
                    }
                  });

                  // Show alert if there are missing required files
                  if (missingFiles.length > 0) {
                    return alert(
                      "The following required documents are missing:\n\n" +
                        missingFiles.join("\n")
                    );
                  } else {
                    const newData = [
                      configuration.reference,
                      configuration.claimType,
                      dateReportRef.current?.value === ""
                        ? ""
                        : format(
                            new Date(dateReportRef.current?.value as any),
                            "MM/dd/YYY"
                          ),
                      format(
                        new Date(dateAccidentRef.current?.value as any),
                        "MM/dd/YYY"
                      ),
                      claimStatus.current?.value,
                      dateReceivedDocumentsRef.current?.value === ""
                        ? ""
                        : format(
                            new Date(
                              dateReceivedDocumentsRef.current?.value as any
                            ),
                            "MM/dd/YYY"
                          ),
                      amountClaimRef.current?.value,
                      amountApprovedRef.current?.value,
                      amountParticipationRef.current?.value,
                      amountNetAmountRef.current?.value,
                      nameOfTTPDRef.current?.value,
                      remarksRef.current?.value,
                      dateApproved !== ""
                        ? format(new Date(dateApproved), "MM/dd/YYY")
                        : dateApproved,
                      dateApproved,
                      dateReportRef.current?.value,
                      dateAccidentRef.current?.value,
                      dateReceivedDocumentsRef.current?.value,
                      selected,
                      configuration.id,
                      configuration.documents,
                    ];

                    const newTableData = JSON.parse(dataPreview.tableData);
                    newTableData.push(newData);
                    dataPreview.tableData = JSON.stringify(newTableData);
                    const encodedData = encodeURIComponent(
                      JSON.stringify(dataPreview)
                    );
                    navigate(
                      `/${DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${encodedData}`
                    );
                  }
                }}
              >
                SUBMIT
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export const ModalDocument = forwardRef(
  ({ handleOnSave, handleOnClose, hasSelectedRow }: any, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const isMoving = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const [selectedIndex, setSelectedIndex] = useState<any>(null);

    const [showModal, setShowModal] = useState(false);
    const [handleDelayClose, setHandleDelayClose] = useState(false);
    const [blick, setBlick] = useState(false);

    const labelRef = useRef<HTMLTextAreaElement>(null);

    const closeDelay = () => {
      setHandleDelayClose(true);
      setTimeout(() => {
        setSelectedIndex(null);
        setShowModal(false);
        setHandleDelayClose(false);
        handleOnClose();
      }, 100);
    };
    const closeDelayRef = useRef<any>(closeDelay);

    useImperativeHandle(ref, () => ({
      showModal: () => {
        setShowModal(true);
      },
      clsoeModal: () => {
        setSelectedIndex(null);
        setShowModal(false);
      },
      getRefs: () => {
        const refs = {};
        return refs;
      },
      showOnUpdateModal: (label: string, index: number) => {
        setShowModal(true);
        setSelectedIndex(index);
        wait(100).then(() => {
          if (labelRef.current) {
            labelRef.current.value = label;
          }
        });
      },
      closeDelay,
    }));

    useEffect(() => {
      window.addEventListener("keydown", (e: any) => {
        if (e.key === "Escape") {
          closeDelayRef.current();
        }
      });
    }, []);

    const handleMouseDown = (e: any) => {
      if (!modalRef.current) return;

      isMoving.current = true;
      offset.current = {
        x: e.clientX - modalRef.current.offsetLeft,
        y: e.clientY - modalRef.current.offsetTop,
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    // Move modal with mouse
    const handleMouseMove = (e: any) => {
      if (!isMoving.current || !modalRef.current) return;

      modalRef.current.style.left = `${e.clientX - offset.current.x}px`;
      modalRef.current.style.top = `${e.clientY - offset.current.y}px`;
    };

    // Stop moving when releasing mouse
    const handleMouseUp = () => {
      isMoving.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

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
          className="add-other-document"
          ref={modalRef}
          style={{
            height: blick ? "141px" : "140px",
            width: blick ? "40.3%" : "40%",
            border: "1px solid #64748b",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -75%)",
            display: "flex",
            flexDirection: "column",
            zIndex: handleDelayClose ? -100 : 100,
            opacity: handleDelayClose ? 0 : 1,
            transition: "all 150ms",
            boxShadow: "3px 6px 32px -7px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              height: "22px",
              background: "white",
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              position: "relative",
              alignItems: "center",
              cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
          >
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              {selectedIndex ? "Update Other Documents" : "Add Other Documents"}
            </span>
            <button
              className="btn-check-exit-modal"
              style={{
                padding: "0 5px",
                borderRadius: "0px",
                background: "white",
                color: "black",
                height: "22px",
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={() => {
                closeDelay();
              }}
            >
              <CloseIcon sx={{ fontSize: "22px" }} />
            </button>
          </div>
          <div
            style={{
              flex: 1,
              background: "#F1F1F1",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <TextAreaInput
              containerStyle={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                rowGap: "5px",
              }}
              label={{
                title: "Label : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100%",
                },
              }}
              textarea={{
                rows: 3,
                style: {
                  width: "calc(100% - 10px)",
                  borderRadius: "5px",
                },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                  }
                },
              }}
              _inputRef={labelRef}
            />
            <Button
              sx={{
                height: "25px",
                fontSize: "13px",
              }}
              variant="contained"
              onClick={(e: any) => {
                handleOnSave(e, labelRef.current?.value, selectedIndex);
              }}
            >
              SAVE NEW DOCUMENT
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
  }
);
export const ModalAddapproveDate = forwardRef(
  ({ handleOnSave, handleOnClose, hasSelectedRow }: any, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const isMoving = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const [showModal, setShowModal] = useState(false);
    const [handleDelayClose, setHandleDelayClose] = useState(false);
    const [blick, setBlick] = useState(false);

    const approvedDateRef = useRef<HTMLInputElement>(null);

    const closeDelay = () => {
      setHandleDelayClose(true);
      setTimeout(() => {
        setShowModal(false);
        setHandleDelayClose(false);
        handleOnClose();
      }, 100);
    };
    const closeDelayRef = useRef<any>(closeDelay);

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
      closeDelay,
    }));

    useEffect(() => {
      window.addEventListener("keydown", (e: any) => {
        if (e.key === "Escape") {
          closeDelayRef.current();
        }
      });
    }, []);

    const handleMouseDown = (e: any) => {
      if (!modalRef.current) return;

      isMoving.current = true;
      offset.current = {
        x: e.clientX - modalRef.current.offsetLeft,
        y: e.clientY - modalRef.current.offsetTop,
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    // Move modal with mouse
    const handleMouseMove = (e: any) => {
      if (!isMoving.current || !modalRef.current) return;

      modalRef.current.style.left = `${e.clientX - offset.current.x}px`;
      modalRef.current.style.top = `${e.clientY - offset.current.y}px`;
    };

    // Stop moving when releasing mouse
    const handleMouseUp = () => {
      isMoving.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

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
          ref={modalRef}
          style={{
            height: blick ? "auto" : "auto",
            width: blick ? "20.1%" : "20%",
            border: "1px solid #64748b",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -75%)",
            display: "flex",
            flexDirection: "column",
            zIndex: handleDelayClose ? -100 : 100,
            opacity: handleDelayClose ? 0 : 1,
            transition: "all 150ms",
            boxShadow: "3px 6px 32px -7px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              height: "22px",
              background: "white",
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              position: "relative",
              alignItems: "center",
              cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
          >
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              Add Approved Date
            </span>
            <button
              className="btn-check-exit-modal"
              style={{
                padding: "0 5px",
                borderRadius: "0px",
                background: "white",
                color: "black",
                height: "22px",
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={() => {
                closeDelay();
              }}
            >
              <CloseIcon sx={{ fontSize: "22px" }} />
            </button>
          </div>
          <div
            style={{
              flex: 1,
              background: "#F1F1F1",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <TextInput
              containerStyle={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                rowGap: "5px",
                marginBottom: "5px",
              }}
              label={{
                title: "Approved Date  ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                  display: "none",
                },
              }}
              input={{
                type: "date",
                style: { width: "calc(100% - 10px)" },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                  }
                },
              }}
              inputRef={approvedDateRef}
            />
            <Button
              sx={{
                height: "25px",
                fontSize: "13px",
              }}
              variant="contained"
              onClick={(e: any) => {
                handleOnSave(e, approvedDateRef.current?.value);
              }}
            >
              SAVE APPROVED DATE
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
  }
);
const CheckBoxLabel = ({
  inputRef,
  label,
  gridRow,
  checked,
  onChange,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  label: string;
  gridRow: number;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  const id = useId();
  return (
    <div
      style={{
        display: "flex",
        columnGap: "5px",
        gridRow,
        alignItems: "center",
      }}
    >
      <input
        id={id}
        ref={inputRef}
        type="checkbox"
        style={{
          cursor: "pointer",
        }}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        style={{
          fontSize: "10px",
          cursor: "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Attactment;
