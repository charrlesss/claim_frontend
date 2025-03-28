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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../../Style/DragDropFileUpload.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadFile";
import { DEPARTMENT } from "../Dashboard";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlockIcon from "@mui/icons-material/Block";
import { wait } from "../../Lib/wait";

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
      },
      {
        id: 11,
        label: "Picture of Damage",
        files: null,
        document_id: "0001",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 11,
        label: "Alarm Sheet",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Original Sheet",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 13,
        label: "Certificate of No Recovery",
        files: null,
        document_id: "0002",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 11,
        label: "Stencils",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Repair Estimate",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 13,
        label: "Picture of Damage",
        files: null,
        document_id: "0003",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 11,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "PSA birth certificate",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 13,
        label: "Valid ID",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 14,
        label: "Proof of settlement",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 15,
        label: "PSA Death certificate",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 16,
        label: "Funeral and burial OR",
        files: null,
        document_id: "0004",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 11,
        label: "Driver’s license and OR",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Driver’s Statement to the Police (Salaysay)",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 13,
        label: "Pictures  Damages",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 14,
        label: "Repair Estimate",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 15,
        label: "Certificate of No Claim",
        files: null,
        document_id: "0005",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 11,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0006",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Valid ID",
        files: null,
        document_id: "0006",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 9,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 10,
        label: "PSA birth certificate",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 11,
        label: "Valid ID",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Proof of settlement",
        files: null,
        document_id: "0007",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 9,
        label: "Funeral and burial OR",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 10,
        label: "PSA certificate of live birth",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 11,
        label: "PSA marriage certificate",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 12,
        label: "Valid ID ",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 13,
        label: "Proof of settlement ",
        files: null,
        document_id: "0008",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 4,
        label: "Hospital/Medical Bill and OR",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 5,
        label: "Laboratory Results",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 6,
        label: "Valid ID",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
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
      },
      {
        id: 4,
        label: "Funeral and burial OR",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 5,
        label: "PSA Birt Certicate",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 6,
        label: "PSA marriage certificate",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
      {
        id: 7,
        label: "Heir's Valid ID",
        files: null,
        document_id: "00021",
        primaryDocuments: true,
        others: false,
      },
    ],
    id: "00021",
  },
];

function Attactment() {
  const navigate = useNavigate();
  const addDocumentModalRef = useRef<any>(null);
  const approvedDateModalRef = useRef<any>(null);

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

    if (data.files && data.files.length > 0) {
      const filePromises = data.files.map((url: any, index: any) => {
        return urlToFile(url.link, url.filename);
      });

      const fileArray = await Promise.all(filePromises);

      data.files = fileArray;
    }
    data.reference = configuration.reference;
    uploadModalRef.current.showModal();
    uploadModalRef.current.setSelectedDocument(data);
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
          doc.id === itm.id ? { ...doc, files: null } : doc
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
    return <Loading />;
  }

  return (
    <>
      <UploadModal
        ref={uploadModalRef}
        handleOnSave={(event: any, state: any) => {
          uploadModalRef.current.closeDelay(state);
        }}
        handleOnClose={(event: any, state: any) => {
          const newConfigDocuments = configuration.documents.map((itm: any) => {
            if (itm.id === state.id) {
              itm = { ...itm, ...state, reference: configuration.reference };
            }
            return itm;
          });
          setConfiguration({ ...configuration, documents: newConfigDocuments });
          uploadModalRef.current.resetUpload();
        }}
      />
      <ModalDocument
        ref={addDocumentModalRef}
        handleOnSave={(event: any, label: any) => {
          const newDocuments = configuration.documents;
          const lastDocument = newDocuments[newDocuments.length - 1];
          newDocuments.push({
            id: lastDocument.id + 1,
            label,
            files: null,
            document_id: lastDocument.document_id,
            others: true,
            primaryDocuments: false,
          });

          const newConfiguration = {
            ...configuration,
            documents: newDocuments,
          };

          setConfiguration(newConfiguration);
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
      >
        <div
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

            {configuration.claimType}
          </div>
          <div
            style={{
              flex: "1",
              display: "flex",
              position: "relative",
            }}
          >
            <div
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
                      defaultValue: format(new Date(), "yyyy-MM-dd"),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === "NumpadEnter") {
                          e.preventDefault();
                          amountClaimRef.current?.focus();

                          // searchCollectionCreditOpenModal(e.currentTarget.value);
                        }
                      },
                    }}
                    inputRef={dateReportRef}
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
            <div
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
                    Basic Requirement (For Assured)
                  </p>
                  <List>
                    {configuration.documents
                      .filter((itm: any) => itm.basicDocuments)
                      .map((itm: any, idx: number) => {
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
                                <Tooltip title="Reset Upload">
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
                              <ListItemButton
                                onClick={(e) => onClickItem(e, itm)}
                              >
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
                                <Tooltip title="Reset Upload">
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
                              <ListItemButton
                                onClick={(e) => onClickItem(e, itm)}
                              >
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
                                    <Tooltip title="Reset Upload">
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
                                  <ListItemButton
                                    onClick={(e) => onClickItem(e, itm)}
                                  >
                                    <ListItemText
                                      primaryTypographyProps={{
                                        fontSize: "12px",
                                      }}
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
                    </>
                  )}
                </nav>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
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
                      format(
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

    const [showModal, setShowModal] = useState(false);
    const [handleDelayClose, setHandleDelayClose] = useState(false);
    const [blick, setBlick] = useState(false);

    const labelRef = useRef<HTMLTextAreaElement>(null);

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
            height: blick ? "142px" : "140px",
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
              Add Other Documents
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
                handleOnSave(e, labelRef.current?.value);
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
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Attactment;
