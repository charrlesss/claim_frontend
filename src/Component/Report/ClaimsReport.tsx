import { Button } from "@mui/material";

import { useContext, useEffect, useId, useRef, useState } from "react";
import { format, lastDayOfMonth, lastDayOfYear, addYears, set } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../App";
import { Loading } from "../Loading";
import { SelectInput, TextAreaInput, TextInput } from "../UpwardFields";
import PageHelmet from "../PageHelmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Style/datepicker.css";
import "../../Style/report.css";
import { wait } from "../../Lib/wait";
import { isMobile } from "react-device-detect";

const buttons = [
  { label: "Approved Settled", id: 0 },
  { label: "List of Ongoing Claims", id: 1 },
  { label: "Denied Claims", id: 2 },
  { label: "Cancel Claim", id: 3 },
  { label: "Reimbursement", id: 4 },

];

export default function ClaimsReport() {
  const [buttonSelected, setButtonSelected] = useState(0);

  return (
    <>
      <PageHelmet title={buttons[buttonSelected].label} />
      <div
        className="main-container-report"
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
          className="report-container"
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
            className="content"
            style={{
              flex: 1,
              display: "flex",
              columnGap: "10px",
            }}
          >
            <div
              className="report-selection"
              style={{
                width: "250px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                rowGap: "2px",
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                  padding: " 5px",
                  boxSizing: "border-box",
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
                      <button
                        key={idx}
                        style={{
                          fontSize: "12px",
                          border: "none",
                          background:
                            buttonSelected === itm.id
                              ? "#0076d7"
                              : "transparent",
                          color: buttonSelected === itm.id ? "white" : "black",
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
                    );
                  })}
                </div>
              </div>
            </div>
            {buttonSelected === 0 && (
              <ClaimStatus
                titleHeader={`CLAIM REPORT FOR APPROVED/SETTLED`}
                linkPdf={`/report/approved-settled-pdf`}
                linkExcel={`/report/approved-settled-excel`}
                hideReport={false}
                reportHeader={"APPROVED/SETTLED CLAIM REPORT"}
              />
            )}
            {buttonSelected === 1 && (
              <ClaimStatus
                titleHeader={`ONGOING CLAIM REPORT`}
                linkPdf={`/report/ongoing-pdf`}
                linkExcel={`/report/ongoing-excel`}
                hideReport={true}
                reportHeader={"ONGOING CLAIM REPORT"}
              />
            )}
            {buttonSelected === 2 && (
              <ClaimStatus
                titleHeader={`DENIED CLAIM REPORT`}
                linkPdf={`/report/denied-pdf`}
                linkExcel={`/report/denied-excel`}
                hideReport={true}
                reportHeader={"DENIED CLAIM REPORT"}
              />
            )}
            {buttonSelected === 3 && (
              <ClaimStatus
                titleHeader={`CANCEL CLAIM REPORT`}
                linkPdf={`/report/cancel-pdf`}
                linkExcel={`/report/cancel-excel`}
                hideReport={true}
                reportHeader={"CANCEL CLAIM REPORT"}
              />
            )}
            {buttonSelected === 4 && (
              <ReimbursementReport
                titleHeader={`LIST OF REIMBURSEMENT`}
                linkPdf={`/report/reimbursement-pdf`}
                linkExcel={`/report/reimbursement-excel`}
                hideReport={true}
                reportHeader={'Reimbursement CLAIM REPORT'}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const ClaimStatus = ({
  titleHeader,
  linkPdf,
  linkExcel,
  hideReport,
  reportHeader,
}: any) => {
  const { user, myAxios } = useContext(UserContext);
  const [title, setTitle] = useState(
    generateTitle({
      dateFrom: new Date(),
      dateTo: lastDayOfMonth(new Date()),
    })
  );

  const [report, setReport] = useState("Yearly");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const reportRef = useRef<HTMLSelectElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const claimTypeRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const _insuranceRef = useRef<any>(null);
  const insuranceRef = useRef<HTMLSelectElement>(null);

  const monthRef = useRef<HTMLInputElement>(null);

  const yearRef = useRef<any>(null);
  const dateCountRef = useRef<HTMLInputElement>(null);

  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const { isPending: isLoadingAccount, mutate: mutateAccount } = useMutation({
    mutationKey: ["account"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/report/get-insurance-provider`, variables, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res, variable) => {
      const response = res as any;
      _insuranceRef.current.setDataSource(response.data.data);
    },
  });

  const { isPending: isLoadingReportPDF, mutate: mutateReportPDF } =
    useMutation({
      mutationKey: ["pdf-api"],
      mutationFn: async (variables: any) =>
        await myAxios.post(linkPdf, variables, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
      onSuccess: (response, variable) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        if (isMobile) {
          // MOBILE: download directly
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "report.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        } else {
          window.open(
            `/${
              process.env.REACT_APP_DEPARTMENT
            }/dashboard/report?params=${encodeURIComponent(
              JSON.stringify({
                pdfUrl,
                reportHeader,
              })
            )}`,
            "_blank"
          );
        }
      },
    });
  const { isPending: isLoadingReportExcel, mutate: mutateReportExcel } =
    useMutation({
      mutationKey: ["excel-api"],
      mutationFn: async (variables: any) =>
        await myAxios.post(linkExcel, variables, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
      onSuccess: (response, variable) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "report.xls"; // Set the desired file name
        link.click(); // Simulate a click to start the download
      },
    });
  const mutateAccountRef = useRef(mutateAccount);
  useEffect(() => {
    mutateAccountRef.current({});
  }, []);

  function generateTitle({ dateFrom, dateTo }: any) {
    if (hideReport) {
      return titleHeader;
    }
    return `${titleHeader}\nFrom ${format(
      new Date(dateFrom),
      "MM/01/yyyy"
    )} To ${format(new Date(dateTo), "MM/dd/yyyy")}
    `;
  }

  function generateReportPdf() {
    let dateFrom = new Date();
    let dateTo = new Date();

    if (!hideReport) {
      if (report === "Monthly") {
        dateFrom = new Date(`${monthRef.current?.value}-01`);
        dateTo = lastDayOfMonth(new Date(dateFrom));
      } else if (report === "Yearly") {
        dateFrom = new Date(`${yearRef.current.input.value}-01-01`);
        const count = parseInt(dateCountRef.current?.value as string);
        if (count < 0) {
          return alert("Invalid Year Count!");
        }
        dateTo = lastDayOfYear(new Date(addYears(dateFrom, count)));
      } else {
        dateFrom = new Date(dateFromRef.current?.value as any);
        dateTo = new Date(dateToRef.current?.value as any);
      }
    }

    mutateReportPDF({
      title: titleRef.current?.value,
      department: departmentRef.current?.value,
      claimType: claimTypeRef.current?.value,
      status: statusRef.current?.value,
      insurance: insuranceRef.current?.value,
      dateFrom,
      dateTo,
    });
  }
  function generateReportExcel() {
    let dateFrom = new Date();
    let dateTo = new Date();

    if (!hideReport) {
      if (report === "Monthly") {
        dateFrom = new Date(`${monthRef.current?.value}-01`);
        dateTo = lastDayOfMonth(new Date(dateFrom));
      } else if (report === "Yearly") {
        dateFrom = new Date(`${yearRef.current.input.value}-01-01`);
        const count = parseInt(dateCountRef.current?.value as string);
        if (count < 0) {
          return alert("Invalid Year Count!");
        }
        dateTo = lastDayOfYear(new Date(addYears(dateFrom, count)));
      } else {
        dateFrom = new Date(dateFromRef.current?.value as any);
        dateTo = new Date(dateToRef.current?.value as any);
      }
    }

    mutateReportExcel({
      title: titleRef.current?.value,
      department: departmentRef.current?.value,
      claimType: claimTypeRef.current?.value,
      status: statusRef.current?.value,
      insurance: insuranceRef.current?.value,
      dateFrom,
      dateTo,
    });
  }

  return (
    <>
      {(isLoadingReportPDF || isLoadingReportExcel || isLoadingAccount) && (
        <Loading />
      )}
      <div
        className="report-fields"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: "5px",
          rowGap: "7px",
          boxSizing: "border-box",
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
            rows: 3,
            style: { flex: 1 },
            value: title,
            onChange: (e) => {
              setTitle(e.currentTarget.value);
            },
          }}
          _inputRef={titleRef}
        />
        {!hideReport && (
          <SelectInput
            label={{
              title: "Report : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            selectRef={reportRef}
            select={{
              style: { flex: 1, height: "22px" },
              defaultValue: "Yearly",
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  e.preventDefault();
                  // refInvoice.current?.focus();
                }
              },
              onChange: (e) => {
                setReport(e.currentTarget.value);
              },
            }}
            datasource={[
              { key: "Monthly" },
              { key: "Yearly" },
              { key: "Custom" },
            ]}
            values={"key"}
            display={"key"}
          />
        )}
        {report === "Monthly" && !hideReport && (
          <TextInput
            label={{
              title: "Date :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "100px",
              },
            }}
            input={{
              type: "month",
              style: {
                flex: 1,
                height: "22px !important",
              },
              defaultValue: format(new Date(), "yyyy-MM"),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();

                  // searchCollectionCreditOpenModal(e.currentTarget.value);
                }
              },
              onBlur: (e) => {
                let dateFrom = new Date(`${e.currentTarget.value}-01`);
                let dateTo = lastDayOfMonth(new Date(dateFrom));
                setTitle(
                  generateTitle({
                    dateFrom,
                    dateTo,
                  })
                );
              },
            }}
            inputRef={monthRef}
          />
        )}
        {report === "Yearly" && !hideReport && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "5px",
              width: "100%",
            }}
          >
            <MyDatePicker
              label={{
                title: "Date : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              onKeyDown={(e: any) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  e.preventDefault();
                  wait(100).then(() => {
                    departmentRef.current?.focus();
                  });
                }
              }}
              onBlur={(e: any) => {
                const dateFrom = new Date(
                  `${yearRef.current.input.value}-01-01`
                );
                const count = parseInt(dateCountRef.current?.value as string);
                if (count < 0) {
                  return alert("Invalid Year Count!");
                }
                const dateTo = lastDayOfYear(
                  new Date(addYears(dateFrom, count))
                );

                setTitle(
                  generateTitle({
                    dateFrom,
                    dateTo,
                  })
                );
              }}
              ref={yearRef}
            />
            <TextInput
              label={{
                title: "",
                style: {
                  display: "none",
                },
              }}
              input={{
                min: 1,
                max: 100,
                type: "number",
                style: {
                  width: "40px",
                  height: "22px !important",
                  textAlign: "right",
                },
                defaultValue: "0",
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === "NumpadEnter") {
                    e.preventDefault();
                  }
                },
                onBlur: (e) => {
                  const dateFrom = new Date(
                    `${yearRef.current.input.value}-01-01`
                  );
                  const count = parseInt(e.currentTarget.value);
                  if (count < 0) {
                    return alert("Invalid Year Count!");
                  }
                  const dateTo = lastDayOfYear(
                    new Date(addYears(dateFrom, count))
                  );

                  setTitle(
                    generateTitle({
                      dateFrom,
                      dateTo,
                    })
                  );
                },
                onFocus: () => {
                  dateCountRef.current?.select();
                },
              }}
              inputRef={dateCountRef}
            />
          </div>
        )}
        {report === "Custom" && !hideReport && (
          <>
            <TextInput
              label={{
                title: "Date From:",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                style: {
                  flex: 1,
                  height: "22px !important",
                },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === "NumpadEnter") {
                    e.preventDefault();
                  }
                },
                onBlur: (e) => {
                  const dateFrom = new Date(e.currentTarget.value);
                  const dateTo = new Date(dateToRef.current?.value as any);

                  setTitle(
                    generateTitle({
                      dateFrom,
                      dateTo,
                    })
                  );
                },
              }}
              inputRef={dateFromRef}
            />
            <TextInput
              label={{
                title: "Date To:",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                style: {
                  flex: 1,
                  height: "22px !important",
                },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === "NumpadEnter") {
                    e.preventDefault();

                    // searchCollectionCreditOpenModal(e.currentTarget.value);
                  }
                },
                onBlur: (e) => {
                  const dateFrom = new Date(dateFromRef.current?.value as any);
                  const dateTo = new Date(e.currentTarget.value);

                  setTitle(
                    generateTitle({
                      dateFrom,
                      dateTo,
                    })
                  );
                },
              }}
              inputRef={dateToRef}
            />
          </>
        )}
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
            defaultValue: "All",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                claimTypeRef.current?.focus();
              }
            },
          }}
          datasource={[{ key: "All" }, { key: "UCSMI" }, { key: "UMIS" }]}
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
          selectRef={claimTypeRef}
          select={{
            style: { width: "calc(100% - 100px)", height: "22px" },
            defaultValue: "All",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                statusRef.current?.focus();
              }
            },
          }}
          datasource={[
            {
              key: "All",
            },
            {
              key: "Own Damage",
            },
            {
              key: "Theft/Carnap",
            },
            {
              key: "Acts of Nature",
            },
            {
              key: "Bodily Injury",
            },
            {
              key: "Death Claim",
            },
            {
              key: "Third Party Bodily Injury ",
            },
            {
              key: "Third Party Property Damage",
            },
            {
              key: "Unnamed Passenger Personal Accident ",
            },
          ]}
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
          selectRef={statusRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "All",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                insuranceRef.current?.focus();
              }
            },
          }}
          datasource={[
            { key: "All" },
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
        <SelectInput
          ref={_insuranceRef}
          label={{
            title: "Insurance : ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          selectRef={insuranceRef}
          select={{
            style: { flex: 1, height: "22px" },
            defaultValue: "All",
            onKeyDown: (e) => {
              if (e.code === "NumpadEnter" || e.code === "Enter") {
                e.preventDefault();
                // refInvoice.current?.focus();
              }
            },
          }}
          datasource={[]}
          values={"account"}
          display={"account"}
        />
        <div style={{ height: "25px" }}></div>
        <Button
          onClick={generateReportPdf}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
          className="pdf-button"
        >
          Generate PDF Report
        </Button>
        <Button
          onClick={generateReportExcel}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
          className="excel-button"
        >
          Generate Excel Report
        </Button>
      </div>
    </>
  );
};

const ReimbursementReport = ({
  titleHeader,
  linkPdf,
  linkExcel,
  hideReport,
  reportHeader
}: any) => {
  const { user, myAxios } = useContext(UserContext);
  const [title, setTitle] = useState(
    generateTitle({
      department: "UCSMI",
      dateFrom: new Date(),
      dateTo: lastDayOfMonth(new Date()),
    })
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const { isPending: isLoadingReportPDF, mutate: mutateReportPDF } =
    useMutation({
      mutationKey: ["pdf-api"],
      mutationFn: async (variables: any) =>
        await myAxios.post(linkPdf, variables, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
      onSuccess: (response, variable) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        if (isMobile) {
          // MOBILE: download directly
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "report.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        } else {
          window.open(
            `/${
              process.env.REACT_APP_DEPARTMENT
            }/dashboard/report?params=${encodeURIComponent(
              JSON.stringify({
                pdfUrl,
                reportHeader,
              })
            )}`,
            "_blank"
          );
        }
      },
    });
  const { isPending: isLoadingReportExcel, mutate: mutateReportExcel } =
    useMutation({
      mutationKey: ["excel-api"],
      mutationFn: async (variables: any) =>
        await myAxios.post(linkExcel, variables, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
      onSuccess: (response, variable) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "report.xls"; // Set the desired file name
        link.click(); // Simulate a click to start the download
      },
    });

  function generateTitle({ dateFrom, dateTo, department }: any) {
    const _department =
      department === "UCSMI"
        ? "UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC."
        : department === "UMIS"
        ? "UPWARD MANAGEMENT INSURANCE SERVICE"
        : "";
    return `${titleHeader}\n${_department}\nFROM ${format(
      new Date(dateFrom),
      "MM/01/yyyy"
    )} TO ${format(new Date(dateTo), "MM/dd/yyyy")}
    `;
  }

  function generateReportPdf() {
    let dateFrom = new Date(dateFromRef.current?.value as any);
    let dateTo = new Date(dateToRef.current?.value as any);

    mutateReportPDF({
      title: titleRef.current?.value,
      department: departmentRef.current?.value,
      dateFrom,
      dateTo,
    });
  }
  function generateReportExcel() {
    let dateFrom = new Date(dateFromRef.current?.value as any);
    let dateTo = new Date(dateToRef.current?.value as any);

    mutateReportExcel({
      title: titleRef.current?.value,
      department: departmentRef.current?.value,
      dateFrom,
      dateTo,
    });
  }

  return (
    <>
      {(isLoadingReportPDF || isLoadingReportExcel) && <Loading />}
      <div
        className="report-fields"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: "5px",
          rowGap: "7px",
          boxSizing: "border-box",
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
            rows: 3,
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
                dateFromRef.current?.focus();
              }
            },
            onChange: (e) => {
              setTitle(
                generateTitle({
                  department: e.currentTarget.value,
                  dateFrom: new Date(dateFromRef.current?.value as any),
                  dateTo: new Date(dateToRef.current?.value as any),
                })
              );
            },
          }}
          datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
          values={"key"}
          display={"key"}
        />
        <TextInput
          label={{
            title: "Date From:",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          input={{
            type: "date",
            style: {
              flex: 1,
              height: "22px !important",
            },
            defaultValue: format(new Date(), "yyyy-MM-dd"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                e.preventDefault();
              }
            },
            onBlur: (e) => {
              const dateFrom = new Date(e.currentTarget.value);
              const dateTo = new Date(dateToRef.current?.value as any);

              setTitle(
                generateTitle({
                  department: departmentRef.current?.value,
                  dateFrom,
                  dateTo,
                })
              );
            },
          }}
          inputRef={dateFromRef}
        />
        <TextInput
          label={{
            title: "Date To:",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
            },
          }}
          input={{
            type: "date",
            style: {
              flex: 1,
              height: "22px !important",
            },
            defaultValue: format(new Date(), "yyyy-MM-dd"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                e.preventDefault();

                // searchCollectionCreditOpenModal(e.currentTarget.value);
              }
            },
            onBlur: (e) => {
              const dateFrom = new Date(dateFromRef.current?.value as any);
              const dateTo = new Date(e.currentTarget.value);

              setTitle(
                generateTitle({
                  department: departmentRef.current?.value,
                  dateFrom,
                  dateTo,
                })
              );
            },
          }}
          inputRef={dateToRef}
        />

        <div style={{ height: "25px" }}></div>
        <Button
          onClick={generateReportPdf}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
          className="pdf-button"
        >
          Generate PDF Report
        </Button>
        <Button
          onClick={generateReportExcel}
          color="success"
          variant="contained"
          sx={{ height: "22px", fontSize: "12px", width: "100%" }}
          className="excel-button"
        >
          Generate Excel Report
        </Button>
      </div>
    </>
  );
};
const MyDatePicker = ({
  input,
  label,
  inputRef,
  icon,
  iconPosition = "end", // Default position is 'end'
  disableIcon = false,
  containerStyle,
  onIconClick = (e: any) => {},
  offValidation = false,
  onKeyDown,
  onBlur,
  ref,
}: any) => {
  const [selectedYear, setSelectedYear] = useState(new Date());

  const id = useId();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        ...containerStyle,
      }}
    >
      <label {...label} htmlFor={id}>
        {label.title}
      </label>
      {icon && iconPosition === "start" && (
        <div style={{ position: "absolute", left: "8px", zIndex: 1 }}>
          {icon}
        </div>
      )}
      <div
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        <DatePicker
          className={`custom-date-picker`}
          ref={ref}
          selected={selectedYear}
          onChange={(date: any) => setSelectedYear(date)}
          showYearPicker
          dateFormat="yyyy"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
      {icon && iconPosition === "end" && (
        <div
          onClick={onIconClick}
          style={{
            position: "absolute",
            right: "2px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: disableIcon ? "none" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            pointerEvents: disableIcon ? "none" : "auto",
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
