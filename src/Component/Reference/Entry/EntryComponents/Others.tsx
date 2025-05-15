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
import { Autocomplete, TextAreaInput, TextInput } from "../../../UpwardFields";
import { DataGridViewReact } from "../../../DataGridViewReact";

const othersColumn = [
  { key: "entry_others_id", label: "ID", width: 130 },
  {
    key: "ShortName",
    label: "ShortName",
    width: 200,
  },
  {
    key: "description",
    label: "Description",
    width: 400,
  },
  {
    key: "remarks",
    label: "Remarks",
    width: 400,
  },

  {
    key: "createdAt",
    label: "createdAt",
    width: 200,
    hide: true,
  },
  {
    key: "sub_account",
    label: "sub_account",
    width: 200,
    hide: true,
  },
];
export default function Others() {
  const { myAxios, user } = useContext(UserContext);
  const [mode, setMode] = useState("");

  const tableRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clientIdRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const remarksRef = useRef<HTMLTextAreaElement>(null);
  const _subAccountRef = useRef<any>(null);
  const subAccountRef = useRef<HTMLSelectElement>(null);
  const Sub_AcctRef = useRef("");

  const { isPending: loadingClientId, mutate: mutateClientId } = useMutation({
    mutationKey: ["fixed_assets-generate-id"],
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
    mutationKey: ["add-entry-others"],
    mutationFn: async (variables: any) =>
      await myAxios.post("/reference/id-entry-others", variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess,
  });
  const { mutate: mutateEdit, isPending: loadingEdit } = useMutation({
    mutationKey: ["id-entry-others-update"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/id-entry-others-update`, variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
    onSuccess,
  });
  const { mutate: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/entry-delete?entry=Others`, variables, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess,
  });
  const { isPending: isLoadingSearch, mutate: mutateSearch } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (variables: any) =>
      await myAxios.post(`/reference/search-entry`, variables, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }),
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
        if (_subAccountRef.current)
          _subAccountRef.current.setDataSource(res.data?.subAccount);
        wait(100).then(() => {
          const data = res.data?.subAccount.filter(
            (itm: any) => itm.Acronym === "HO"
          );

          if (subAccountRef.current)
            subAccountRef.current.value = data[0].ShortName;
          Sub_AcctRef.current = data[0].Sub_Acct;
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
      entry: "Others",
    });
    mutateClientIdRef.current({ sign: "O", type: "entry others" });
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
        entry: "Others",
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
    if (descriptionRef.current?.value === "") {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Full Name is required!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const state = {
      entry_others_id: clientIdRef.current?.value,
      description: descriptionRef.current?.value,
      remarks: remarksRef.current?.value,
      sub_account: Sub_AcctRef.current,
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
      mutateClientIdRef.current({ sign: "O", type: "entry others" });
      mutateSubAcctRef.current({});

      if (descriptionRef.current) {
        descriptionRef.current.value = "";
      }
      if (remarksRef.current) {
        remarksRef.current.value = "";
      }
      if (subAccountRef.current) {
        subAccountRef.current.value = "Head Office";
      }
    });
  }

  return (
    <>
      <PageHelmet title="ID Entry - Fixed Assets" />
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
                  entry: "Others",
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
                entry: "Others",
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
                mutateClientIdRef.current({ sign: "O", type: "entry others" });
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
              title: "Fixed Assets ID: ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "130px",
              },
            }}
            containerStyle={{ width: "50%" }}
            input={{
              disabled: mode === "",
              readOnly: true,
              type: "text",
              style: { width: "calc(100% - 130px)", height: "22px" },
              onKeyDown: (e) => {
                if (e.code === "NumpadEnter" || e.code === "Enter") {
                  descriptionRef.current?.focus();
                }
              },
            }}
            inputRef={clientIdRef}
          />
          <TextAreaInput
            containerClassName="custom-input"
            label={{
              title: "Description : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "130px",
              },
            }}
            containerStyle={{
              alignItems: "flex-start",
              width: "100%",
            }}
            textarea={{
              disabled: mode === "",
              style: { width: "calc(100% - 130px)", height: "50px" },
              onKeyDown: (e) => {
                e.stopPropagation();
                if (
                  (e.code === "NumpadEnter" && !e.shiftKey) ||
                  (e.code === "Enter" && !e.shiftKey)
                ) {
                  subAccountRef.current?.focus();
                }
              },
            }}
            _inputRef={descriptionRef}
          />
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
            ref={_subAccountRef}
            containerStyle={{
              width: "50%",
            }}
            label={{
              title: "Sub Account : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "165px",
              },
            }}
            DisplayMember={"ShortName"}
            DataSource={[]}
            inputRef={subAccountRef}
            input={{
              style: {
                width: "100%",
              },
            }}
            onChange={(selected: any, e: any) => {
              if (subAccountRef.current)
                subAccountRef.current.value = selected.ShortName;
              console.log(selected);

              Sub_AcctRef.current = selected.Sub_Acct;
            }}
            onKeydown={(e: any) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                e.preventDefault();
                remarksRef.current?.focus();
              }
            }}
          />

          <TextAreaInput
            containerClassName="custom-input"
            label={{
              title: "Remarks : ",
              style: {
                fontSize: "12px",
                fontWeight: "bold",
                width: "130px",
              },
            }}
            containerStyle={{
              alignItems: "flex-start",
            }}
            textarea={{
              disabled: mode === "",
              style: { width: "100%", height: "50px" },
              onKeyDown: (e) => {
                e.stopPropagation();
                if (
                  (e.code === "NumpadEnter" && !e.shiftKey) ||
                  (e.code === "Enter" && !e.shiftKey)
                ) {
                }
              },
            }}
            _inputRef={remarksRef}
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
        }}
      >
        <DataGridViewReact
          height="340px"
          ref={tableRef}
          rows={[]}
          columns={othersColumn}
          getSelectedItem={(rowSelected: any, _: any, RowIndex: any) => {
            if (rowSelected) {
              setMode("edit");
              wait(100).then(() => {
                if (clientIdRef.current) {
                  clientIdRef.current.value = rowSelected[0];
                }
                if (subAccountRef.current) {
                  subAccountRef.current.value = rowSelected[1];
                }
                if (descriptionRef.current) {
                  descriptionRef.current.value = rowSelected[2];
                }
                if (remarksRef.current) {
                  remarksRef.current.value = rowSelected[3];
                }
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
              mutateClientIdRef.current({ sign: "O", type: "entry others" });
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
