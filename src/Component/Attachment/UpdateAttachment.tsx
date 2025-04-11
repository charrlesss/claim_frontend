import "../../Style/attachment.css";
import { useRef, useId, useEffect } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { wait } from "../../Lib/wait";
import { ModalAddapproveDate, ModalDocument } from ".";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { HandleListHover } from "./BasicDocument";
import PageHelmet from "../PageHelmet";
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
];
function UpdateAttachment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addDocumentModalRef = useRef<any>(null);
  const approvedDateModalRef = useRef<any>(null);
  const zoomModalRef = useRef<any>(null);

  const [contentShow, setContentShow] = useState("Fields");

  const uploadModalRef = useRef<any>(null);
  const [configuration, setConfiguration] = useState<any>(null);
  const [selected, setSelected] = useState("Ongoing");
  const [dateApproved, setDateApproved] = useState("");
  const [dataPreview, setDataPreview] = useState<any>(null);
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
  const renameOthers = (itm: any, idx: number) => {
    addDocumentModalRef.current.showOnUpdateModal(itm.label, idx);
  };
  const handleAddDocument = () => {
    addDocumentModalRef.current.showModal();
  };
  const setFieldData = useRef((fields: any) => {
    wait(250).then(() => {
      console.log(fields);
      if (dateReportRef.current) {
        dateReportRef.current.value = fields.date_report || "";
      }
      if (dateAccidentRef.current) {
        dateAccidentRef.current.value = fields.date_accident;
      }
      if (claimStatus.current) {
        claimStatus.current.value = fields.claimStatus;
      }
      if (dateReceivedDocumentsRef.current) {
        dateReceivedDocumentsRef.current.value = fields.date_receive;
      }
      if (amountClaimRef.current) {
        amountClaimRef.current.value = fields.amount_claim;
      }
      if (amountApprovedRef.current) {
        amountApprovedRef.current.value = fields.amount_approved;
      }
      if (amountParticipationRef.current) {
        amountParticipationRef.current.value = fields.amount_participation;
      }
      if (amountNetAmountRef.current) {
        amountNetAmountRef.current.value = fields.amount_net;
      }
      if (nameOfTTPDRef.current) {
        nameOfTTPDRef.current.value = fields.name_ttpd;
      }
      if (remarksRef.current) {
        remarksRef.current.value = fields.remarks;
      }
      setSelected(fields.status);
      setDateApproved(fields.date_approved);
    });
  });
  const setDocuments = useRef((documents: any, config: any, state: any) => {
    wait(100).then(() => {
      console.log(documents);
      const maindocument = config[0].documents;
      const documentyId = maindocument.map((data: any) => data.id);
      const documentInclude = documents.filter((itm: any) =>
        documentyId.includes(itm.id)
      );
      const otherDocument = documents.filter(
        (itm: any) => !documentyId.includes(itm.id)
      );
      let newDocument = maindocument.map((itm: any) => {
        const findItem = documentInclude.filter(
          (ditm: any) => ditm.id === itm.id
        );
        if (findItem.length > 0) {
          itm = findItem[0];
        }
        return itm;
      });
      if (otherDocument.length > 0) {
        let __subDocument = newDocument;
        newDocument = __subDocument.concat(otherDocument);
      }
      setConfiguration({
        ...state,
        id: config[0].id,
        documents: newDocument,
      });
    });
  });
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
      const fields = JSON.parse(decodeURIComponent(dataParam)).fields;
      const documents = JSON.parse(decodeURIComponent(dataParam)).documents;
      const config = __CONFIGURATION.filter((itm) => itm.id === state.id);
      setFieldData.current(fields);
      setDocuments.current(documents, config, state);
      setDataPreview(JSON.parse(decodeURIComponent(dataParam)).dataPreview);
    }
  }, []);
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
            console.log(newConfiguration);
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
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="container-attachment"
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
            <Tooltip title="Add Other Document">
              <IconButton
                className={`documents-other ${
                  contentShow === "Documents" ? "active" : ""
                }`}
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
                      // { key: "Denied" },
                      // { key: "Ongoing" },
                      // { key: "Approved Settled" },
                      // { key: "Cancel" },
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

                    const queryParams = new URLSearchParams(
                      window.location.search
                    );
                    const dataParam = queryParams.get("Mkr44Rt2iuy13R");
                    if (dataParam) {
                      const selectedIndex = JSON.parse(dataParam).selectedIndex;
                      const newTableData = JSON.parse(dataPreview.tableData);
                      newTableData[selectedIndex] = newData;

                      dataPreview.tableData = JSON.stringify(newTableData);
                      const encodedData = encodeURIComponent(
                        JSON.stringify(dataPreview)
                      );
                      navigate(
                        `/${DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${encodedData}`
                      );
                    }
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

export default UpdateAttachment;
