import { Button } from "@mui/material";

import { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { format, isValid, parse } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../App";
import { useUpwardTableModalSearchSafeMode } from "../DataGridViewReact";
import { wait } from "../../Lib/wait";
import { Loading } from "../Loading";
import { SelectInput, TextAreaInput, TextInput } from "../UpwardFields";
import PageHelmet from "../PageHelmet";

const buttons = [
  { label: "Approved Settled", id: 0 },
  { label: "List of Ongoing Claims", id: 1 },
  { label: "Denied Claims", id: 2 },
  { label: "Cancel Claim", id: 3 },
  { label: "Denied Due To Balance ", id: 4 },
  { label: "CNC", id: 5 },
  { label: "For Recovery", id: 6 },
  { label: "Claims Reported To ALPHA", id: 7 },
];

export default function ClaimsReport() {
  const [buttonSelected, setButtonSelected] = useState(0);

  return (
    <>
      <PageHelmet title={buttons[buttonSelected].label} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: "100vh",
          backgroundColor: "#F1F1F1",
        }}
      >
        <div
          style={{
            border: "1px solid #94a3b8",
            width: "700px",
            height: "480px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            padding: "20px",
            boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              columnGap: "10px",
            }}
          >
            <div
              style={{
                width: "250px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                rowGap: "2px",
                position: "relative",
              }}
            >
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                  padding: "5px",
                }}
              >
                *** CLAIMS ****
              </span>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "380px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                >
                  {buttons.map((itm, idx) => {
                    return (
                      <>
                        <button
                          key={idx}
                          style={{
                            fontSize: "12px",
                            border: "none",
                            background:
                              buttonSelected === itm.id
                                ? "#0076d7"
                                : "transparent",
                            color:
                              buttonSelected === itm.id ? "white" : "black",
                            width: "100%",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setButtonSelected(itm.id);
                          }}
                        >
                          {itm.label}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            {buttonSelected === 0 && <ClaimStatus />}
          </div>
        </div>
      </div>
    </>
  );
}

const ClaimStatus = () => {
  const { user, myAxios } = useContext(UserContext);
  const [title, setTitle] = useState(
    generateTitle({
      report: "All Accounts",
      subsiText: "ALL",
      insuarnceIndex: 0,
      insurance: "ALL",
      dateValue: format(new Date(), "MMMM dd, yyyy"),
      account: "",
      accountTitle: "",
    })
  );
  const [subsi, setSubsi] = useState("I.D No.");
  const [report, setReport] = useState("All Accounts");
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const departmentRef = useRef<HTMLSelectElement>(null);

  const sortRef = useRef<HTMLSelectElement>(null);
  const orderRef = useRef<HTMLSelectElement>(null);

  function generateTitle({}: any) {
    return "";
  }

  function generateReport() {
    return {};
  }

  return (
    <>
      {false && <Loading />}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: "5px",
          rowGap: "7px",
        }}
      >
        <TextAreaInput
          containerStyle={{
            marginBottom: "10px",
          }}
          label={{
            title: "Title : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
              display: "none",
            },
          }}
          textarea={{
            rows: 7,
            style: { flex: 1 },
            value: title,
            onChange: (e) => {
              setTitle(e.currentTarget.value);
            },
          }}
          _inputRef={titleRef}
        />
        <SelectInput
          label={{
            title: "Department : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          selectRef={departmentRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "UCSMI",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                // refInvoice.current?.focus();
              }
            },
          }}
          datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
          values={"key"}
          display={"key"}
        />
        <SelectInput
          label={{
            title: "Claim Type : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          selectRef={departmentRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "UCSMI",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                // refInvoice.current?.focus();
              }
            },
          }}
          datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
          values={"key"}
          display={"key"}
        />
        <SelectInput
          label={{
            title: "Status : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          selectRef={departmentRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "UCSMI",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                // refInvoice.current?.focus();
              }
            },
          }}
          datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
          values={"key"}
          display={"key"}
        />
        <SelectInput
          label={{
            title: "Insurance : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          selectRef={departmentRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "UCSMI",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                // refInvoice.current?.focus();
              }
            },
          }}
          datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
          values={"key"}
          display={"key"}
        />
        <div style={{ height: "25px" }}></div>
        <Button
          onClick={generateReport}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
        >
          Generate PDF Report
        </Button>
        <Button
          onClick={generateReport}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
        >
          Generate Excel Report
        </Button>
      </div>
    </>
  );
};
