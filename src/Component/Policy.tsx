import { Button, Chip } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRef, useState } from "react";
import { TextInput } from "./UpwardFields";

function Policy() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="main"
      style={{
        flex: 1,
        padding: "5px",
        background: "#F1F1F1",
        position: "relative",
        display: "flex",
        msFlexDirection: "column",
        flexDirection: "column",
      }}
    >
      <ChipsButton selected={selected} setSelected={setSelected} />
      {selected === 0 && <COM />}
      {selected === 1 && <FIRE />}
      {selected === 2 && <MAR />}
      {selected === 3 && <BONDS />}
      {selected === 4 && <MSPR />}
      {selected === 5 && <PA />}
      {selected === 6 && <CGL />}
    </div>
  );
}

function COM() {
  const departmentRef = useRef<HTMLInputElement>(null);
  const assuredRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);
  const enigneRef = useRef<HTMLInputElement>(null);
  const chassisRef = useRef<HTMLInputElement>(null);
  const plateRef = useRef<HTMLInputElement>(null);
  const policyNoRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  const policyTypeRef = useRef<HTMLInputElement>(null);

  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const handleOnSave = (state: any) => {};

  return (
    <>
      <div
        style={{
          background: "#F1F1F1",
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          rowGap: "5px",
          columnGap: "100px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <TextInput
            label={{
              title: "Department :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={departmentRef}
          />
          <TextInput
            label={{
              title: "Policy No. :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={policyNoRef}
          />
          <TextInput
            label={{
              title: "Policy Type. :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={policyTypeRef}
          />
          <TextInput
            label={{
              title: "Account  :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={accountRef}
          />
          <TextInput
            label={{
              title: "Assured Name :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={assuredRef}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <TextInput
            label={{
              title: "Unit Insured :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={unitRef}
          />
          <TextInput
            label={{
              title: "Engine No. :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={enigneRef}
          />
          <TextInput
            label={{
              title: "Chassis No. :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={chassisRef}
          />
          <TextInput
            label={{
              title: "Plate No. :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "text",
              style: {
                width: "calc(100% - 100px)",
                height: "22px !important",
              },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  // expRef.current?.focus();
                }
              },
            }}
            inputRef={plateRef}
          />
          <div style={{display:"flex" ,columnGap:"50px"}}>
            <TextInput
              offValidation={true}
              label={{
                title: "Date From :",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                style: { width: "190px", height: "22px !important" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    // expRef.current?.focus();
                  }
                },
              }}
              inputRef={dateFromRef}
            />
            <TextInput
              offValidation={true}
              label={{
                title: "Date To :",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                style: { width: "190px", height: "22px !important" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    // expRef.current?.focus();
                  }
                },
              }}
              inputRef={dateToRef}
            />
          </div>
        </div>
      </div>
      <Button
        sx={{
          height: "25px",
          fontSize: "13px",
          borderRadius: 0,
          width: "100%",
        }}
        variant="contained"
        onClick={(e: any) => {
          handleOnSave({
            departmentRef: departmentRef.current?.value,
            assuredRef: assuredRef.current?.value,
            unitRef: unitRef.current?.value,
            enigneRef: enigneRef.current?.value,
            chassisRef: chassisRef.current?.value,
            plateRef: plateRef.current?.value,
            policyNoRef: policyNoRef.current?.value,
            dateFromRef: dateFromRef.current?.value,
            dateToRef: dateToRef.current?.value,
          });
        }}
      >
        Save Policy Details
      </Button>
      <div style={{height:"10px"}}></div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function FIRE() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        FIRE
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function MAR() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        MAR
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function BONDS() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        BONDS
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function MSPR() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        MSPR
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function PA() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        PA
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}
function CGL() {
  return (
    <>
      <div
        style={{
          height: "200px",
          border: "1px solid red",
        }}
      >
        CGL
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
}

const chipStyle = {
  "& .MuiChip-label": {
    pointerEvents: "none",
  },
};

const chips = [
  {
    label: "Vehicle Policy",
  },
  {
    label: "Fire Policy",
  },
  {
    label: "Marine Policy",
  },
  {
    label: "Bonds Policy",
  },
  {
    label: "MSPR Policy",
  },
  {
    label: "PA Policy",
  },
  {
    label: "CGL Policy",
  },
];

function ChipsButton({ selected, setSelected }: any) {
  function handleClick(e: any, idx: number) {
    setSelected(idx);
  }

  return (
    <div
      className="button-chips-container"
      style={{
        display: "flex",
        columnGap: "5px",
        height: "35px",
        alignItems: "center",
        position: "relative",
      }}
    >
      {chips.map((item, idx) => {
        return (
          <Chip
            key={idx}
            sx={{
              ...chipStyle,
              backgroundColor: selected === idx ? blue[500] : "",
              pointerEvents: selected === idx ? "none" : "",
              color: selected === idx ? "white" : "",
            }}
            variant="outlined"
            onClick={(e) => handleClick(e, idx)}
            label={item.label}
          />
        );
      })}
    </div>
  );
}

export default Policy;
