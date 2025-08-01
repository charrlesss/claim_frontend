import {
  useContext,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { addYears } from "date-fns";

import CalculateIcon from "@mui/icons-material/Calculate";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { UserContext } from "../../../../../App";
import { useMutation } from "@tanstack/react-query";
import { useUpwardTableModalSearchSafeMode } from "../../../../DataGridViewReact";
import {
  codeCondfirmationAlert,
  saveCondfirmationAlert,
} from "../../../../../Lib/confirmationAlert";
import PageHelmet from "../../../../PageHelmet";
import {
  SelectInput,
  TextAreaInput,
  TextFormatedInput,
  TextInput,
} from "../../../../UpwardFields";
import { Loading } from "../../../../Loading";
import { formatNumber } from "../../../../Dashboard";
import { wait } from "../../../../../Lib/wait";

export default function PAPolicy() {
  const { myAxios, user } = useContext(UserContext);
  const [mode, setMode] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const _policyInformationRef = useRef<any>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const subAccountRef = useRef<HTMLSelectElement>(null);
  const subAccountRef_ = useRef<any>(null);

  const { isPending: isLoadingAccount, mutate: mutateAccount } = useMutation({
    mutationKey: ["account"],
    mutationFn: (variables: any) => {
      return myAxios.post("/task/production/pa/get-account", variables, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    },
    onSuccess(response) {
      wait(100).then(() => {
        _policyInformationRef.current
          .getRefs()
          ._accountRef.current.setDataSource(response.data?.account);
      });
    },
  });

  const { isPending: isLoadingSubAccount, mutate: mutateSubAccount } =
    useMutation({
      mutationKey: ["sub-account"],
      mutationFn: (variables: any) => {
        return myAxios.post("/task/production/sub-account", variables, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
      },
      onSuccess(response) {
        wait(100).then(() => {
          if (subAccountRef_.current)
            subAccountRef_.current.setDataSource(response.data?.data);
          wait(100).then(() => {
            if (subAccountRef.current) subAccountRef.current.value = "HO";
          });
        });
      },
    });

  const { mutate: mutateAddUpdate, isPending: loadingAddUpdate } = useMutation({
    mutationKey: ["add-update"],
    mutationFn: async (variables: any) => {
      if (mode === "edit") {
        return await myAxios.post(
          "/task/production/update-pa-policy",
          variables,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
      }
      return await myAxios.post("/task/production/add-pa-policy", variables, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    },
    onSuccess: async (res) => {
      if (res.data.success) {
        setMode("");
        _policyInformationRef.current.resetRefs();
        if (departmentRef.current) {
          departmentRef.current.value = "UMIS";
        }

        return Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      Swal.fire({
        position: "center",
        icon: "error",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const { mutate: mutateSelectedSearch, isPending: laodingSelectedSearch } =
    useMutation({
      mutationKey: ["selected-search"],
      mutationFn: async (variables: any) => {
        return await myAxios.post(
          "/task/production/selected-search-pa-policy",
          variables,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
      },
      onSuccess: async (res) => {
        if (res.data.success) {
          const selected = res.data.data[0];
          console.log(selected);

          if (departmentRef.current) {
            departmentRef.current.value = selected.Department;
          }
          // client
          if (_policyInformationRef.current.getRefs().clientIDRef.current) {
            _policyInformationRef.current.getRefs().clientIDRef.current.value =
              selected.IDNo;
          }
          if (_policyInformationRef.current.getRefs().clientNameRef.current) {
            _policyInformationRef.current.getRefs().clientNameRef.current.value =
              selected.ShortName;
          }
          if (
            _policyInformationRef.current.getRefs().clientAddressRef.current
          ) {
            _policyInformationRef.current.getRefs().clientAddressRef.current.value =
              selected.client_address;
          }

          // agent
          if (_policyInformationRef.current.getRefs().agentIdRef.current) {
            _policyInformationRef.current.getRefs().agentIdRef.current.value =
              selected.agentIDNo;
          }
          if (_policyInformationRef.current.getRefs().agentNameRef.current) {
            _policyInformationRef.current.getRefs().agentNameRef.current.value =
              selected.agentName;
          }
          if (
            _policyInformationRef.current.getRefs().agentCommisionRef.current
          ) {
            _policyInformationRef.current.getRefs().agentCommisionRef.current.value =
              selected.AgentCom;
          }
          if (_policyInformationRef.current.getRefs().saleOfficerRef.current) {
            _policyInformationRef.current.getRefs().saleOfficerRef.current.value =
              selected.sale_officer;
          }

          // v policy
          if (_policyInformationRef.current.getRefs().accountRef.current) {
            _policyInformationRef.current.getRefs().accountRef.current.value =
              selected.Account;
          }
          if (_policyInformationRef.current.getRefs().policyNoRef.current) {
            _policyInformationRef.current.getRefs().policyNoRef.current.value =
              selected.PolicyNo;
          }

          // periiod insurance
          if (_policyInformationRef.current.getRefs().dateFromRef.current) {
            _policyInformationRef.current.getRefs().dateFromRef.current.value =
              format(new Date(selected.PeriodFrom), "yyyy-MM-dd");
          }
          if (_policyInformationRef.current.getRefs().dateToRef.current) {
            _policyInformationRef.current.getRefs().dateToRef.current.value =
              format(new Date(selected.PeriodTo), "yyyy-MM-dd");
          }
          if (_policyInformationRef.current.getRefs().dateIssuedRef.current) {
            _policyInformationRef.current.getRefs().dateIssuedRef.current.value =
              format(new Date(selected.DateIssued), "yyyy-MM-dd");
          }

          // insured unit
          if (_policyInformationRef.current.getRefs().sumInsuredRef.current) {
            _policyInformationRef.current.getRefs().sumInsuredRef.current.value =
              formatNumber(
                parseFloat(selected.sumInsured.toString().replace(/,/g, ""))
              );
          }
          if (
            _policyInformationRef.current.getRefs().propertyInsuredRef.current
          ) {
            _policyInformationRef.current.getRefs().propertyInsuredRef.current.value =
              selected.Location;
          }

          // premuim
          if (_policyInformationRef.current.getRefs().netPremiumRef.current) {
            _policyInformationRef.current.getRefs().netPremiumRef.current.value =
              formatNumber(
                parseFloat(selected.TotalPremium.toString().replace(/,/g, ""))
              );
          }

          if (_policyInformationRef.current.getRefs().vatRef.current) {
            _policyInformationRef.current.getRefs().vatRef.current.value =
              formatNumber(
                parseFloat((selected.Vat || 0).toString().replace(/,/g, ""))
              );
          }
          if (_policyInformationRef.current.getRefs().docstampRef.current) {
            _policyInformationRef.current.getRefs().docstampRef.current.value =
              formatNumber(
                parseFloat(
                  (selected.DocStamp || 0).toString().replace(/,/g, "")
                )
              );
          }
          if (_policyInformationRef.current.getRefs()._localGovTaxRef.current) {
            _policyInformationRef.current.getRefs()._localGovTaxRef.current.value =
              formatNumber(
                parseFloat((selected.LGovTax || 0).toString().replace(/,/g, ""))
              );
          }
          if (_policyInformationRef.current.getRefs().totalDueRef.current) {
            _policyInformationRef.current.getRefs().totalDueRef.current.value =
              formatNumber(
                parseFloat(
                  (selected.TotalDue || 0).toString().replace(/,/g, "")
                )
              );
          }

          // wait(100).then(() => {
          //   _policyInformationRef.current
          //     .getRefs()
          //     .cumputationButtonRef.current.click();
          // });
        }
      },
    });

  const {
    UpwardTableModalSearch: ClientUpwardTableModalSearch,
    openModal: clientOpenModal,
    closeModal: clientCloseModal,
  } = useUpwardTableModalSearchSafeMode({
    link: "/task/production/search-client-by-id-or-name",
    column: [
      { key: "IDNo", label: "ID No", width: 120 },
      { key: "Name", label: "Name", width: 200 },
      {
        key: "IDType",
        label: "ID Type",
        width: 90,
      },
      {
        key: "address",
        label: "Address",
        width: 90,
        hide: true,
      },
      {
        key: "sale_officer",
        label: "Sale Officer",
        width: 90,
        hide: true,
      },
    ],
    getSelectedItem: async (rowItm: any, _: any, rowIdx: any, __: any) => {
      if (rowItm) {
        if (_policyInformationRef.current.getRefs().clientIDRef.current) {
          _policyInformationRef.current.getRefs().clientIDRef.current.value =
            rowItm[0];
        }
        if (_policyInformationRef.current.getRefs().clientNameRef.current) {
          _policyInformationRef.current.getRefs().clientNameRef.current.value =
            rowItm[1];
        }
        if (_policyInformationRef.current.getRefs().clientAddressRef.current) {
          _policyInformationRef.current.getRefs().clientAddressRef.current.value =
            rowItm[3];
        }
        if (_policyInformationRef.current.getRefs().saleOfficerRef.current) {
          _policyInformationRef.current.getRefs().saleOfficerRef.current.value =
            rowItm[4];
        }
        clientCloseModal();
        wait(100).then(() => {
          _policyInformationRef.current.getRefs().agentIdRef.current?.focus();
        });
      }
    },
  });

  const {
    UpwardTableModalSearch: AgentUpwardTableModalSearch,
    openModal: agentOpenModal,
    closeModal: agentCloseModal,
  } = useUpwardTableModalSearchSafeMode({
    link: "/task/production/search-agent-by-id-or-name",
    column: [
      { key: "IDNo", label: "ID No", width: 120 },
      { key: "Name", label: "Name", width: 200 },
      {
        key: "IDType",
        label: "ID Type",
        width: 90,
      },
    ],
    getSelectedItem: async (rowItm: any, _: any, rowIdx: any, __: any) => {
      if (rowItm) {
        if (_policyInformationRef.current.getRefs().agentIdRef.current) {
          _policyInformationRef.current.getRefs().agentIdRef.current.value =
            rowItm[0];
        }
        if (_policyInformationRef.current.getRefs().agentNameRef.current) {
          _policyInformationRef.current.getRefs().agentNameRef.current.value =
            rowItm[1];
        }

        agentCloseModal();
        wait(100).then(() => {
          _policyInformationRef.current.getRefs().accountRef.current?.focus();
        });
      }
    },
  });

  const {
    UpwardTableModalSearch: SearchFireUpwardTableModalSearch,
    openModal: searchFireOpenModal,
    closeModal: searchFireCloseModal,
  } = useUpwardTableModalSearchSafeMode({
    size: "medium",
    link: "/task/production/search-pa-policy",
    column: [
      { key: "_DateIssued", label: "Date", width: 100 },
      { key: "PolicyNo", label: "Policy No", width: 150 },
      {
        key: "Account",
        label: "Account",
        width: 110,
      },
      {
        key: "client_fullname",
        label: "Full Name",
        width: 200,
      },
    ],
    getSelectedItem: async (rowItm: any, _: any, rowIdx: any, __: any) => {
      if (rowItm) {
        setMode("edit");
        mutateSelectedSearch({ policyNo: rowItm[1] });
        searchFireCloseModal();
      }
    },
  });

  function handleSave() {
    if (_policyInformationRef.current.requiredField()) {
      return;
    }

    if (mode === "edit") {
      codeCondfirmationAlert({
        isUpdate: true,
        cb: (userCodeConfirmation) => {
          const data = {
            ..._policyInformationRef.current.getRefsValue(),
            subAccountRef: subAccountRef.current?.value,
            userCodeConfirmation,
            department: departmentRef.current?.value,
          };
          console.log(data);
          mutateAddUpdate(data);
        },
      });
    } else {
      saveCondfirmationAlert({
        isConfirm: () => {
          const data = {
            ..._policyInformationRef.current.getRefsValue(),
            subAccountRef: subAccountRef.current?.value,
            department: departmentRef.current?.value,
          };
          mutateAddUpdate(data);
        },
      });
    }
  }

  const mutateAccountRef = useRef(mutateAccount);
  const mutateSubAccountRef = useRef(mutateSubAccount);

  useEffect(() => {
    mutateSubAccountRef.current({});
    mutateAccountRef.current({});
  }, []);

  return (
    <>
      {(isLoadingAccount ||
        isLoadingSubAccount ||
        laodingSelectedSearch ||
        loadingAddUpdate) && <Loading />}
      <AgentUpwardTableModalSearch />
      <ClientUpwardTableModalSearch />
      <SearchFireUpwardTableModalSearch />
      <div
        style={{
          flex: 1,
          height: "calc(100% - 35px)",
          paddingTop: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PageHelmet title="PA Policy" />
        <div
          style={{
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <TextInput
            containerStyle={{ width: "550px" }}
            label={{
              title: "Search: ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "60px",
              },
            }}
            input={{
              className: "search-input-up-on-key-down",
              type: "search",
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();
                  searchFireOpenModal(e.currentTarget.value);
                }
              },
              style: { width: "100%", height: "22px" },
            }}
            icon={<SearchIcon sx={{ fontSize: "18px" }} />}
            onIconClick={(e) => {
              e.preventDefault();
              if (searchRef.current) {
                searchFireOpenModal(searchRef.current.value);
              }
            }}
            inputRef={searchRef}
          />
          <SelectInput
            containerClassName="custom-input adjust-label"
            selectRef={departmentRef}
            label={{
              title: "Policy: ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "50px",
                display: "none",
              },
            }}
            select={{
              style: { flex: 1, height: "20px" },
              defaultValue: "UMIS",
            }}
            datasource={[
              {
                key: "UMIS",
              },
              {
                key: "UCSMI",
              },
            ]}
            values={"key"}
            display={"key"}
          />
          <div
            className="button-action-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
            }}
          >
            <Button
              sx={{
                height: "23px",
                fontSize: "11px",
              }}
              disabled={mode === "add" || mode === "edit"}
              size="small"
              color="primary"
              onClick={() => {
                setMode("add");
              }}
              variant="contained"
              startIcon={<AddBoxIcon />}
            >
              New
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveAsIcon />}
              disabled={mode === ""}
              size="small"
              onClick={handleSave}
              sx={{
                height: "23px",
                fontSize: "11px",
              }}
            >
              Save
            </Button>
            <Button
              sx={{
                height: "23px",
                fontSize: "11px",
              }}
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              disabled={mode === ""}
              size="small"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, cencel it!",
                  cancelButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setMode("");
                    _policyInformationRef.current.resetRefs();
                    if (departmentRef.current) {
                      departmentRef.current.value = "UMIS";
                    }
                  }
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <PolicyInformation
          myAxios={myAxios}
          user={user}
          disabled={mode === ""}
          ref={_policyInformationRef}
          clientSearch={(input: string) => {
            clientOpenModal(input);
          }}
          agentSearch={(input: string) => {
            agentOpenModal(input);
          }}
          onComputation={(refs: any) => {
            let percentLocGovTax = parseFloat(
              refs.localGovTaxRef.current.value
            );
            let txtPremium = parseFloat(
              (refs.netPremiumRef.current?.value || 0)
                .toString()
                .replace(/,/g, "")
            );
            let vat = txtPremium * 0.12;
            let docStamp = txtPremium * 0.125;
            let locGovTax = txtPremium * percentLocGovTax;
            let totalDue = txtPremium + vat + docStamp + locGovTax;

            if (refs.vatRef.current) {
              refs.vatRef.current.value = formatNumber(vat);
            }
            if (refs.docstampRef.current) {
              refs.docstampRef.current.value = formatNumber(docStamp);
            }
            if (refs._localGovTaxRef.current) {
              refs._localGovTaxRef.current.value = formatNumber(locGovTax);
            }
            if (refs.totalDueRef.current) {
              refs.totalDueRef.current.value = formatNumber(totalDue);
            }
          }}
        />
      </div>
      <div
        className="button-action-mobile"
        style={{
          display: "none",
          alignItems: "center",
          columnGap: "8px",
        }}
      >
        <Button
          sx={{
            height: "23px",
            fontSize: "11px",
          }}
          disabled={mode === "add" || mode === "edit"}
          size="small"
          color="primary"
          onClick={() => {
            setMode("add");
          }}
          variant="contained"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveAsIcon />}
          disabled={mode === ""}
          size="small"
          onClick={handleSave}
          sx={{
            height: "23px",
            fontSize: "11px",
          }}
        >
          Save
        </Button>
        <Button
          sx={{
            height: "23px",
            fontSize: "11px",
          }}
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          disabled={mode === ""}
          size="small"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, cencel it!",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                setMode("");
                _policyInformationRef.current.resetRefs();
                if (departmentRef.current) {
                  departmentRef.current.value = "UMIS";
                }
              }
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

const PolicyInformation = forwardRef((props: any, ref) => {
  const cumputationButtonRef = useRef<HTMLButtonElement>(null);
  // Insurer Information
  const clientIDRef = useRef<HTMLInputElement>(null);
  const clientNameRef = useRef<HTMLInputElement>(null);
  const clientAddressRef = useRef<HTMLTextAreaElement>(null);

  // Insurer Information
  const agentIdRef = useRef<HTMLInputElement>(null);
  const agentNameRef = useRef<HTMLInputElement>(null);
  const agentCommisionRef = useRef<HTMLInputElement>(null);
  const saleOfficerRef = useRef<HTMLInputElement>(null);

  // Marine Policy
  const _accountRef = useRef<any>(null);
  const accountRef = useRef<HTMLSelectElement>(null);
  const policyNoRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  // Period of Insurance
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);
  const dateIssuedRef = useRef<HTMLInputElement>(null);

  // Insured Unit
  const sumInsuredRef = useRef<HTMLInputElement>(null);
  const propertyInsuredRef = useRef<HTMLTextAreaElement>(null);

  // premuim
  const netPremiumRef = useRef<HTMLInputElement>(null);
  const vatRef = useRef<HTMLInputElement>(null);
  const docstampRef = useRef<HTMLInputElement>(null);
  const localGovTaxRef = useRef<HTMLInputElement>(null);
  const _localGovTaxRef = useRef<HTMLInputElement>(null);
  const totalDueRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getRefsValue: () => {
      return {
        clientIDRef: clientIDRef.current?.value,
        clientNameRef: clientNameRef.current?.value,
        clientAddressRef: clientAddressRef.current?.value,
        agentIdRef: agentIdRef.current?.value,
        agentNameRef: agentNameRef.current?.value,
        agentCommisionRef: agentCommisionRef.current?.value,
        saleOfficerRef: saleOfficerRef.current?.value,
        _accountRef: _accountRef.current?.value,
        accountRef: accountRef.current?.value,
        policyNoRef: policyNoRef.current?.value,
        locationRef: locationRef.current?.value,
        dateFromRef: dateFromRef.current?.value,
        dateToRef: dateToRef.current?.value,
        dateIssuedRef: dateIssuedRef.current?.value,
        sumInsuredRef: sumInsuredRef.current?.value,
        propertyInsuredRef: propertyInsuredRef.current?.value,
        netPremiumRef: netPremiumRef.current?.value,
        vatRef: vatRef.current?.value,
        docstampRef: docstampRef.current?.value,
        localGovTaxRef: localGovTaxRef.current?.value,
        _localGovTaxRef: _localGovTaxRef.current?.value,
        totalDueRef: totalDueRef.current?.value,
      };
    },
    getRefs: () => {
      return {
        clientIDRef,
        clientNameRef,
        clientAddressRef,
        agentIdRef,
        agentNameRef,
        agentCommisionRef,
        saleOfficerRef,
        _accountRef,
        accountRef,
        policyNoRef,
        locationRef,
        dateFromRef,
        dateToRef,
        dateIssuedRef,
        sumInsuredRef,
        propertyInsuredRef,
        netPremiumRef,
        vatRef,
        docstampRef,
        localGovTaxRef,
        _localGovTaxRef,
        totalDueRef,
        cumputationButtonRef,
      };
    },
    resetRefs: () => {
      if (clientIDRef.current) {
        clientIDRef.current.value = "";
      }
      if (clientNameRef.current) {
        clientNameRef.current.value = "";
      }
      if (clientAddressRef.current) {
        clientAddressRef.current.value = "";
      }
      if (agentIdRef.current) {
        agentIdRef.current.value = "";
      }
      if (agentNameRef.current) {
        agentNameRef.current.value = "";
      }
      if (agentCommisionRef.current) {
        agentCommisionRef.current.value = "0.00";
      }
      if (saleOfficerRef.current) {
        saleOfficerRef.current.value = "";
      }

      if (accountRef.current) {
        accountRef.current.value = "";
      }
      if (policyNoRef.current) {
        policyNoRef.current.value = "";
      }
      if (locationRef.current) {
        locationRef.current.value = "";
      }

      if (dateFromRef.current) {
        dateFromRef.current.value = format(new Date(), "yyyy-MM-dd");
      }
      if (dateToRef.current) {
        dateToRef.current.value = format(addYears(new Date(), 1), "yyyy-MM-dd");
      }
      if (dateIssuedRef.current) {
        dateIssuedRef.current.value = format(new Date(), "yyyy-MM-dd");
      }

      if (sumInsuredRef.current) {
        sumInsuredRef.current.value = "0.00";
      }
      if (propertyInsuredRef.current) {
        propertyInsuredRef.current.value = "";
      }

      if (netPremiumRef.current) {
        netPremiumRef.current.value = "0.00";
      }
      if (vatRef.current) {
        vatRef.current.value = "0.00";
      }
      if (docstampRef.current) {
        docstampRef.current.value = "0.00";
      }

      if (localGovTaxRef.current) {
        localGovTaxRef.current.value = "0.75";
      }
      if (_localGovTaxRef.current) {
        _localGovTaxRef.current.value = "0.00";
      }
      if (totalDueRef.current) {
        totalDueRef.current.value = "0.00";
      }
    },
    refEnableDisable: (disabled: boolean, department: string) => {
      if (accountRef.current) {
        accountRef.current.disabled = disabled;
      }
      if (clientIDRef.current) {
        clientIDRef.current.disabled = disabled;
      }
      if (clientNameRef.current) {
        clientNameRef.current.disabled = disabled;
      }
      if (clientAddressRef.current) {
        clientAddressRef.current.disabled = disabled;
      }
      if (agentIdRef.current) {
        agentIdRef.current.disabled = disabled;
      }
      if (agentNameRef.current) {
        agentNameRef.current.disabled = disabled;
      }
      if (agentCommisionRef.current) {
        agentCommisionRef.current.disabled = disabled;
      }
      if (saleOfficerRef.current) {
        saleOfficerRef.current.disabled = disabled;
      }

      if (policyNoRef.current) {
        policyNoRef.current.disabled = disabled;
      }

      if (dateFromRef.current) {
        dateFromRef.current.disabled = disabled;
      }
      if (dateToRef.current) {
        dateToRef.current.disabled = disabled;
      }

      if (dateIssuedRef.current) {
        dateIssuedRef.current.disabled = disabled;
      }

      if (netPremiumRef.current) {
        netPremiumRef.current.disabled = disabled;
      }
      if (vatRef.current) {
        vatRef.current.disabled = disabled;
      }
      if (docstampRef.current) {
        docstampRef.current.disabled = disabled;
      }
      if (localGovTaxRef.current) {
        localGovTaxRef.current.disabled = disabled;
      }
      if (_localGovTaxRef.current) {
        _localGovTaxRef.current.disabled = disabled;
      }

      if (totalDueRef.current) {
        totalDueRef.current.disabled = disabled;
      }
    },
    requiredField: () => {
      if (clientIDRef.current?.value === "") {
        clientIDRef.current.focus();
        alert("Client Details is Required!");
        return true;
      } else if (policyNoRef.current?.value === "") {
        policyNoRef.current.focus();
        alert("Policy No is Required!");
        return true;
      } else if (accountRef.current?.value === "") {
        accountRef.current.focus();
        alert("Account No is Required!");
        return true;
      } else {
        return false;
      }
    },
  }));

  return (
    <div
      className="main-field-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        rowGap: "20px",
      }}
    >
      {/* First Field*/}
      <div
        className="container-fields"
        style={{
          display: "flex",
          columnGap: "15px",
        }}
      >
        {/* Insurer Information*/}
        <div
          className="container-max-width"
          style={{
            width: "50%",
            border: "1px solid #9ca3af",
            boxSizing: "border-box",
            padding: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              fontSize: "14px",
              background: "#F1F1F1",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Insurer Information
          </span>
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "70%",
            }}
            label={{
              title: "Client ID:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  props.clientSearch(e.currentTarget.value);
                }
              },
            }}
            icon={<SearchIcon sx={{ fontSize: "18px" }} />}
            onIconClick={(e) => {
              e.preventDefault();
              props.clientSearch(clientIDRef.current?.value);
            }}
            inputRef={clientIDRef}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "90%",
            }}
            label={{
              title: "Name:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                }
              },
            }}
            inputRef={clientNameRef}
          />
          <TextAreaInput
            containerClassName="custom-input"
            label={{
              title: "Address",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            textarea={{
              disabled: props.disabled,
              rows: 3,
              style: { flex: 1 },
              defaultValue: "",
              onChange: (e) => {},
            }}
            _inputRef={clientAddressRef}
          />
        </div>
        {/* Agent Information*/}
        <div
          className="container-max-width"
          style={{
            width: "50%",
            border: "1px solid #9ca3af",
            boxSizing: "border-box",
            padding: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              fontSize: "14px",
              background: "#F1F1F1",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Agent Information
          </span>
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "70%",
            }}
            label={{
              title: "Agent ID:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  props.agentSearch(e.currentTarget.value);
                }
              },
            }}
            icon={<SearchIcon sx={{ fontSize: "18px" }} />}
            onIconClick={(e) => {
              e.preventDefault();
              props.agentSearch(agentIdRef.current?.value);
            }}
            inputRef={agentIdRef}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "90%",
            }}
            label={{
              title: "Name:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                }
              },
            }}
            inputRef={agentNameRef}
          />
          <TextFormatedInput
            containerClassName="custom-input"
            label={{
              title: "Commission:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            containerStyle={{
              width: "50%",
            }}
            input={{
              disabled: props.disabled,
              defaultValue: "0.00",
              type: "text",
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                }
              },
            }}
            inputRef={agentCommisionRef}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "100%",
            }}
            label={{
              title: "Sale Officer:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                }
              },
            }}
            inputRef={saleOfficerRef}
          />
        </div>
      </div>
      {/* Second Field*/}
      <div
        className="container-fields"
        style={{
          display: "flex",
          columnGap: "15px",
        }}
      >
        {/* Marine Policy*/}
        <div
          className="container-max-width"
          style={{
            width: "50%",
            border: "1px solid #9ca3af",
            boxSizing: "border-box",
            padding: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              fontSize: "14px",
              background: "#F1F1F1",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Marine Policy
          </span>
          <SelectInput
            containerClassName="custom-input"
            ref={_accountRef}
            label={{
              title: "Account:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            selectRef={accountRef}
            select={{
              disabled: props.disabled,
              style: { flex: 1, height: "22px" },
              defaultValue: "",
              onChange: props.onChangeAccount,
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  policyNoRef.current?.focus();
                }
              },
            }}
            containerStyle={{
              width: "90%",
            }}
            datasource={[]}
            values={"Account"}
            display={"Account"}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "90%",
            }}
            label={{
              title: "Policy No: ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "text",
              style: { width: "calc(100% - 150px) " },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  dateFromRef.current?.focus();
                }
              },
            }}
            inputRef={policyNoRef}
          />
        </div>
        {/* Period of Insurance*/}
        <div
          className="container-max-width"
          style={{
            width: "50%",
            border: "1px solid #9ca3af",
            boxSizing: "border-box",
            padding: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              fontSize: "14px",
              background: "#F1F1F1",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Period of Insurance
          </span>
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "50%",
            }}
            label={{
              title: "Date From:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "date",
              defaultValue: format(new Date(), "yyyy-MM-dd"),
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  dateToRef.current?.focus();
                }
              },
            }}
            inputRef={dateFromRef}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "50%",
            }}
            label={{
              title: "Date To:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "date",
              defaultValue: format(addYears(new Date(), 1), "yyyy-MM-dd"),
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  dateIssuedRef.current?.focus();
                }
              },
            }}
            inputRef={dateToRef}
          />
          <TextInput
            containerClassName="custom-input"
            containerStyle={{
              width: "50%",
            }}
            label={{
              title: "Date Issued:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            input={{
              disabled: props.disabled,
              type: "date",
              defaultValue: format(new Date(), "yyyy-MM-dd"),
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  sumInsuredRef.current?.focus();
                }
              },
            }}
            inputRef={dateIssuedRef}
          />
        </div>
      </div>
      {/* Last Field*/}
      {/* Insured Unit*/}
      <div
        className="container-fields"
        style={{
          width: "100%",
          border: "1px solid #9ca3af",
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          rowGap: "5px",
          columnGap: "10px",
          padding: "15px",
        }}
      >
        <div
          style={{
            flex: 1,
            rowGap: "5px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          <TextFormatedInput
            containerClassName="custom-input"
            label={{
              title: "Sum Insured :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            containerStyle={{
              width: "300px",
            }}
            input={{
              disabled: props.disabled,
              defaultValue: "0.00",
              type: "text",
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  propertyInsuredRef.current?.focus();
                }
              },
            }}
            inputRef={sumInsuredRef}
          />
          <TextAreaInput
            containerClassName="custom-input "
            containerStyle={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            label={{
              title: "Property Insured :",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            textarea={{
              disabled: props.disabled,
              rows: 8,
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  netPremiumRef.current?.focus();
                }
              },
            }}
            _inputRef={propertyInsuredRef}
          />
        </div>
        <div
          style={{
            width: "100%",
            border: "1px solid #9ca3af",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            flex: 1,
            padding: "5px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-12px",
              left: "20px",
              fontSize: "14px",
              background: "#F1F1F1",
              padding: "0 2px",
              fontWeight: "bold",
            }}
          >
            Premiums
          </span>
          <div
            style={{
              display: "flex",
              columnGap: "10px",
              height: "22px",
            }}
          >
            <TextFormatedInput
              label={{
                title: "Net Premium :",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "150px",
                },
              }}
              containerStyle={{
                width: "100%",
              }}
              input={{
                disabled: props.disabled,
                defaultValue: "0.00",
                type: "text",
                style: { width: "calc(100% - 150px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    vatRef.current?.focus();
                    props.onComputation({
                      netPremiumRef,
                      vatRef,
                      docstampRef,
                      localGovTaxRef,
                      _localGovTaxRef,
                      totalDueRef,
                    });
                  }
                },
              }}
              inputRef={netPremiumRef}
            />
            <div
              style={{
                height: "100%",
                width: "50px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                ref={cumputationButtonRef}
                size="small"
                color="info"
                onClick={() => {
                  props.onComputation({
                    netPremiumRef,
                    vatRef,
                    docstampRef,
                    localGovTaxRef,
                    _localGovTaxRef,
                    totalDueRef,
                  });
                }}
              >
                <CalculateIcon />
              </IconButton>
            </div>
          </div>

          <TextFormatedInput
            label={{
              title: "Vat:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            containerStyle={{
              width: "100%",
            }}
            input={{
              disabled: props.disabled,
              defaultValue: "0.00",
              type: "text",
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  docstampRef.current?.focus();
                }
              },
            }}
            inputRef={vatRef}
          />
          <TextFormatedInput
            label={{
              title: "Doc Stamp:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            containerStyle={{
              width: "100%",
            }}
            input={{
              disabled: props.disabled,
              defaultValue: "0.00",
              type: "text",
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  localGovTaxRef.current?.focus();
                }
              },
            }}
            inputRef={docstampRef}
          />
          <div
            style={{
              display: "flex",
              columnGap: "10px",
              height: "22px",
              width: "100%",
            }}
          >
            <TextFormatedInput
              label={{
                title: "Local Gov Tax",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "150px",
                },
              }}
              containerStyle={{
                width: "70%",
              }}
              input={{
                disabled: props.disabled,
                defaultValue: "0.0075",
                type: "text",
                style: { width: "calc(100% - 150px)" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    _localGovTaxRef.current?.focus();
                  }
                },
              }}
              inputRef={localGovTaxRef}
            />
            <TextFormatedInput
              label={{
                title: "",
                style: {
                  display: "none",
                },
              }}
              containerStyle={{
                width: "30%",
              }}
              input={{
                disabled: props.disabled,
                defaultValue: "0.00",
                type: "text",
                style: { width: "100%" },
                onKeyDown: (e) => {
                  if (e.code === "NumpadEnter" || e.code === "Enter") {
                    totalDueRef.current?.focus();
                  }
                },
              }}
              inputRef={_localGovTaxRef}
            />
          </div>
          <div
            style={{
              width: "100%",
              border: "1px dashed black",
              margin: "5px 0px",
            }}
          ></div>
          <TextFormatedInput
            label={{
              title: "Total Due:",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "150px",
              },
            }}
            containerStyle={{
              width: "100%",
            }}
            input={{
              disabled: props.disabled,
              defaultValue: "0.00",
              type: "text",
              style: { width: "calc(100% - 150px)" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                }
              },
            }}
            inputRef={totalDueRef}
          />
        </div>
      </div>
    </div>
  );
});
