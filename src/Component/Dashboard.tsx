import {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { wait } from "../Lib/wait";
import {
  DataGridViewReact,
  UpwardTableModalSearch,
  useUpwardTableModalSearchSafeMode,
} from "./DataGridViewReact";
import { Loading } from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../App";
import { useMutation } from "@tanstack/react-query";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Menu from "@mui/material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import {
  codeCondfirmationAlert,
  saveCondfirmationAlert,
} from "../Lib/confirmationAlert";
import { TextInput } from "./UpwardFields";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../Style/DragDropFileUpload.css";
import { format } from "date-fns";
import PageHelmet from "./PageHelmet";
import "../Style/dashboard.css";

const columns = [
  { key: "reference", label: "REF#", width: 100 },
  { key: "claim_type", label: "CLAIM TYPE", width: 100 },
  { key: "date_report", label: "DATE REPORT", width: 100 },
  { key: "date_accident", label: "DATE ACCIDENT", width: 100 },
  { key: "claimStatus", label: "STATUS", width: 130 },
  { key: "date_receive", label: "DATE RECEIVED ", width: 100 },
  { key: "amount_claim", label: "AMOUNT CLAIM", width: 100, type: "number" },
  {
    key: "amount_approved",
    label: "AMOUNT APPROVED",
    width: 200,
    type: "number",
  },
  {
    key: "amount_participation",
    label: "AMOUNT PARTICIPATION",
    width: 200,
    type: "number",
  },
  { key: "amount_net", label: "AMOUN NET", width: 100, type: "number" },
  { key: "name_ttpd", label: "NAME OF TTPD", width: 250 },
  { key: "remarks", label: "REMARKS", width: 250 },
  { key: "date_approved", label: "DATE APPROVED", width: 120 },
  { key: "date_approved_not_formated", label: "", width: 0, hide: true },
  { key: "date_report_not_formated", label: "", width: 0, hide: true },
  { key: "date_accident_not_formated", label: "", width: 0, hide: true },
  { key: "date_receive_not_formated", label: "", width: 0, hide: true },
  { key: "status", label: "", width: 0, hide: true },
  { key: "documentId", label: "", width: 0, hide: true },
  { key: "files", label: "", width: 0, hide: true },
];
export const DEPARTMENT = process.env.REACT_APP_DEPARTMENT;
const Dashboard = forwardRef(({}, ref) => {
  const [checkCodeLoading, setCheckCodeLoading] = useState(false);
  const [dropDownButton, setDropDownButton] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const formRef = useRef<any>(null);
  const tableRef = useRef<any>(null);
  const policyDetailsModal = useRef<any>(null);
  const claimSheetModalRef = useRef<any>(null);

  const [claimMode, setClaiMode] = useState("");
  const { myAxios, user } = useContext(UserContext);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const claimNoRef = useRef<HTMLInputElement>(null);
  const policySearchRef = useRef<HTMLInputElement>(null);

  const policyDetailsRef = useRef<HTMLDivElement>(null);
  const policyPaymentDetailsRef = useRef<HTMLDivElement>(null);
  const basicMenuRef = useRef<HTMLButtonElement>(null);

  const policyNoRef = useRef("");
  const policyTypeRef = useRef("");
  const policyDepartmentRef = useRef("");

  const [basicDocuments, setBasicDocuments] = useState([]);
  const [policyDetails, setPolicyDetails] = useState<any>(null);

  const referenceRef = useRef("");

  const navigateRef = useRef(navigate);

  const searchPolicyRef = useRef<any>(null);
  const searchClaimRef = useRef<any>(null);

  const diabledField = useRef((disabled: boolean) => {
    if (claimNoRef.current) {
      claimNoRef.current.disabled = disabled;
    }
    if (policySearchRef.current) {
      policySearchRef.current.disabled = disabled;
    }
  });

  const { isPending: isLoadingDocument, mutate: mutateDocument } = useMutation({
    mutationKey: ["document-pdf"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/get-document`, variable, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (response) => {
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const reportHeader = "wqeqw";
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
    },
  });

  const { isPending: isLoadingClaimId, mutate: mutateClaimId } = useMutation({
    mutationKey: ["claim-id"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/get-claim-id`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res) => {
      const response = res as any;
      wait(100).then(() => {
        if (claimNoRef.current) {
          claimNoRef.current.value = response.data.claimID;
        }
      });
    },
  });

  const { isPending: isLoadingReferenceId, mutate: mutateRefId } = useMutation({
    mutationKey: ["reference-id"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/get-reference-id`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res, variable) => {
      const response = res as any;
      wait(100).then(() => {
        referenceRef.current = response.data.reference;
        const tableData = tableRef.current.getData();

        const encodedData = encodeURIComponent(
          JSON.stringify({
            state: {
              claimType: variable.label,
              reference: response.data.reference,
              id: variable.id,
              policyNo: policyNoRef.current,
              policyType: policyTypeRef.current,
              policyDepartment: policyDepartmentRef.current,
              claimMode,
            },
            dataPreview: {
              claimMode: JSON.stringify(claimMode),
              claimId: JSON.stringify(claimNoRef.current?.value),
              tableData: JSON.stringify(tableData),
              policyDetails: JSON.stringify(policyDetails),
              basicDocuments: JSON.stringify(basicDocuments),
            },
          })
        );
        navigate(`/${DEPARTMENT}/attactment?Mkr44Rt2iuy13R=${encodedData}`);
      });
    },
  });

  const mutateClaimIdRef = useRef<any>(mutateClaimId);
  const mutateRefIdRef = useRef<any>(mutateRefId);

  const { isPending: isLoadingSave, mutate: mutateSave } = useMutation({
    mutationKey: ["save-documents"],
    mutationFn: async (variable: any) => {
      return await myAxios.post(`/save-claim`, variable.formData, {
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
      console.log(res.data);
      const response = res as any;
      if (response.data.success) {
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
    },
  });
  const { isPending: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationKey: ["update-documents"],
    mutationFn: async (variable: any) => {
      return await myAxios.post(`/update-claim`, variable.formData, {
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
    },
  });
  const { isPending: isLoadingDelete, mutate: mutateDelete } = useMutation({
    mutationKey: ["delete-claim"],
    mutationFn: async (variable: any) => {
      return await myAxios.post(`/delete-claim`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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

  const { isPending: isLoadingClaimSheet, mutate: mutateClaimSheet } =
    useMutation({
      mutationKey: ["generate-claim-sheet"],
      mutationFn: async (variables: any) =>
        await myAxios.post(`/generate-claim-sheet`, variables, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }),
      onSuccess: (response, variable) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(
          `/${
            process.env.REACT_APP_DEPARTMENT
          }/dashboard/report?params=${encodeURIComponent(
            JSON.stringify({
              pdfUrl,
              reportHeader: "Claim Sheet",
            })
          )}`,
          "_blank"
        );
      },
    });

  const {
    isPending: isLoadingSelectedPolicySearch,
    mutate: mutateSelectedPolicySearch,
  } = useMutation({
    mutationKey: ["selected-search-policy"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/selected-search-policy`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res) => {
      console.log(res.data);
      setPolicyDetails(res.data);
    },
  });

  const {
    isPending: isLoadingSelectedClaimSearch,
    mutate: mutateSelectedClaimSearch,
  } = useMutation({
    mutationKey: ["selected-search-claim"],
    mutationFn: async (variable: any) =>
      await myAxios.post(`/selected-search-claim`, variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: async (res) => {
      const response = res as any;
      const claimId = response.data.claim.claimId;

      if (claimNoRef.current) {
        claimNoRef.current.value = claimId;
      }

      const basicDocument = JSON.parse(response.data.claim.basicDocument).map(
        (itm: any) => {
          if (itm.files.length > 0) {
            itm.files = itm.files.map((filename: string) => {
              return {
                link: `${process.env.REACT_APP_IMAGE_URL}claim-files/${claimId}/${filename}`,
                filename,
              };
            });
          } else {
            itm.files = null;
          }
          return itm;
        }
      );
      setBasicDocuments(basicDocument);
      setPolicyDetails(res.data);
      const claimDetails = response.data.claim.claimDetails.map((itm: any) => {
        const files = JSON.parse(itm.files);
        itm.files = files.map((itmF: any) => {
          itmF.files = itmF.files.map((filename: any) => {
            return {
              link: `${process.env.REACT_APP_IMAGE_URL}claim-files/${itm.claim_id}/${itm.reference}/${itm.documentId}/${filename}`,
              filename,
            };
          });
          return { ...itmF, reference: itm.reference };
        });
        return itm;
      });
      tableRef.current.setDataFormated(claimDetails);
    },
  });

  // const {
  //   UpwardTableModalSearch: SearchClaimUpwardTableModalSearch,
  //   openModal: openSearchClaimUpwardTableModalSearch,
  //   closeModal: closeSearchClaimUpwardTableModalSearch,
  // } = useUpwardTableModalSearchSafeMode({
  //   size: "large",
  //   link: "/search-claim",
  //   column: [
  //     { key: "claim_id", label: "Claim ID.", width: 65 },
  //     { key: "PolicyNo", label: "Policy No", width: 200 },
  //     { key: "PolicyType", label: "Policy Type.", width: 75 },
  //     { key: "IDNo", label: "ID No.", width: 100 },
  //     { key: "Name", label: "Name", width: 300 },
  //     { key: "ChassisNo", label: "Chassis No", width: 300 },
  //     {
  //       key: "Department",
  //       label: "Department",
  //       width: 90,
  //     },
  //     {
  //       key: "remarks",
  //       label: "Remarks",
  //       width: 200,
  //     },
  //     {
  //       key: "from_d",
  //       label: "from_d",
  //       width: 0,
  //       hide: true,
  //     },
  //   ],
  //   getSelectedItem: async (rowItm: any, _: any, rowIdx: any, __: any) => {
  //     if (rowItm) {
  //       setClaiMode("update");
  //       mutateSelectedClaimSearch({
  //         claim_id: rowItm[0],
  //         policyNo: rowItm[1],
  //         policyType: rowItm[2],
  //         department: rowItm[6],
  //         from: rowItm[8],
  //       });
  //       closeSearchClaimUpwardTableModalSearch();
  //     }
  //   },
  // });

  useEffect(() => {
    if (policyDetails) {
      const totalGross = parseFloat(
        policyDetails.payment.totalGross[0].TotalDue
      );
      const totalPaidDeposit = parseFloat(
        policyDetails.payment.totalPaidDeposit[0].totalDeposit
      );
      const totalPaidReturned = parseFloat(
        policyDetails.payment.totalPaidReturned[0].totalReturned
      );
      const totalDiscount = parseFloat(
        policyDetails.payment.totalDiscount[0].discount
      );
      let totalPaid = totalPaidDeposit - totalPaidReturned;
      let totalBalance = totalGross - (totalPaid + totalDiscount);

      DisplayPaymentDetails(
        { totalGross, totalPaid, totalBalance },
        policyPaymentDetailsRef
      );

      const data = policyDetails.data[0];
      policyNoRef.current = data.PolicyNo;
      policyTypeRef.current = data.PolicyType;
      policyDepartmentRef.current = data.Department;

      if (data.PolicyType.trim() === "COM") {
        setDropDownButton([
          {
            label: "Own Damage",
            id: "0001",
          },
          {
            label: "Theft/Carnap",
            id: "0002",
          },
          {
            label: "Acts of Nature",
            id: "0003",
          },
          {
            label: "Third Party Bodily Injury ",
            id: "0004",
          },
          {
            label: "Third Party Property Damage",
            id: "0005",
          },
          {
            label: "Unnamed Passenger Personal Accident ",
            id: "0006",
          },
        ]);
      } else if (data.PolicyType.trim() === "TPL") {
        setDropDownButton([
          {
            label: "Bodily Injury",
            id: "0007",
          },
          {
            label: "Death Claim",
            id: "0008",
          },
        ]);
      } else if (data.PolicyType.trim() === "PA") {
        setDropDownButton([
          {
            label: "Bodily Injury",
            id: "00021",
          },
          {
            label: "Death Claim",
            id: "00022",
          },
          {
            label: "Damage Luggage",
            id: "00028",
          },
        ]);
      } else {
        setDropDownButton([
          {
            label: "Comprehensive",
            children: [
              {
                label: "Own Damage",
                id: "0001",
              },
              {
                label: "Theft/Carnap",
                id: "0002",
              },
              {
                label: "Acts of Nature",
                id: "0003",
              },
              {
                label: "Third Party Bodily Injury ",
                id: "0004",
              },
              {
                label: "Third Party Property Damage",
                id: "0005",
              },
              {
                label: "Unnamed Passenger Personal Accident ",
                id: "0006",
              },
            ],
          },
          {
            label: "TPL",
            children: [
              {
                label: "Bodily Injury",
                id: "0007",
              },
              {
                label: "Death Claim",
                id: "0008",
              },
            ],
          },
          {
            label: "Fire",
            children: [
              {
                label: "Fire",
              },
            ],
          },
          {
            label: "Marine",
            children: [
              {
                label: "Marine",
              },
            ],
          },
          {
            label: "Property Fluater",
            children: [
              {
                label: "Acts of Nature",
              },
              {
                label: "Own Damage",
              },
              {
                label: "Third Party Damage",
              },
            ],
          },
          {
            label: "GPA",
            children: [
              {
                label: "Bodily Injury",
                id: "00021",
              },
              {
                label: "Death Claim",
                id: "00022",
              },
              {
                label: "Damage Luggage",
                id: "00028",
              },
            ],
          },
        ]);
      }
      DisplayPolicyDetails(data, policyDetailsRef);
    }
  }, [policyDetails]);

  useEffect(() => {
    if (claimMode === "") {
      diabledField.current(true);
    } else {
      diabledField.current(false);
    }
  }, [claimMode]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dataParam = queryParams.get("Mkr44Rt2iuy13R");
    if (dataParam) {
      const state = JSON.parse(decodeURIComponent(dataParam));
      const claimId = JSON.parse(state.claimId);
      const claimMode = JSON.parse(state.claimMode);
      const policyDetails = JSON.parse(state.policyDetails);
      const tableData = JSON.parse(state.tableData);

      console.log(tableData);

      if (claimNoRef.current) {
        claimNoRef.current.value = claimId;
      }
      setBasicDocuments(JSON.parse(state.basicDocuments));
      setPolicyDetails(policyDetails);
      setClaiMode(claimMode);
      tableRef.current.setData(tableData);
      navigateRef.current(`/${DEPARTMENT}/dashboard`);
    } else {
      mutateClaimIdRef.current({});
    }
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

  const handleOnSave = async () => {
    if (claimNoRef.current?.value === "") {
      return alert("Claim No is required");
    }

    if (policyNoRef.current === "") {
      policySearchRef.current?.focus();
      return alert("Policy No is required");
    }

    if (tableRef.current.getData().length <= 0) {
      basicMenuRef.current?.click();
      return alert("List is Empty");
    }

    const data = tableRef.current.getData();

    const formData = new FormData();
    const __files: any = [];

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

    for (const itm of data) {
      const fileByMeta: any = [];
      console.log({
        reference: itm[0],
        claim_type: itm[1],
        date_report: itm[2],
        date_accident: itm[3],
        claimStatus: itm[4],
        date_receive: itm[5],
        amount_claim: itm[6],
        amount_approved: itm[7],
        amount_participation: itm[8],
        amount_net: itm[9],
        name_ttpd: itm[10],
        remarks: itm[11],
        date_report_not_formated: itm[14],
        date_accident_not_formated: itm[15],
        date_receive_not_formated: itm[16],
        date_approved_not_formated: itm[13],
        status: itm[17],
        documentId: itm[18],
        claimId: claimNoRef.current?.value,
      });
      formData.append(
        "metadata",
        JSON.stringify({
          reference: itm[0],
          claim_type: itm[1],
          date_report: itm[2],
          date_accident: itm[3],
          claimStatus: itm[4],
          date_receive: itm[5],
          amount_claim: itm[6],
          amount_approved: itm[7],
          amount_participation: itm[8],
          amount_net: itm[9],
          name_ttpd: itm[10],
          remarks: itm[11],
          date_report_not_formated: itm[14],
          date_accident_not_formated: itm[15],
          date_receive_not_formated: itm[16],
          date_approved_not_formated: itm[13],
          status: itm[17],
          documentId: itm[18],
          claimId: claimNoRef.current?.value,
        })
      );

      const filesArray = itm[itm.length - 1];
      for (const files of filesArray) {
        if (files.files) {
          for (const file of files.files) {
            const _file = await blobToFile(
              file.link,
              `${file.filename}-${files.reference}-${files.document_id}-${files.id}`,
              files
            );
            formData.append(`files`, _file);
          }
          fileByMeta.push({
            id: files.id,
            label: files.label,
            document_id: files.document_id,
            reference: files.reference,
            required: files.required,
            primaryDocuments: files.primaryDocuments,
            others: files.others,
            remarks: files.remarks,
          });
        }
      }
      __files.push(fileByMeta);
    }
    formData.append("filesArray", JSON.stringify(__files));
    formData.append("claimId", claimNoRef.current?.value as string);
    formData.append("policyDetails", JSON.stringify(policyDetails));
    formData.append("basicDocuments", JSON.stringify(basicDocuments));

    if (claimMode === "update") {
      codeCondfirmationAlert({
        isUpdate: true,
        cb: (userCodeConfirmation) => {
          setCheckCodeLoading(true);
          myAxios
            .post(
              `/check-code`,
              { userCodeConfirmation },
              {
                headers: {
                  Authorization: `Bearer ${user?.accessToken}`,
                },
              }
            )
            .then((res) => {
              setCheckCodeLoading(false);

              if (res.data.success) {
                return mutateUpdate({ formData });
              }
              wait(100).then(() => {
                alert(res.data.message);
              });
            });
        },
      });
    } else {
      saveCondfirmationAlert({
        isConfirm: () => {
          mutateSave({ formData });
        },
      });
    }
  };

  const resetAll = () => {
    policyNoRef.current = "";
    mutateClaimIdRef.current({});
    setClaiMode("");

    if (policyDetailsRef.current) {
      policyDetailsRef.current.innerHTML = `
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);fontSize:12px">
        NO SELECTED POLICY
        </div>
      `;
    }

    if (policyPaymentDetailsRef.current) {
      policyPaymentDetailsRef.current.innerHTML = `
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);fontSize:12px">
        NO SELECTED POLICY
        </div>
      `;
    }
    setPolicyDetails(null);
    setBasicDocuments([]);
    wait(100).then(() => {
      window.localStorage.removeItem("table-data");
      window.localStorage.removeItem("policy-details");
      window.localStorage.removeItem("configuration");
      tableRef.current.resetCheckBox();
      tableRef.current?.resetTable();
    });
  };

  const handleClick = (data: any) => {
    mutateRefIdRef.current(data);
  };

  return (
    <>
      {(isLoadingDocument ||
        isLoadingSave ||
        isLoadingSave ||
        isLoadingClaimId ||
        isLoadingSelectedPolicySearch ||
        isLoadingReferenceId ||
        isLoadingDelete ||
        isLoadingUpdate ||
        isLoadingSelectedClaimSearch ||
        isLoadingClaimSheet ||
        checkCodeLoading) && <Loading />}
      <PageHelmet title="Dashboard" />
      <PolicyDetailsModal
        ref={policyDetailsModal}
        handleOnSave={(state: any) => {}}
      />
      <ModalGenerateClaimSheet
        ref={claimSheetModalRef}
        handleOnSave={(state: any) => {
          mutateClaimSheet(state);
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          flex: 1,
          width: "100wv",
          height: "100vh",
          boxSizing: "border-box",
          padding: "10px",
        }}
        className="main-dashboard"
      >
        <div
          style={{
            display: "flex",
            columnGap: "10px",
          }}
          className="search-header"
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
                  searchClaimRef.current.openModal(e.currentTarget.value);
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const datagridview = document.querySelector(
                    ".grid-container"
                  ) as HTMLDivElement;
                  datagridview.focus();
                }
              },
              style: { width: "500px", height: "18px !important" },
            }}
            icon={<SearchIcon sx={{ fontSize: "18px" }} />}
            onIconClick={(e) => {
              e.preventDefault();
              if (inputSearchRef.current)
                searchClaimRef.current.openModal(
                  inputSearchRef.current.value
                );
            }}
            inputRef={inputSearchRef}
          />
          <div
            className="button-action-container"
            style={{ display: "flex", columnGap: "10px" }}
          >
            {claimMode === "" && (
              <Button
                sx={{
                  height: "22px",
                  fontSize: "11px",
                }}
                variant="contained"
                startIcon={<AddIcon sx={{ width: 15, height: 15 }} />}
                id="entry-header-save-button"
                onClick={() => {
                  setClaiMode("add");
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
              disabled={claimMode === ""}
              onClick={handleOnSave}
              color="success"
              variant="contained"
            >
              Save
            </Button>
            {claimMode === "update" && (
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
                      mutateDelete({
                        userCodeConfirmation,
                        isUpdate: true,
                        claimId: claimNoRef.current?.value,
                      });
                    },
                  });
                }}
                color="error"
              >
                Void
              </Button>
            )}
            {claimMode !== "" && (
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
                disabled={claimMode === ""}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
        <fieldset
          className="fieldset-container"
          style={{
            flexDirection: "column",
            gap: "10px",
            border: "1px solid #cbd5e1",
            borderRadius: "5px",
            width: "99%",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <div
            className="fields"
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
              boxSizing: "border-box",
            }}
          >
            <TextInput
              containerClassName="claim-no-input"
              containerStyle={{
                width: "200px",
              }}
              label={{
                title: "Claim No. : ",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "90px",
                },
              }}
              input={{
                disabled: true,
                readOnly: true,
                type: "text",
                style: {
                  width: "calc(100% - 90px)",
                  height: "22px !important",
                },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    mutateClaimIdRef.current({});
                  }
                },
              }}
              inputRef={claimNoRef}
              icon={<RestartAltIcon sx={{ fontSize: "18px" }} />}
              onIconClick={(e) => {
                mutateClaimIdRef.current({});
              }}
            />
            <div
              className="fields-with-buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
              }}
            >
              <TextInput
                disableIcon={claimMode === ""}
                containerClassName="search-policy-input"
                containerStyle={{
                  width: "550px",
                  marginBottom: "5px",
                }}
                label={{
                  title: "Search Policy : ",
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "90px",
                  },
                }}
                input={{
                  disabled: claimMode === "",
                  className: "search-input-up-on-key-down",
                  type: "search",
                  style: {
                    width: "calc(100% - 90px)",
                    height: "18px !important",
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === "NumpadEnter") {
                      e.preventDefault();
                      searchPolicyRef.current.openModal(
                        e.currentTarget.value
                      );
                    }
                  },
                }}
                icon={<SearchIcon sx={{ fontSize: "18px" }} />}
                onIconClick={(e) => {
                  e.preventDefault();
                  if (policySearchRef.current)
                    searchPolicyRef.current.openModal(
                      policySearchRef.current.value
                    );
                }}
                inputRef={policySearchRef}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "5px",
                  flexWrap: "wrap",
                  rowGap: "5px",
                }}
              >
                {/* <Button
                  sx={{
                    height: "22px",
                    fontSize: "11px",
                    background: brown[400],
                  }}
                  onClick={() => {
                    policyDetailsModal.current.showModal();
                  }}
                  color="info"
                  variant="contained"
                >
                  Add Policy Details
                </Button> */}
                <DropdownMenu
                  ref={formRef}
                  onClick={handleClick}
                  dropDownButton={dropDownButton}
                  disabled={policyDetails === null}
                />
                <Button
                  sx={{
                    height: "22px",
                    fontSize: "11px",
                  }}
                  disabled={policyDetails === null}
                  onClick={() => {
                    const tableData = tableRef.current.getData();
                    const encodedData = encodeURIComponent(
                      JSON.stringify({
                        claimMode: JSON.stringify(claimMode),
                        claimId: JSON.stringify(claimNoRef.current?.value),
                        tableData: JSON.stringify(tableData),
                        policyDetails: JSON.stringify(policyDetails),
                        basicDocuments: JSON.stringify(basicDocuments),
                      })
                    );
                    navigate(
                      `/${DEPARTMENT}/attactment/basic-document?Mkr44Rt2iuy13R=${encodedData}`
                    );
                  }}
                  color="success"
                  variant="contained"
                >
                  Basic Documents
                </Button>
                <Button
                  sx={{
                    height: "22px",
                    fontSize: "11px",
                  }}
                  disabled={policyDetails === null}
                  onClick={() => {
                    claimSheetModalRef.current.showModal();
                    claimSheetModalRef.current.setFieldInfo({
                      policy: policyDetails,
                      table: tableRef.current.getData(),
                    });
                  }}
                  color="success"
                  variant="contained"
                >
                  Claim Sheet
                </Button>
                <Button
                  sx={{
                    height: "22px",
                    fontSize: "11px",
                  }}
                  disabled={
                    policyDetails === null ||
                    tableRef.current?.getData().length <= 0
                  }
                  onClick={() => {
                    mutateDocument({
                      claimNo: claimNoRef.current?.value,
                    });
                  }}
                  color="success"
                  variant="contained"
                >
                  Documents
                </Button>
              </div>
            </div>
          </div>
          <div
            className="policy-container"
            style={{
              display: "flex",
              columnGap: "10px",
              boxSizing: "border-box",
            }}
          >
            <fieldset
              className="policy-details"
              style={{
                flexDirection: "row",
                gap: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "5px",
                width: "75%",
                position: "relative",
                fontSize: "13px",
                display: "flex",
                columnGap: "100px",
                boxSizing: "border-box",
              }}
            >
              <legend>Policy Details</legend>
              <div
                ref={policyDetailsRef}
                style={{
                  width: "100%",
                  position: "relative",
                  minHeight: "100px",
                  fontSize: "11px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: "12px",
                  }}
                >
                  NO SELECTED POLICY
                </div>
              </div>
            </fieldset>
            <fieldset
              className="policy-payment"
              style={{
                flexDirection: "row",
                gap: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "5px",
                width: "25%",
                position: "relative",
                fontSize: "13px",
                display: "flex",
                columnGap: "100px",
                boxSizing: "border-box",
              }}
            >
              <legend>Payment Details</legend>
              <div
                ref={policyPaymentDetailsRef}
                style={{
                  width: "100%",
                  position: "relative",
                  fontSize: "11px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: "12px",
                  }}
                >
                  NO SELECTED POLICY
                </div>
              </div>
            </fieldset>
          </div>
        </fieldset>
        <div
          style={{
            width: "99%",
            boxSizing: "border-box",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataGridViewReact
            containerStyle={{
              flex: 1,
              height: "auto",
              minHeight: "200px",
            }}
            ref={tableRef}
            columns={columns}
            height="280px"
            getSelectedItem={(rowItm: any) => {
              if (rowItm) {
                setCheckCodeLoading(true);
                wait(100).then(() => {
                  const tableData = tableRef.current.getData();
                  const encodedData = encodeURIComponent(
                    JSON.stringify({
                      state: {
                        claimType: rowItm[1],
                        reference: rowItm[0],
                        id: rowItm[18],
                        policyNo: policyDetails.policyNo,
                        policyType: policyDetails.policyType,
                        policyDepartment: policyDetails.Department,
                        claimMode,
                      },
                      dataPreview: {
                        claimMode: JSON.stringify(claimMode),
                        claimId: JSON.stringify(claimNoRef.current?.value),
                        tableData: JSON.stringify(tableData),
                        policyDetails: JSON.stringify(policyDetails),
                        basicDocuments: JSON.stringify(basicDocuments),
                      },
                      fields: {
                        date_report: rowItm[14],
                        date_accident: rowItm[15],
                        date_receive: rowItm[16],
                        amount_claim: rowItm[6],
                        amount_approved: rowItm[7],
                        amount_participation: rowItm[8],
                        amount_net: rowItm[9],
                        name_ttpd: rowItm[10],
                        remarks: rowItm[11],
                        date_approved: rowItm[13],
                        status: rowItm[17],
                        claimStatus: rowItm[4],
                        documentId: rowItm[18],
                      },
                      documents: rowItm[19],
                      selectedIndex: tableRef.current.getSelectedRow(),
                    })
                  );

                  navigate(
                    `/${DEPARTMENT}/attactment/update?Mkr44Rt2iuy13R=${encodedData}`
                  );
                  setCheckCodeLoading(false);
                });
              }
            }}
            onKeyDown={(rowItm: any, rowIdx: any, e: any) => {
              if (e.code === "Delete" || e.code === "Backspace") {
                const isConfim = window.confirm(
                  `Are you sure you want to delete?`
                );
                if (isConfim) {
                  const data = tableRef.current.getData();
                  data.splice(rowIdx, 1);
                  tableRef.current.setData(data);
                  tableRef.current.setSelectedRow(null);
                  tableRef.current.resetCheckBox();
                  return;
                }
              }
            }}
          />
        </div>
        <div className="mobile-actions-button">
          {claimMode === "" && (
            <Button
              sx={{
                height: "100%",
                fontSize: "11px",
                flex: 1,
              }}
              variant="contained"
              id="entry-header-save-button"
              onClick={() => {
                setClaiMode("add");
              }}
              color="primary"
            >
              New
            </Button>
          )}
          {claimMode !== "" && (
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
          {claimMode !== "" && (
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
              disabled={claimMode === ""}
            >
              Cancel
            </Button>
          )}
          {claimMode === "update" && (
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
                    mutateDelete({
                      userCodeConfirmation,
                      isUpdate: true,
                      claimId: claimNoRef.current?.value,
                    });
                  },
                });
              }}
              color="error"
            >
              Void
            </Button>
          )}
        </div>
      </div>
      <UpwardTableModalSearch
        ref={searchPolicyRef}
        link={"/search-policy"}
        column={[
          { key: "PolicyNo", label: "Policy No", width: 150 },
          { key: "PolicyType", label: "Policy Type.", width: 100 },
          { key: "IDNo", label: "ID No.", width: 100 },
          { key: "Name", label: "Name", width: 300 },
          {
            key: "Department",
            label: "Department",
            width: 90,
          },
          {
            key: "from_d",
            label: "from",
            width: 0,
            hide: true,
          },
        ]}
        handleSelectionChange={(rowItm) => {
          if (rowItm) {
            console.log(rowItm)
            mutateSelectedPolicySearch({
              policyNo: rowItm.PolicyNo,
              policyType: rowItm.PolicyType,
              department: rowItm.Department,
              from: rowItm.from_d,
            });
            searchPolicyRef.current.closeModal();
          }
        }}
      />
        <UpwardTableModalSearch
        ref={searchClaimRef}
        size="large"
        link={"/search-claim"}
        column={[
         { key: "claim_id", label: "Claim ID.", width: 100 },
          { key: "PolicyNo", label: "Policy No", width: 200 },
          { key: "PolicyType", label: "Policy Type.", width: 90 },
          { key: "IDNo", label: "ID No.", width: 150 },
          { key: "Name", label: "Name", width: 300 },
          { key: "ChassisNo", label: "Chassis No", width: 300 },
          {
            key: "Department",
            label: "Department",
            width: 90,
          },
          {
            key: "remarks",
            label: "Remarks",
            width: 200,
          },
          {
            key: "from_d",
            label: "from_d",
            width: 0,
            hide: true,
          },
        ]}
        handleSelectionChange={(rowItm) => {
          if (rowItm) {
           setClaiMode("update");
            mutateSelectedClaimSearch({
              claim_id: rowItm.claim_id,
              policyNo: rowItm.PolicyNo,
              policyType: rowItm.PolicyType,
              department: rowItm.Department,
              from: rowItm.from_d,
            });
            searchClaimRef.current.closeModal();
          }
        }}
      />
    </>
  );
});
const PolicyDetailsModal = forwardRef(
  ({ handleOnSave, handleOnClose }: any, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const isMoving = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const [showModal, setShowModal] = useState(false);
    const [handleDelayClose, setHandleDelayClose] = useState(false);
    const [blick, setBlick] = useState(false);

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

    const closeDelay = () => {
      setHandleDelayClose(true);
      setTimeout(() => {
        setShowModal(false);
        setHandleDelayClose(false);
        if (handleOnClose) handleOnClose();
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
      setFieldInfo: (state: any) => {
        wait(100).then(() => {
          const policyDetails = state.policy.data[0];
          const table = state.table;
          console.log(table);
          if (departmentRef.current) {
            if (policyDetails.Department.trim() === "UCSMI") {
              departmentRef.current.value =
                "UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.";
            } else {
              departmentRef.current.value =
                "UPWARD MANAGEMENT INSURANCE SERVICES";
            }
          }

          if (assuredRef.current) {
            assuredRef.current.value = policyDetails.Name;
          }
          if (unitRef.current) {
            unitRef.current.value = `${policyDetails.Make} ${policyDetails.BodyType} ${policyDetails.Model}`;
          }
          if (enigneRef.current) {
            enigneRef.current.value = policyDetails.MotorNo;
          }
          if (chassisRef.current) {
            chassisRef.current.value = policyDetails.ChassisNo;
          }
          if (plateRef.current) {
            plateRef.current.value = policyDetails.PlateNo;
          }

          if (policyNoRef.current) {
            policyNoRef.current.value = policyDetails.PolicyNo;
          }

          if (dateFromRef.current) {
            dateFromRef.current.value = format(
              new Date(policyDetails.DateFrom),
              "yyyy-MM-dd"
            );
          }
          if (dateToRef.current) {
            dateToRef.current.value = format(
              new Date(policyDetails.DateTo),
              "yyyy-MM-dd"
            );
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
          className="modal-claim-generate-claim-sheet"
          ref={modalRef}
          style={{
            height: blick ? "481px" : "480px",
            width: blick ? "501px" : "500px",
            border: "1px solid #64748b",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
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
              Policy Details
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
            <Button
              sx={{
                height: "25px",
                fontSize: "13px",
                marginTop: "20px",
                borderRadius: 0,
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: 0,
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
const ModalGenerateClaimSheet = forwardRef(
  ({ handleOnSave, handleOnClose }: any, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const isMoving = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const [showModal, setShowModal] = useState(false);
    const [handleDelayClose, setHandleDelayClose] = useState(false);
    const [blick, setBlick] = useState(false);

    const departmentRef = useRef<HTMLInputElement>(null);
    const assuredRef = useRef<HTMLInputElement>(null);
    const unitRef = useRef<HTMLInputElement>(null);
    const enigneRef = useRef<HTMLInputElement>(null);
    const chassisRef = useRef<HTMLInputElement>(null);
    const plateRef = useRef<HTMLInputElement>(null);
    const claimTypeRef = useRef<HTMLInputElement>(null);
    const datePrepared = useRef<HTMLInputElement>(null);
    const policyNoRef = useRef<HTMLInputElement>(null);
    const dateAccidentRef = useRef<HTMLInputElement>(null);
    const dateIssuredRef = useRef<HTMLInputElement>(null);
    const dateFromRef = useRef<HTMLInputElement>(null);
    const dateToRef = useRef<HTMLInputElement>(null);

    const closeDelay = () => {
      setHandleDelayClose(true);
      setTimeout(() => {
        setShowModal(false);
        setHandleDelayClose(false);
        if (handleOnClose) handleOnClose();
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
      setFieldInfo: (state: any) => {
        wait(100).then(() => {
          const policyDetails = state.policy.data[0];
          const table = state.table;
          console.log(table);
          if (departmentRef.current) {
            if (policyDetails.Department.trim() === "UCSMI") {
              departmentRef.current.value =
                "UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.";
            } else {
              departmentRef.current.value =
                "UPWARD MANAGEMENT INSURANCE SERVICES";
            }
          }

          if (assuredRef.current) {
            assuredRef.current.value = policyDetails.Name;
          }
          if (unitRef.current) {
            unitRef.current.value = `${policyDetails.Make} ${policyDetails.BodyType} ${policyDetails.Model}`;
          }
          if (enigneRef.current) {
            enigneRef.current.value = policyDetails.MotorNo;
          }
          if (chassisRef.current) {
            chassisRef.current.value = policyDetails.ChassisNo;
          }
          if (plateRef.current) {
            plateRef.current.value = policyDetails.PlateNo;
          }

          if (policyNoRef.current) {
            policyNoRef.current.value = policyDetails.PolicyNo;
          }

          if (table.length > 0) {
            if (claimTypeRef.current) {
              claimTypeRef.current.value = table
                .map((itm: any) => itm[1])
                .join("/");
            }

            if (dateAccidentRef.current) {
              dateAccidentRef.current.value = format(
                new Date(table[0][15]),
                "yyyy-MM-dd"
              );
            }
          } else {
            if (claimTypeRef.current) {
              claimTypeRef.current.value = "";
            }

            if (dateAccidentRef.current) {
              dateAccidentRef.current.value = "";
            }
          }

          if (dateIssuredRef.current) {
            dateIssuredRef.current.value = format(
              new Date(policyDetails.DateIssued),
              "yyyy-MM-dd"
            );
          }
          if (dateFromRef.current) {
            dateFromRef.current.value = format(
              new Date(policyDetails.DateFrom),
              "yyyy-MM-dd"
            );
          }
          if (dateToRef.current) {
            dateToRef.current.value = format(
              new Date(policyDetails.DateTo),
              "yyyy-MM-dd"
            );
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
          className="modal-claim-generate-claim-sheet"
          ref={modalRef}
          style={{
            height: blick ? "481px" : "480px",
            width: blick ? "501px" : "500px",
            border: "1px solid #64748b",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
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
              Claim Sheet Details
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
            <TextInput
              label={{
                title: "Type of Claim :",
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
              inputRef={claimTypeRef}
            />
            <TextInput
              label={{
                title: "Date Prepared :",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                style: { width: "190px", height: "22px !important" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    // expRef.current?.focus();
                  }
                },
              }}
              inputRef={datePrepared}
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
              offValidation={true}
              label={{
                title: "Date of Accident :",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "100px",
                },
              }}
              input={{
                type: "date",
                defaultValue: format(new Date(), "yyyy-MM-dd"),
                style: { width: "190px", height: "22px !important" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    // expRef.current?.focus();
                  }
                },
              }}
              inputRef={dateAccidentRef}
            />

            <TextInput
              label={{
                title: "Date Issued :",
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
              inputRef={dateIssuredRef}
            />
            <TextInput
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
            <Button
              sx={{
                height: "25px",
                fontSize: "13px",
                marginTop: "20px",
                borderRadius: 0,
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: 0,
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
                  claimTypeRef: claimTypeRef.current?.value,
                  datePrepared: datePrepared.current?.value,
                  policyNoRef: policyNoRef.current?.value,
                  dateAccidentRef: dateAccidentRef.current?.value,
                  dateIssuredRef: dateIssuredRef.current?.value,
                  dateFromRef: dateFromRef.current?.value,
                  dateToRef: dateToRef.current?.value,
                });
              }}
            >
              Generate Claim Sheet
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
function DisplayPaymentDetails(
  payment: any,
  policyPaymentDetailsRef: React.RefObject<HTMLDivElement | null>
) {
  if (policyPaymentDetailsRef.current) {
    policyPaymentDetailsRef.current.innerHTML = `
     <div style="display:flex;flex:1,width:100%;">
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:120px">Total Premium  :</span> <strong style="width:70px;text-align:right;">${formatNumber(
          payment.totalGross
        )}</strong></div>
            <div style="display:flex;column-gap:20px"><span style="width:120px">Total Paid :</span> <strong style="width:70px;text-align:right;">${formatNumber(
              payment.totalPaid
            )}</strong></div>
            <div style="width:220px;border-top:1px solid black;"></div>
            <div style="display:flex;column-gap:20px;"><span style="width:120px";>Total Balance :</span> 
            <strong style="width:70px;text-align:right;color:${
              payment.totalBalance <= 0 ? "green" : "red"
            }">${formatNumber(payment.totalBalance)}</strong></div>
      </div>
     </div>
    `;
  }
}
function DisplayPolicyDetails(
  data: any,
  policyDetailsRef: React.RefObject<HTMLDivElement | null>
) {
  if (data.PolicyType === "COM" || data.PolicyType === "TPL") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
     <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No.:</span> <strong style="flex:1">${
          data.PolicyNo || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Name.:</span><strong style="flex:1"> ${
          data.Name || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">ID No.:</span><strong style="flex:1"> ${
          data.IDNo || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type.:</span><strong style="flex:1"> ${
          data.PolicyType || ""
        }</strong></div>
         <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
           data.Account || ""
         }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Department: </span><strong style="flex:1">${
          data.Department || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Chassis No.:</span><strong style="flex:1"> ${
          data.ChassisNo || ""
        }</strong></div>
      </div>
      <div style="flex:1;">
      <div style="display:flex;column-gap:20px"><span style="width:90px">Motor No.:</span> <strong style="flex:1">${
        data.MotorNo || ""
      }</strong></div>
       <div style="display:flex;column-gap:20px"><span style="width:90px">Cover No.:</span> <strong style="flex:1">${
         data.CoverNo || ""
       }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">OR No.:</span> <strong style="flex:1">${
          data.ORNo || ""
        }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Model:</span> <strong style="flex:1">${
            data.Model || ""
          }</strong></div>
             <div style="display:flex;column-gap:20px"><span style="width:90px">Make :</span> <strong style="flex:1">${
               data.Make || ""
             }</strong></div>
                   <div style="display:flex;column-gap:20px"><span style="width:90px">Body Type :</span> <strong style="flex:1">${
                     data.BodyType || ""
                   }</strong></div>
                      <div style="display:flex;column-gap:20px"><span style="width:90px">Plate No. :</span> <strong style="flex:1">${
                        data.PlateNo || ""
                      }</strong></div>
      </div>
     </div>
     
      
    `;
  } else if (data.PolicyType === "FIRE") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
           <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
             data.Account || ""
           }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Location : </span><strong style="flex:1">${
            data.Location || ""
          }</strong></div>
      </div>
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:90px">Property Insured : </span><strong style="flex:1">${
          data.PropertyInsured || ""
        }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Occupancy :</span> <strong style="flex:1">${
            data.Occupancy || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Boundaries :</span><strong style="flex:1"> ${
            data.Boundaries || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Mortgage :</span><strong style="flex:1"> ${
            data.Mortgage || ""
          }</strong></div>
      </div>
    </div>
      `;
  } else if (data.PolicyType === "CGL") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
            data.Account || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
      </div>
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:90px">Location : </span><strong style="flex:1">${
          data.Location || ""
        }</strong></div>
      </div>
    </div>
      `;
  } else if (data.PolicyType === "MAR") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
            data.Account || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
      </div>
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:125px">Point Of Origin : </span><strong style="flex:1">${
          data.PointOfOrigin || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:125px">Point of Destination : </span><strong style="flex:1">${
          data.PointofDestination || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:125px">Vessel : </span><strong style="flex:1">${
          data.Vessel || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:125px">Additional Info : </span><strong style="flex:1">${
          data.AdditionalInfo || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:125px">Subject Insured : </span><strong style="flex:1">${
          data.SubjectInsured || ""
        }</strong></div>
         <div style="display:flex;column-gap:20px"><span style="width:125px">Consignee : </span><strong style="flex:1">${
           data.Consignee || ""
         }</strong></div>
      </div>
    </div>
      `;
  } else if (data.PolicyType === "MSPR") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
            data.Account || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Location : </span><strong style="flex:1">${
            data.Location || ""
          }</strong></div>
      </div>
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:90px">Safe Room : </span><strong style="flex:1">${
          data.Saferoom || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Origin Point : </span><strong style="flex:1">${
          data.OriginPoint || ""
        }</strong></div>
         <div style="display:flex;column-gap:20px"><span style="width:90px">Destination Point : </span><strong style="flex:1">${
           data.DestinationPoint || ""
         }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Guard : </span><strong style="flex:1">${
          data.Guard || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:90px">Messenger : </span><strong style="flex:1">${
          data.Messenger || ""
        }</strong></div>
      </div>
    </div>
      `;
  } else if (data.PolicyType === "PA") {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div  class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
            data.Account || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
      </div>
      <div style="flex:1;">
        <div style="display:flex;column-gap:20px"><span style="width:90px">Location : </span><strong style="flex:1">${
          data.Location || ""
        }</strong></div>
      </div>
    </div>
      `;
  } else {
    if (policyDetailsRef.current)
      policyDetailsRef.current.innerHTML = `
    <div class="policy-details-container" style="display:flex;flex:1,width:100%;column-gap:20px;">
      <div style="flex:1;">
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy No. :</span> <strong style="flex:1">${
            data.PolicyNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Name. :</span><strong style="flex:1"> ${
            data.Name || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">ID No. :</span><strong style="flex:1"> ${
            data.IDNo || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Policy Type. :</span><strong style="flex:1"> ${
            data.PolicyType || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Account : </span><strong style="flex:1">${
            data.Account || ""
          }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:90px">Department : </span><strong style="flex:1">${
            data.Department || ""
          }</strong></div>
           <div style="display:flex;column-gap:20px"><span style="width:90px">Obligee : </span><strong style="flex:1">${
             data.Obligee || ""
           }</strong></div>
      </div>
      <div style="flex:1;">
         <div style="display:flex;column-gap:20px"><span style="width:130px">Unit Detail : </span><strong style="flex:1">${
           data.UnitDetail || ""
         }</strong></div>
         <div style="display:flex;column-gap:20px"><span style="width:130px">Notary Name : </span><strong style="flex:1">${
           data.NotaryName || ""
         }</strong></div>
         <div style="display:flex;column-gap:20px"><span style="width:130px">Tax Cert. No : </span><strong style="flex:1">${
           data.TaxCerNo || ""
         }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:130px">Issued Location : </span><strong style="flex:1">${
          data.IssuedLocation || ""
        }</strong></div>
          <div style="display:flex;column-gap:20px"><span style="width:130px">Capacity As : </span><strong style="flex:1">${
            data.CapacityAs || ""
          }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:130px">Tax Cert. No Corp. : </span><strong style="flex:1">${
          data.TaxCerNoCorp || ""
        }</strong></div>
        <div style="display:flex;column-gap:20px"><span style="width:130px">Issued Loction Corp. : </span><strong style="flex:1">${
          data.IssuedLoctCorp || ""
        }</strong></div>
      </div>
    </div>
      `;
  }
}
export async function blobToFile(blobUrl: string, filename: string, itm: any) {
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
export function formatNumber(num: number) {
  return (num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
const NestedMenuItem = ({ item, onClick }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <MenuItem onClick={handleClick}>
        {item.children ? (
          <>
            <ListItemIcon>
              {anchorEl ? <ExpandMore /> : <ChevronRight />}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </>
        ) : (
          <ListItemText
            primary={item.label}
            onClick={(e) => onClick(item, e)}
          />
        )}
      </MenuItem>
      {item.children && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {item.children.map((child: any, index: number) => (
            <NestedMenuItem key={index} item={child} onClick={onClick} />
          ))}
        </Menu>
      )}
    </>
  );
};
const DropdownMenu = forwardRef(
  ({ disabled, onClick, dropDownButton }: any, ref) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchor(event.currentTarget);
    };

    const handleClose = () => {
      setMenuAnchor(null);
    };

    return (
      <>
        <Button
          disabled={disabled}
          onClick={handleOpen}
          sx={{ height: "22px", fontSize: "11px" }}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Add Claim
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {dropDownButton.map((item: any, index: number) => (
            <NestedMenuItem key={index} item={item} onClick={onClick} />
          ))}
        </Menu>
      </>
    );
  }
);
export default Dashboard;
