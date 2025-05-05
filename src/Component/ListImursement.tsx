import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { wait } from "../Lib/wait";
import {
  DataGridViewReact,
  useUpwardTableModalSearchSafeMode,
} from "./DataGridViewReact";
import { Loading } from "./Loading";
import {
  SelectInput,
  TextAreaInput,
  TextFormatedInput,
  TextInput,
} from "./UpwardFields";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../App";
import { useMutation } from "@tanstack/react-query";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { format } from "date-fns";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import {
  codeCondfirmationAlert,
  saveCondfirmationAlert,
} from "../Lib/confirmationAlert";
import PageHelmet from "./PageHelmet";
import "../Style/reimbursement.css";
import { useNavigate } from "react-router-dom";
import { DEPARTMENT } from "./Dashboard";

const columns = [
  { key: "refNo", label: "REF#", width: 100 },
  { key: "policy_no", label: "Policy No", width: 100 },
  { key: "check_from", label: "CHECK FROM", width: 100 },
  { key: "type_claim", label: "TYPE OF CLAIM", width: 150 },
  { key: "date_claim", label: "DATE OF CLAIM", width: 130 },
  { key: "unit_insured", label: "UNIT INSURED", width: 250 },
  { key: "client_name", label: "CLIENT'S NAME", width: 250 },
  { key: "amount_claim", label: "AMOUNT OF CLAIM", width: 200 },
  {
    key: "date_release",
    label: "DISBURSEMENT DATE AT RELEASE:",
    width: 250,
  },
  {
    key: "date_return_upward",
    label: "REIMBURSEMENT RETURN DATE'S ",
    width: 300,
  },
  { key: "amount_imbursement", label: "AMOUNT OF IMBURSEMENT", width: 170 },
  { key: "payment", label: "PAYMENT ", width: 100 },
  {
    key: "payee",
    label: "PAYEE",
    width: 250,
  },
  {
    key: "remarks",
    label: "REMARKS",
    width: 250,
  },
  {
    key: "basicDocuments",
    label: "",
    hide: true,
  },
];

const ListImursement = forwardRef(({}, ref) => {
  const navigate = useNavigate();

  const tableRef = useRef<any>(null);
  const [imbursementMode, setImbursementMode] = useState("");
  const [basicDocuments, setBasicDocuments] = useState([]);

  const { myAxios, user } = useContext(UserContext);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const refNoRef = useRef<HTMLInputElement>(null);
  const policyNoRef = useRef<HTMLInputElement>(null);
  const checkFromRef = useRef<HTMLSelectElement>(null);
  const typeclaimRef = useRef<HTMLSelectElement>(null);
  const dateClaimRef = useRef<HTMLInputElement>(null);
  const amountClaimRef = useRef<HTMLInputElement>(null);
  const unitInsuredRef = useRef<HTMLTextAreaElement>(null);
  const clientsNameRef = useRef<HTMLTextAreaElement>(null);

  const dateReleaseRef = useRef<HTMLInputElement>(null);
  const dateReturnUpwardRef = useRef<HTMLInputElement>(null);
  const amountImbursementRef = useRef<HTMLInputElement>(null);
  const paymentRef = useRef<HTMLSelectElement>(null);
  const payeeRef = useRef<HTMLTextAreaElement>(null);
  const remarksRef = useRef<HTMLTextAreaElement>(null);

  const { isPending: isLoadingRefNo, mutate: mutateRefNo } = useMutation({
    mutationKey: ["get-imbersement-id"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/get-imbersement-id`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res) => {
      const response = res as any;
      wait(100).then(() => {
        if (refNoRef.current) {
          refNoRef.current.value = response.data.refNo;
        }
      });
    },
  });

  const { isPending: isLoadingSearch, mutate: mutateSearch } = useMutation({
    mutationKey: ["search-imbersement"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/search-imbersement`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res) => {
      const response = res as any;
      wait(100).then(() => {
        console.log(response.data.data)
        if (tableRef.current)
          tableRef.current.setDataFormated(response.data.data);
      });
    },
  });
  const mutateSearchRef = useRef<any>(mutateSearch);
  const mutateRefNoRef = useRef<any>(mutateRefNo);

  const { isPending: isLoadingAddImbersement, mutate: mutateAddImbersement } =
    useMutation({
      mutationKey: ["add-imbersement"],
      mutationFn: async (variable: any) => {
        return await myAxios.post(`/add-imbersement`, variable.formData, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress(progressEvent: any) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            const percentElement = document.getElementById(
              "loading-percentage"
            ) as HTMLSpanElement;
            if (percentElement) {
              percentElement.innerHTML = `${percentCompleted}%`;
            }
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        });
      },
      onSuccess: (res) => {
        const response = res as any;

        if (response.data.success) {
          wait(100).then(() => {
            tableRef.current.setDataFormated(response.data.data);
          });
          resetAll();
          return Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            timer: 1500,
          });
        }
        return Swal.fire({
          position: "center",
          icon: "warning",
          title: response.data.message,
          timer: 1500,
        });
        // console.log(response);
      },
    });

  const {
    isPending: isLoadingUpdateImbersement,
    mutate: mutateUpdateImbersement,
  } = useMutation({
    mutationKey: ["update-imbersement"],
    mutationFn: async (variable: any) => {
      return await myAxios.post(`/update-imbersement`, variable.formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(progressEvent: any) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          const percentElement = document.getElementById(
            "loading-percentage"
          ) as HTMLSpanElement;
          if (percentElement) {
            percentElement.innerHTML = `${percentCompleted}%`;
          }
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });
    },
    onSuccess: (res) => {
      const response = res as any;

      if (response.data.success) {
        wait(100).then(() => {
          tableRef.current.setDataFormated(response.data.data);
        });
        resetAll();
        return Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          timer: 1500,
        });
      }
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: response.data.message,
        timer: 1500,
      });
      // console.log(response);
    },
  });

  const {
    isPending: isLoadingDeleteImbersement,
    mutate: mutateDeleteImbersement,
  } = useMutation({
    mutationKey: ["delete-imbersement"],
    mutationFn: async (variable: any) => {
      return await myAxios.post(`/delete-imbersement`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    },
    onSuccess: (res) => {
      const response = res as any;
      if (response.data.success) {
        wait(100).then(() => {
          tableRef.current.setDataFormated(response.data.data);
        });
        resetAll();
        return Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          timer: 1500,
        });
      }
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: response.data.message,
        timer: 1500,
      });
      // console.log(response);
    },
  });

  useEffect(() => {
    mutateSearchRef.current({ search: "" });
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

  const handleOnSave = () => {
    const formData = new FormData();
    formData.append(
      "metadata",
      JSON.stringify({
        refNo: refNoRef.current?.value,
        check_from: checkFromRef.current?.value,
        client_name: clientsNameRef.current?.value,
        type_claim: typeclaimRef.current?.value,
        amount_claim: amountClaimRef.current?.value,
        date_claim: dateClaimRef.current?.value,
        payment: paymentRef.current?.value,
        amount_imbursement: amountImbursementRef.current?.value,
        date_release: dateReleaseRef.current?.value,
        payee: payeeRef.current?.value,
        date_return_upward: dateReturnUpwardRef.current?.value,
        remarks: remarksRef.current?.value,
        unit_insured: unitInsuredRef.current?.value,
        policy_no: policyNoRef.current?.value,
      })
    );
    formData.append("basicDocuments", JSON.stringify(basicDocuments));

    basicDocuments.forEach(async (itm: any) => {
      if (itm.files) {
        for (const file of itm.files) {
          const _file = await blobToFile(
            file.link,
            `${file.filename}-${itm.id}`,
            itm
          );
          formData.append(`basic`, _file);
        }
      }
    });

    if (imbursementMode === "update") {
      codeCondfirmationAlert({
        isUpdate: true,
        cb: (userCodeConfirmation) => {
          formData.append("userCodeConfirmation", userCodeConfirmation);
          mutateUpdateImbersement({
            formData,
          });
        },
      });
    } else {
      saveCondfirmationAlert({
        isConfirm: () => {
          mutateAddImbersement({
            formData,
          });
        },
      });
    }
  };

  const resetFields = () => {
    if (checkFromRef.current) {
      checkFromRef.current.value = "";
    }
    if (typeclaimRef.current) {
      typeclaimRef.current.value = "";
    }
    if (dateClaimRef.current) {
      dateClaimRef.current.value = format(new Date(), "yyyy-MM-dd");
    }
    if (amountClaimRef.current) {
      amountClaimRef.current.value = "";
    }
    if (clientsNameRef.current) {
      clientsNameRef.current.value = "";
    }
    if (dateReleaseRef.current) {
      dateReleaseRef.current.value = format(new Date(), "yyyy-MM-dd");
    }
    if (dateReturnUpwardRef.current) {
      dateReturnUpwardRef.current.value = format(new Date(), "yyyy-MM-dd");
    }
    if (amountImbursementRef.current) {
      amountImbursementRef.current.value = "";
    }
    if (paymentRef.current) {
      paymentRef.current.value = "";
    }
    if (payeeRef.current) {
      payeeRef.current.value = "";
    }

    if (remarksRef.current) {
      remarksRef.current.value = "";
    }
    if (unitInsuredRef.current) {
      unitInsuredRef.current.value = "";
    }
    if (policyNoRef.current) {
      policyNoRef.current.value = "";
    }
    mutateRefNoRef.current({});
  };

  const disabledField = useRef((disabled: boolean) => {
    if (checkFromRef.current) {
      checkFromRef.current.disabled = disabled;
    }
    if (typeclaimRef.current) {
      typeclaimRef.current.disabled = disabled;
    }
    if (dateClaimRef.current) {
      dateClaimRef.current.disabled = disabled;
    }
    if (amountClaimRef.current) {
      amountClaimRef.current.disabled = disabled;
    }
    if (clientsNameRef.current) {
      clientsNameRef.current.disabled = disabled;
    }
    if (dateReleaseRef.current) {
      dateReleaseRef.current.disabled = disabled;
    }
    if (dateReturnUpwardRef.current) {
      dateReturnUpwardRef.current.disabled = disabled;
    }
    if (amountImbursementRef.current) {
      amountImbursementRef.current.disabled = disabled;
    }
    if (paymentRef.current) {
      paymentRef.current.disabled = disabled;
    }
    if (payeeRef.current) {
      payeeRef.current.disabled = disabled;
    }

    if (remarksRef.current) {
      remarksRef.current.disabled = disabled;
    }
    if (policyNoRef.current) {
      policyNoRef.current.disabled = disabled;
    }
    if (unitInsuredRef.current) {
      unitInsuredRef.current.disabled = disabled;
    }
  });

  const resetAll = () => {
    resetFields();
    mutateRefNoRef.current({});
    tableRef.current.resetCheckBox();
    tableRef.current?.setSelectedRow(null);
    setImbursementMode("");
  };

  useEffect(() => {
    if (imbursementMode === "") {
      disabledField.current(true);
    } else {
      disabledField.current(false);
    }
  }, [imbursementMode]);

  const navigateRef = useRef(navigate);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dataParam = queryParams.get("Mkr44Rt2iuy13R");

    if (dataParam) {
      const state = JSON.parse(decodeURIComponent(dataParam));
      const ref = JSON.parse(state.refsValue);
      if (refNoRef.current) {
        refNoRef.current.value = ref.refNoRef;
      }
      if (checkFromRef.current) {
        checkFromRef.current.value = ref.checkFromRef;
      }
      if (typeclaimRef.current) {
        typeclaimRef.current.value = ref.typeclaimRef;
      }
      if (dateClaimRef.current) {
        dateClaimRef.current.value = ref.dateClaimRef;
      }
      if (amountClaimRef.current) {
        amountClaimRef.current.value = ref.amountClaimRef;
      }
      if (clientsNameRef.current) {
        clientsNameRef.current.value = ref.clientsNameRef;
      }
      if (dateReleaseRef.current) {
        dateReleaseRef.current.value = ref.dateReleaseRef;
      }
      if (dateReturnUpwardRef.current) {
        dateReturnUpwardRef.current.value = ref.dateReturnUpwardRef;
      }
      if (amountImbursementRef.current) {
        amountImbursementRef.current.value = ref.amountImbursementRef;
      }
      if (paymentRef.current) {
        paymentRef.current.value = ref.paymentRef;
      }
      if (payeeRef.current) {
        payeeRef.current.value = ref.payeeRef;
      }
      if (remarksRef.current) {
        remarksRef.current.value = ref.remarksRef;
      }
      if (unitInsuredRef.current) {
        unitInsuredRef.current.value = ref.unitInsuredRef;
      }
      if (policyNoRef.current) {
        policyNoRef.current.value = ref.policyNoRef;
      }
      setBasicDocuments(JSON.parse(state.basicDocuments));
      setImbursementMode(JSON.parse(state.imbursementMode));
      navigateRef.current(`/${DEPARTMENT}/dashboard/reimbursement`);
      wait(200).then(() => {
        tableRef.current.setSelectedRow(state.selectedRow);
        tableRef.current._setSelectedRow(state.selectedRow);
      });
    }
  }, [imbursementMode]);

  return (
    <>
      {(isLoadingAddImbersement ||
        isLoadingUpdateImbersement ||
        isLoadingDeleteImbersement ||
        isLoadingSearch ||
        isLoadingRefNo) && <Loading />}
      <PageHelmet title="Reimbursement" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          padding: "10px",
          flex: 1,
          width: "100wv",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          className="search-container"
          style={{
            display: "flex",
            columnGap: "10px",
          }}
        >
          <TextInput
            containerClassName="search-input"
            label={{
              title: "Search: ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "50px",
              },
            }}
            input={{
              className: "search-input-up-on-key-down",
              type: "search",
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();
                  mutateSearchRef.current({ search: e.currentTarget.value });
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const datagridview = document.querySelector(
                    ".grid-container"
                  ) as HTMLDivElement;
                  datagridview.focus();
                }
              },
              style: { width: "500px" },
            }}
            icon={<SearchIcon sx={{ fontSize: "18px" }} />}
            onIconClick={(e) => {
              e.preventDefault();
              if (inputSearchRef.current)
                mutateSearchRef.current({
                  search: inputSearchRef.current.value,
                });
            }}
            inputRef={inputSearchRef}
          />
          <div
            className="action-buttons"
            style={{ display: "flex", columnGap: "10px" }}
          >
            {imbursementMode === "" && (
              <Button
                sx={{
                  height: "22px",
                  fontSize: "11px",
                }}
                variant="contained"
                startIcon={<AddIcon sx={{ width: 15, height: 15 }} />}
                id="entry-header-save-button"
                onClick={() => {
                  setImbursementMode("add");
                  mutateRefNoRef.current({});
                  setBasicDocuments([])

                }}
                color="primary"
              >
                New
              </Button>
            )}
            <Button
              sx={{
                height: "22px",
                fontSize: "11px",
              }}
              disabled={imbursementMode === ""}
              onClick={handleOnSave}
              color="success"
              variant="contained"
            >
              Save
            </Button>

            {imbursementMode === "update" && (
              <Button
                sx={{
                  height: "22px",
                  fontSize: "11px",
                }}
                variant="contained"
                startIcon={<AddIcon sx={{ width: 15, height: 15 }} />}
                id="entry-header-save-button"
                onClick={() => {
                  codeCondfirmationAlert({
                    isUpdate: false,
                    cb: (userCodeConfirmation) => {
                      mutateDeleteImbersement({
                        userCodeConfirmation,
                        refNo: refNoRef.current?.value,
                      });
                    },
                  });
                }}
                color="error"
              >
                Delete
              </Button>
            )}
            {imbursementMode !== "" && (
              <Button
                sx={{
                  height: "22px",
                  fontSize: "11px",
                }}
                variant="contained"
                startIcon={<CloseIcon sx={{ width: 15, height: 15 }} />}
                color="warning"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, cancel it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      resetAll();
                    }
                  });
                }}
                disabled={imbursementMode === ""}
              >
                Cancel
              </Button>
            )}
            <Button
              disabled={imbursementMode === ""}
              sx={{
                height: "22px",
                fontSize: "11px",
              }}
              onClick={() => {
                const encodedData = encodeURIComponent(
                  JSON.stringify({
                    refsValue: JSON.stringify({
                      refNoRef: refNoRef.current?.value,
                      checkFromRef: checkFromRef.current?.value,
                      typeclaimRef: typeclaimRef.current?.value,
                      dateClaimRef: dateClaimRef.current?.value,
                      amountClaimRef: amountClaimRef.current?.value,
                      clientsNameRef: clientsNameRef.current?.value,
                      dateReleaseRef: dateReleaseRef.current?.value,
                      dateReturnUpwardRef: dateReturnUpwardRef.current?.value,
                      amountImbursementRef: amountImbursementRef.current?.value,
                      paymentRef: paymentRef.current?.value,
                      payeeRef: payeeRef.current?.value,
                      policyNoRef: policyNoRef.current?.value,
                      unitInsuredRef: unitInsuredRef.current?.value,
                      remarksRef: remarksRef.current?.value,
                    }),
                    basicDocuments: JSON.stringify(basicDocuments),
                    imbursementMode: JSON.stringify(imbursementMode),
                    selectedRow: tableRef.current.getSelectedRow(),
                  })
                );

                navigate(
                  `/${DEPARTMENT}/attactment/reimbursement-basic-documents?Mkr44Rt2iuy13R=${encodedData}`
                );
              }}
              color="success"
              variant="contained"
            >
              Basic Documents
            </Button>
          </div>
        </div>
        <fieldset
          className="fields-reimbursement"
          style={{
            display: "flex",
            gap: "10px",
            border: "1px solid #cbd5e1",
            borderRadius: "5px",
            width: "100%",
            position: "relative",
            boxSizing: "border-box",
            columnGap: "100px",
          }}
        >
          <div
            style={{
              rowGap: "5px",
            }}
          >
            <TextInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Ref  No. : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                readOnly: true,
                type: "text",
                style: {
                  width: "calc(100% - 182px)",
                  height: "22px !important",
                },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    mutateRefNoRef.current({});
                    policyNoRef.current?.focus();
                  }
                },
              }}
              inputRef={refNoRef}
              icon={<RestartAltIcon sx={{ fontSize: "18px" }} />}
              onIconClick={(e) => {
                mutateRefNoRef.current({});
              }}
            />
            <TextInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Policy  No. : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                type: "text",
                style: {
                  width: "calc(100% - 182px)",
                  height: "22px !important",
                },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    mutateRefNoRef.current({});
                    checkFromRef.current?.focus();
                  }
                },
              }}
              inputRef={policyNoRef}
            />

            <SelectInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Check From : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "175px",
                },
              }}
              selectRef={checkFromRef}
              select={{
                disabled: true,
                style: { width: "calc(100% - 175px)", height: "22px" },
                defaultValue: "UCSMI",
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    e.preventDefault();
                    typeclaimRef.current?.focus();
                  }
                },
              }}
              datasource={[{ key: "UCSMI" }, { key: "UMIS" }]}
              values={"key"}
              display={"key"}
            />
            <SelectInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Type of Claim : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "175px",
                },
              }}
              selectRef={typeclaimRef}
              select={{
                disabled: true,
                style: { width: "calc(100% - 175px)", height: "22px" },
                defaultValue: "UCSMI",
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    e.preventDefault();
                    dateClaimRef.current?.focus();
                  }
                },
              }}
              datasource={[
                { key: "ACT OF NATURE" },
                { key: "CTPL CLAIM " },
                { key: "DEATH CLAIM " },
                { key: "GPA" },
                { key: "OWN DAMAGE" },
              ]}
              values={"key"}
              display={"key"}
            />
            <TextInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Date of Claim : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                disabled: true,
                type: "date",
                style: { width: "calc(100% - 182px)" },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    unitInsuredRef.current?.focus();
                  }
                },
              }}
              inputRef={dateClaimRef}
            />
            <TextAreaInput
              containerClassName="clientname-input container-field"
              containerStyle={{ width: "500px", marginBottom: "5px" }}
              label={{
                title: "Unit Insured : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              textarea={{
                disabled: true,
                style: { width: "calc(100% - 180px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    clientsNameRef.current?.focus();
                  }
                },
              }}
              _inputRef={unitInsuredRef}
            />
            <TextAreaInput
              containerClassName="clientname-input container-field"
              containerStyle={{ width: "500px", marginBottom: "5px" }}
              label={{
                title: "Client's Name : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              textarea={{
                disabled: true,
                style: { width: "calc(100% - 180px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    amountClaimRef.current?.focus();
                  }
                },
              }}
              _inputRef={clientsNameRef}
            />
          </div>
          <div>
            <TextFormatedInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Amount of Claim : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                disabled: true,
                type: "text",
                defaultValue: "0.00",
                style: { width: "calc(100% - 182px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    dateReleaseRef.current?.focus();
                  }
                },
              }}
              inputRef={amountClaimRef}
            />
            <TextInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Disbursement Date at Release  : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                disabled: true,
                type: "date",
                style: { width: "calc(100% - 180px)" },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    dateReturnUpwardRef.current?.focus();
                  }
                },
              }}
              inputRef={dateReleaseRef}
            />
            <TextInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Reimbursement Return Dates : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                disabled: true,
                type: "date",
                style: { width: "calc(100% - 180px)" },
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    amountImbursementRef.current?.focus();
                  }
                },
              }}
              inputRef={dateReturnUpwardRef}
            />
            <TextFormatedInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Disbursement Amount : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              input={{
                disabled: true,
                type: "text",
                defaultValue: "0.00",
                style: { width: "calc(100% - 180px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    paymentRef.current?.focus();
                  }
                },
              }}
              inputRef={amountImbursementRef}
            />
            <SelectInput
              containerClassName="container-field"
              containerStyle={{
                width: "350px",
                marginBottom: "5px",
              }}
              label={{
                title: "Payment : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "175px",
                },
              }}
              selectRef={paymentRef}
              select={{
                disabled: true,
                style: { width: "calc(100% - 175px)", height: "22px" },
                defaultValue: "CHECK",
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    e.preventDefault();
                    payeeRef.current?.focus();
                  }
                },
              }}
              datasource={[{ key: "CHECK" }, { key: "CASH" }]}
              values={"key"}
              display={"key"}
            />
            <TextAreaInput
              containerClassName="clientname-input container-field"
              containerStyle={{ width: "500px", marginBottom: "5px" }}
              label={{
                title: "Payee : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              textarea={{
                disabled: true,
                style: { width: "calc(100% - 180px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                     remarksRef.current?.focus()
                  }
                },
              }}
              _inputRef={payeeRef}
            />
            <TextAreaInput
              containerClassName="clientname-input container-field"
              containerStyle={{ width: "500px", marginBottom: "5px" }}
              label={{
                title: "Remarks : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "180px",
                },
              }}
              textarea={{
                disabled: true,
                style: { width: "calc(100% - 180px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    //  refDate.current?.focus()
                  }
                },
              }}
              _inputRef={remarksRef}
            />
          </div>
        </fieldset>
        <DataGridViewReact
          showSequence={true}
          containerStyle={{
            flex: 1,
            height: "auto",
            minHeight: "200px",
          }}
          ref={tableRef}
          columns={columns}
          height="280px"
          getSelectedItem={(rowItm: any ) => {
            if (rowItm) {
              setImbursementMode("update");
              wait(100).then(() => {
                if (refNoRef.current) {
                  refNoRef.current.value = rowItm[0];
                }
                if (policyNoRef.current) {
                  policyNoRef.current.value = rowItm[1];
                }
                if (checkFromRef.current) {
                  checkFromRef.current.value = rowItm[2];
                }
                if (typeclaimRef.current) {
                  typeclaimRef.current.value = rowItm[3];
                }
                if (dateClaimRef.current) {
                  dateClaimRef.current.value = rowItm[4];
                }
                if (unitInsuredRef.current) {
                  unitInsuredRef.current.value = rowItm[5];
                }
                if (clientsNameRef.current) {
                  clientsNameRef.current.value = rowItm[6];
                }
                if (amountClaimRef.current) {
                  amountClaimRef.current.value = rowItm[7];
                }
                if (dateReleaseRef.current) {
                  dateReleaseRef.current.value = rowItm[8];
                }
                if (dateReturnUpwardRef.current) {
                  dateReturnUpwardRef.current.value = rowItm[9];
                }
                if (amountImbursementRef.current) {
                  amountImbursementRef.current.value = rowItm[10];
                }
                if (paymentRef.current) {
                  paymentRef.current.value = rowItm[11];
                }
                if (payeeRef.current) {
                  payeeRef.current.value = rowItm[12];
                }

                if (remarksRef.current) {
                  remarksRef.current.value = rowItm[13];
                }
                setBasicDocuments(JSON.parse(rowItm[rowItm.length - 1]));
              });
            } else {
              setImbursementMode("");
              resetFields();
              setBasicDocuments([])
            }
          }}
          onKeyDown={(rowItm: any, rowIdx: any, e: any) => {
            if (e.code === "Delete" || e.code === "Backspace") {
              const isConfim = window.confirm(
                `Are you sure you want to delete?`
              );
              if (isConfim) {
                return;
              }
            }
          }}
        />
        <div
          className="mobile-actions-button"
          style={{ display: "none", columnGap: "10px" }}
        >
          {imbursementMode === "" && (
            <Button
              sx={{
                height: "100%",
                fontSize: "11px",
                flex: 1,
              }}
              variant="contained"
              id="entry-header-save-button"
              onClick={() => {
                setImbursementMode("add");
                mutateRefNoRef.current({});
              }}
              color="primary"
            >
              New
            </Button>
          )}
          {imbursementMode !== "" && (
            <Button
              sx={{
                height: "100%",
                fontSize: "11px",
                flex: 1,
              }}
              onClick={handleOnSave}
              color="success"
              variant="contained"
            >
              Save
            </Button>
          )}
          {imbursementMode !== "" && (
            <Button
              sx={{
                height: "100%",
                fontSize: "11px",
                flex: 1,
              }}
              variant="contained"
              color="warning"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, cancel it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    resetAll();
                  }
                });
              }}
              disabled={imbursementMode === ""}
            >
              Cancel
            </Button>
          )}
          {imbursementMode === "update" && (
            <Button
              sx={{
                height: "100%",
                fontSize: "11px",
                flex: 1,
              }}
              variant="contained"
              id="entry-header-save-button"
              onClick={() => {
                codeCondfirmationAlert({
                  isUpdate: false,
                  cb: (userCodeConfirmation) => {
                    mutateDeleteImbersement({
                      userCodeConfirmation,
                      refNo: refNoRef.current?.value,
                    });
                  },
                });
              }}
              color="error"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </>
  );
});

async function blobToFile(blobUrl: string, filename: string, itm: any) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const mimeType = blob.type || "image/png"; // Fallback to "image/png" if no MIME type is detected
    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    alert(
      `Cannot Find the files from ${itm.label}!\nPlease reupload your file and save it again thank you!`
    );
    console.error("Error converting blobUrl to file:", error);
    throw error; // Optionally re-throw the error if needed
  }
}

export default ListImursement;
