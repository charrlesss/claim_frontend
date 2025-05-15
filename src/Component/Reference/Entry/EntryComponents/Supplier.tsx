import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { pink } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../../../App";
import { useMutation } from "@tanstack/react-query";
import { wait } from "../../../../Lib/wait";
import {
  codeCondfirmationAlert,
  saveCondfirmationAlert,
} from "../../../../Lib/confirmationAlert";
import PageHelmet from "../../../PageHelmet";
import { Loading } from "../../../Loading";
import {
  Autocomplete,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "../../../UpwardFields";
import { DataGridViewReact } from "../../../DataGridViewReact";

const clientColumn = [
  { key: "entry_supplier_id", label: "ID", width: 130 },
  {
    key: "ShortName",
    label: "Sub Account",
    width: 120,
  },
  { key: "company", label: "Company", width: 200 },
  { key: "firstname", label: "First Name", width: 200 },
  {
    key: "lastname",
    label: "Last Name",
    width: 200,
  },
  {
    key: "middlename",
    label: "Middle Name",
    width: 200,
  },
  {
    key: "mobile",
    label: "Mobile",
    width: 200,
  },

  {
    key: "option",
    label: "Option",
    width: 130,
  },
  {
    key: "tin_no",
    label: "TIN",
    width: 130,
  },
  {
    key: "address",
    label: "Address",
    width: 500,
  },
  {
    key: "createdAt",
    label: "Created At",
    width: 130,
    hide: true,
  },

  {
    key: "sub_account",
    label: "sub_account",
    width: 300,
    hide: true,
  },
];
export default function Supplier() {
  const { myAxios, user } = useContext(UserContext);
  const [option, setOption] = useState("individual");
  const [mode, setMode] = useState("");

  const tableRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clientIdRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLSelectElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const middleRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);

  const fullnameRef = useRef<HTMLTextAreaElement>(null);
  const authorizeRepRef = useRef<HTMLInputElement>(null);

  const suffixRef = useRef<HTMLInputElement>(null);
  const _subAccount = useRef<any>(null);
  const subAccount = useRef<HTMLSelectElement>(null);
  const branchCodeRef = useRef("");
  const branchRef = useRef<HTMLSelectElement>(null);

  const mobileNoRef = useRef<HTMLInputElement>(null);
  const mortgageeRef = useRef<HTMLSelectElement>(null);
  const tinRef = useRef<HTMLInputElement>(null);

  const addressRef = useRef<HTMLTextAreaElement>(null);
  const { isPending: loadingClientId, mutate: mutateClientId } = useMutation({
    mutationKey: ["supplier-generate-id"],
    mutationFn: async (variables: any) =>
      await myAxios.post("/reference/id-entry-generate-id", variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess: (res) => {
      wait(100).then(() => {
        if (clientIdRef.current) {
          clientIdRef.current.value = res.data.generateID;
        }
      });
    },
  });
  const { mutate: mutateAdd, isPending: loadingAdd } = useMutation({
    mutationKey: ["add-entry-supplier"],
    mutationFn: async (variables: any) =>
      await myAxios.post("/reference/id-entry-supplier", variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess,
  });
  const { mutate: mutateEdit, isPending: loadingEdit } = useMutation({
    mutationKey: ["entry-supplier-update"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/id-entry-supplier-update`, variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess,
  });
  const { mutate: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/entry-delete?entry=Supplier`, variables, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess,
  });
  const { isPending: isLoadingSearch, mutate: mutateSearch } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (variables: any) =>
      await myAxios.post(
        `/reference/search-entry?entrySearch=${searchInputRef.current?.value}&entry=Client`,
        variables,
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      ),
    onSuccess: (res) => {
      tableRef.current.setDataFormated((res as any)?.data.entry);
    },
  });
  const { isPending: subAccountLoading, mutate: mutateSubAcct } = useMutation({
    mutationKey: ["sub-accounts"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/sub-account`, variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess: (res) => {
      wait(100).then(() => {
        if (_subAccount.current)
          _subAccount.current.setDataSource(res.data?.subAccount);
        wait(100).then(() => {
          const data = res.data?.subAccount.filter(
            (itm: any) => itm.Acronym === "HO"
          );

          if (subAccount.current) subAccount.current.value = data[0].ShortName;
          branchCodeRef.current = data[0].Sub_Acct;
        });
      });
    },
  });

  const mutateSearchRef = useRef(mutateSearch);
  const mutateClientIdRef = useRef(mutateClientId);
  const mutateSubAcctRef = useRef(mutateSubAcct);
  useEffect(() => {
    mutateSearchRef.current({
      search: "",
      entry: "Supplier",
    });
    mutateClientIdRef.current({ sign: "S", type: "entry supplier" });
    mutateSubAcctRef.current({});
  }, []);

  function onSuccess(res: any) {
    if (res.data.success) {
      resetField();
      setMode("");
      tableRef.current.setSelectedRow(null);
      tableRef.current.resetCheckBox();

      mutateSearchRef.current({
        search: "",
        entry: "Supplier",
      });
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
  }
  function handleOnSave(e: any) {
    if (optionRef.current?.value === "Individual") {
      if (firstnameRef.current?.value === "") {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Firstname is required!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (lastnameRef.current?.value === "") {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Lastname is required!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      if (fullnameRef.current?.value === "") {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Full Name is required!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    if (subAccount.current?.value === "") {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Sub Account is required!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const state = {
      entry_supplier_id: clientIdRef.current?.value,
      option: optionRef.current?.value,
      firstname: firstnameRef.current?.value.toLocaleUpperCase(),
      middlename: middleRef.current?.value.toLocaleUpperCase(),
      lastname: lastnameRef.current?.value.toLocaleUpperCase(),
      company: fullnameRef.current?.value.toLocaleUpperCase(),
      sub_account: branchCodeRef.current,
      mobile: mobileNoRef.current?.value,
      tin_no: tinRef.current?.value,
      address: addressRef.current?.value,
    };
    e.preventDefault();
    if (mode === "edit") {
      codeCondfirmationAlert({
        isUpdate: true,
        cb: (userCodeConfirmation) => {
          mutateEdit({ ...state, userCodeConfirmation });
        },
      });
    } else {
      saveCondfirmationAlert({
        isConfirm: () => {
          mutateAdd(state);
        },
      });
    }
  }
  function resetField() {
    wait(100).then(() => {
      mutateClientIdRef.current({ sign: "S", type: "entry supplier" });
      mutateSubAcctRef.current({});
      setOption("individual");

      if (optionRef.current) {
        optionRef.current.value = "individual";
      }
      if (firstnameRef.current) {
        firstnameRef.current.value = "";
      }
      if (middleRef.current) {
        middleRef.current.value = "";
      }
      if (lastnameRef.current) {
        lastnameRef.current.value = "";
      }
      if (fullnameRef.current) {
        fullnameRef.current.value = "";
      }
      if (authorizeRepRef.current) {
        authorizeRepRef.current.value = "";
      }
      if (suffixRef.current) {
        suffixRef.current.value = "";
      }
      if (mobileNoRef.current) {
        mobileNoRef.current.value = "";
      }
      if (mortgageeRef.current) {
        mortgageeRef.current.value = "";
      }
      if (tinRef.current) {
        tinRef.current.value = "";
      }
      if (addressRef.current) {
        addressRef.current.value = "";
      }
      if (branchRef.current) {
        branchRef.current.value = "";
      }
      branchCodeRef.current = "";
    });
  }

  return (
    <>
      <PageHelmet title="ID Entry - Client" />
      {(loadingClientId ||
        loadingAdd ||
        loadingEdit ||
        loadingDelete ||
        isLoadingSearch ||
        subAccountLoading) && <Loading />}
      <div
        style={{
          display: "flex",
          columnGap: "10px",
          marginBottom: "10px",
        }}
      >
        <TextInput
          containerClassName="custom-input"
          containerStyle={{
            width: "500px",
          }}
          label={{
            title: "Search: ",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              width: "70px",
            },
          }}
          input={{
            className: "search-input-up-on-key-down",
            type: "search",
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                e.preventDefault();
                mutateSearch({
                  search: e.currentTarget.value,
                  entry: "Supplier",
                });
              }
            },
            style: { width: "100%" },
          }}
          icon={<SearchIcon sx={{ fontSize: "18px" }} />}
          onIconClick={(e) => {
            e.preventDefault();
            if (searchInputRef.current) {
              mutateSearch({
                search: searchInputRef.current.value,
                entry: "Supplier",
              });
            }
          }}
          inputRef={searchInputRef}
        />
        <div
          className="button-action-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "5px",
            marginLeft: "10px",
          }}
        >
          {mode === "" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              id="entry-header-save-button"
              sx={{
                height: "22px",
                fontSize: "11px",
              }}
              onClick={() => {
                mutateClientIdRef.current({
                  sign: "S",
                  type: "entry supplier",
                });
                setMode("add");
              }}
            >
              New
            </Button>
          )}
          <Button
            id="save-entry-header"
            color="primary"
            variant="contained"
            type="submit"
            sx={{
              height: "22px",
              fontSize: "11px",
            }}
            onClick={handleOnSave}
            startIcon={<SaveIcon />}
            disabled={mode === ""}
            loading={loadingAdd || loadingEdit}
          >
            Save
          </Button>

          <Button
            disabled={mode === ""}
            id="save-entry-header"
            variant="contained"
            sx={{
              height: "22px",
              fontSize: "11px",
              backgroundColor: pink[500],
              "&:hover": {
                backgroundColor: pink[600],
              },
            }}
            loading={loadingDelete}
            startIcon={<DeleteIcon />}
            onClick={() => {
              codeCondfirmationAlert({
                isUpdate: false,
                cb: (userCodeConfirmation) => {
                  mutateDelete({
                    id: clientIdRef.current?.value,
                    userCodeConfirmation,
                  });
                },
              });
            }}
          >
            Delete
          </Button>
          {mode !== "" && (
            <Button
              sx={{
                height: "22px",
                fontSize: "11px",
              }}
              variant="contained"
              startIcon={<CloseIcon />}
              color="error"
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
                    resetField();
                    setMode("");
                    tableRef.current.setSelectedRow(null);
                    tableRef.current.resetCheckBox();
                  }
                });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      <div
        className="container-fields-custom-client"
        style={{
          display: "flex",
          columnGap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            flex: 1,
          }}
        >
          <TextInput
            containerClassName="custom-input"
            label={{
              title: "Client ID : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "130px",
              },
            }}
            input={{
              disabled: mode === "",
              readOnly: true,
              type: "text",
              style: { width: "100%", height: "22px" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  optionRef.current?.focus();
                }
              },
            }}
            inputRef={clientIdRef}
          />
          <SelectInput
            containerClassName="custom-input custom-label"
            label={{
              title: "Option : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "130px",
              },
            }}
            selectRef={optionRef}
            select={{
              disabled: mode === "",
              value: option,
              style: { width: "100%", height: "22px" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  e.preventDefault();
                  if (option === "Individual") {
                    firstnameRef.current?.focus();
                  } else {
                    fullnameRef.current?.focus();
                  }
                }
              },
              onChange: (e) => {
                setOption(e.currentTarget.value);
              },
            }}
            datasource={[
              { key: "Individual", value: "individual" },
              { key: "Company", value: "company" },
            ]}
            values={"value"}
            display={"key"}
          />
          {option === "individual" && (
            <>
              <TextInput
                containerClassName="custom-input"
                label={{
                  title: "First Name : ",
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "130px",
                  },
                }}
                input={{
                  disabled: mode === "",
                  type: "text",
                  style: {
                    width: "100%",
                    height: "22px",
                    textTransform: "uppercase",
                  },
                  onKeyDown: (e) => {
                    if (e.code === "NumpadEnter" || e.code === "Enter") {
                      middleRef.current?.focus();
                    }
                  },
                }}
                inputRef={firstnameRef}
              />
              <TextInput
                containerClassName="custom-input"
                label={{
                  title: "Middle Name : ",
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "130px",
                  },
                }}
                input={{
                  disabled: mode === "",
                  type: "text",
                  style: {
                    width: "100%",
                    height: "22px",
                    textTransform: "uppercase",
                  },
                  onKeyDown: (e) => {
                    if (e.code === "NumpadEnter" || e.code === "Enter") {
                      lastnameRef.current?.focus();
                    }
                  },
                }}
                inputRef={middleRef}
              />
              <TextInput
                containerClassName="custom-input"
                label={{
                  title: "Last Name : ",
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "130px",
                  },
                }}
                input={{
                  disabled: mode === "",
                  type: "text",
                  style: {
                    width: "100%",
                    height: "22px",
                    textTransform: "uppercase",
                  },
                  onKeyDown: (e) => {
                    if (e.code === "NumpadEnter" || e.code === "Enter") {
                      suffixRef.current?.focus();
                    }
                  },
                }}
                inputRef={lastnameRef}
              />
            </>
          )}

          {option === "company" && (
            <>
              <TextAreaInput
                containerClassName="custom-input"
                label={{
                  title: "Full Name : ",
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "130px",
                  },
                }}
                textarea={{
                  disabled: mode === "",
                  style: { width: "100%" },
                  onKeyDown: (e) => {
                    e.stopPropagation();
                    if (
                      (e.code === "NumpadEnter" && !e.shiftKey) ||
                      (e.code === "Enter" && !e.shiftKey)
                    ) {
                      authorizeRepRef.current?.focus();
                    }
                  },
                }}
                _inputRef={fullnameRef}
              />
            </>
          )}
        </div>
        <div
          className="clear-margin custom-padding"
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            marginBottom: "40px",
            flex: 1,
          }}
        >
          <Autocomplete
            containerClassName="custom-input"
            disableInput={mode === ""}
            ref={_subAccount}
            containerStyle={{
              width: "100%",
            }}
            label={{
              title: "Sub Account : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "110px",
              },
            }}
            DisplayMember={"ShortName"}
            DataSource={[]}
            inputRef={subAccount}
            input={{
              style: {
                width: "100%",
              },
            }}
            onChange={(selected: any, e: any) => {
              if (subAccount.current)
                subAccount.current.value = selected.ShortName;
              console.log(selected);

              branchCodeRef.current = selected.Sub_Acct;
            }}
            onKeydown={(e: any) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                e.preventDefault();
                mobileNoRef.current?.focus();
              }
            }}
          />
          <TextInput
            containerClassName="custom-input"
            label={{
              title: "Contact No. : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "110px",
              },
            }}
            input={{
              disabled: mode === "",
              type: "text",
              style: { width: "100%", height: "22px" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  mortgageeRef.current?.focus();
                }
              },
            }}
            inputRef={mobileNoRef}
          />
          <TextInput
            containerClassName="custom-input"
            label={{
              title: "TIN : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "110px",
              },
            }}
            input={{
              disabled: mode === "",
              type: "text",
              style: { width: "100%", height: "22px" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  addressRef.current?.focus();
                }
              },
            }}
            inputRef={tinRef}
          />
        </div>
        <div
          className="clear-margin "
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            marginBottom: "40px",
            flex: 1,
          }}
        >
          <TextAreaInput
            containerClassName="custom-input"
            containerStyle={{
              alignItems: "flex-start",
            }}
            label={{
              title: "Address : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "110px",
              },
            }}
            textarea={{
              disabled: mode === "",
              style: { width: "100%", height: "80px" },
              onKeyDown: (e) => {
                e.stopPropagation();
                if (
                  (e.code === "NumpadEnter" && !e.shiftKey) ||
                  (e.code === "Enter" && !e.shiftKey)
                ) {
                }
              },
            }}
            _inputRef={addressRef}
          />
        </div>
      </div>
      <div
        className="add-padding"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          flex: 1,
          marginTop: "10px",
        }}
      >
        <DataGridViewReact
          height="340px"
          ref={tableRef}
          rows={[]}
          columns={clientColumn}
          getSelectedItem={(rowSelected: any, _: any, RowIndex: any) => {
            if (rowSelected) {
              setMode("edit");
              setOption(rowSelected[7].toLowerCase());
              wait(100).then(() => {
                if (clientIdRef.current) {
                  clientIdRef.current.value = rowSelected[0];
                }
                if (subAccount.current) {
                  subAccount.current.value = rowSelected[1];
                }
                if (fullnameRef.current) {
                  fullnameRef.current.value = rowSelected[2];
                }
                if (firstnameRef.current) {
                  firstnameRef.current.value = rowSelected[3];
                }
                if (lastnameRef.current) {
                  lastnameRef.current.value = rowSelected[4];
                }
                if (middleRef.current) {
                  middleRef.current.value = rowSelected[5];
                }
                if (mobileNoRef.current) {
                  mobileNoRef.current.value = rowSelected[6];
                }
                if (optionRef.current) {
                  optionRef.current.value = rowSelected[7]
                    ?.toString()
                    .toLowerCase();
                }

                if (tinRef.current) {
                  tinRef.current.value = rowSelected[8];
                }
                if (addressRef.current) {
                  addressRef.current.value = rowSelected[9];
                }
                branchCodeRef.current = rowSelected[11];
              });
            } else {
              tableRef.current.setSelectedRow(null);
              tableRef.current.resetCheckBox();
              resetField();
              setMode("");
              return;
            }
          }}
          onKeyDown={(rowSelected: any, RowIndex: any, e: any) => {
            if (e.code === "Delete" || e.code === "Backspace") {
              wait(100).then(() => {
                codeCondfirmationAlert({
                  isUpdate: false,
                  cb: (userCodeConfirmation) => {
                    mutateDelete({
                      id: rowSelected[0],
                      userCodeConfirmation,
                    });
                  },
                });
              });
              return;
            }
          }}
        />
      </div>
      <div
        className="button-action-mobile"
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        {mode === "" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            id="entry-header-save-button"
            sx={{
              height: "22px",
              fontSize: "11px",
            }}
            onClick={() => {
              mutateClientIdRef.current({ sign: "S", type: "entry supplier" });
              setMode("add");
            }}
          >
            New
          </Button>
        )}
        <Button
          id="save-entry-header"
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            height: "22px",
            fontSize: "11px",
          }}
          onClick={handleOnSave}
          startIcon={<SaveIcon />}
          disabled={mode === ""}
          loading={loadingAdd || loadingEdit}
        >
          Save
        </Button>

        <Button
          disabled={mode === ""}
          id="save-entry-header"
          variant="contained"
          sx={{
            height: "22px",
            fontSize: "11px",
            backgroundColor: pink[500],
            "&:hover": {
              backgroundColor: pink[600],
            },
          }}
          loading={loadingDelete}
          startIcon={<DeleteIcon />}
          onClick={() => {
            codeCondfirmationAlert({
              isUpdate: false,
              cb: (userCodeConfirmation) => {
                mutateDelete({
                  id: clientIdRef.current?.value,
                  userCodeConfirmation,
                });
              },
            });
          }}
        >
          Delete
        </Button>
        {mode !== "" && (
          <Button
            sx={{
              height: "22px",
              fontSize: "11px",
            }}
            variant="contained"
            startIcon={<CloseIcon />}
            color="error"
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
                  resetField();
                  setMode("");
                  tableRef.current.setSelectedRow(null);
                  tableRef.current.resetCheckBox();
                }
              });
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </>
  );
}
