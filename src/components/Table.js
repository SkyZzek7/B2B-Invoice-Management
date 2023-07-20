import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,
  Slide,
} from "@mui/material";
import { borderRadius, width } from "@mui/system";
import { wait } from "@testing-library/user-event/dist/utils";
import "./ButtonRow.css";
import DialogData from "./DialogData";
import React, { useEffect, useState } from "react";
import {
  GetAdvancedSearchData,
  getData,
  GetSearchData,
} from "../services/Data";
import { makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { IconButton, LoadingButton } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-columnHeaderTitle": {
      overflow: "visible",
      lineHeight: "1.5rem",
      whiteSpace: "normal",
    },
    "& .MuiTablePagination-root:last-child": {
      color: "white",
    },
    "& .MuiSelect-icon": {
      color: " white",
    },
    "& .MuiButtonBase-root MuiIconButton-root MuiDataGrid-menuIconButton MuiIconButton-sizeSmall":
      {
        color: "white",
      },
  },
});

const Table = ({
  setPredictedRows,
  predictedRows,
  setSelection,
  // selectedRows,
  setinputVal,
  currentSelection,
  // value,
  inputVal,
  setAdvancedSearchOptions,
  advancedSearchOptions,
  setCustIDVisible,
}) => {
  const [dialogOpen, openDialog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  // console.log(selectedRows);
  const [currentObj, setCOB] = React.useState(<></>);

  const [value, setValue] = useState("");

  const handleButtonClick = (e) => {
    for (let i = 1; i <= 3; i++) {
      let l = "b" + i.toString();
      if (e.target.id == l) {
        console.log("SELECTED " + i);
        document.getElementById(l).style.background = "#14AFF1";
      } else {
        console.log("NON SEL " + i);
        document.getElementById(l).style.background = "#293C4A";
      }
    }
    setSelection(e.target.id);
  };

  const classes = useStyles();
  const [data, setData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "sl_no", headerName: "slno", width: 72 },
    { field: "business_code", headerName: "Business Code", width: 109 },
    { field: "cust_number", headerName: "Customer Number", width: 107 },
    { field: "clear_date", headerName: "Clear Date" },
    { field: "buisness_year", headerName: "Buisness Year", width: 109 },
    { field: "doc_id", headerName: "Doc ID" },
    { field: "posting_date", headerName: "Posting Date" },
    {
      field: "document_create_date",
      headerName: "Document Create Date",
      width: 110,
    },
    { field: "due_in_date", headerName: "Due Date" },
    { field: "invoice_currency", headerName: "Invoice Currency", width: 105 },
    { field: "document_type", headerName: "Document Type", width: 110 },
    { field: "posting_id", headerName: "Posting ID" },
    { field: "total_open_amount", headerName: "Total Open Amount" },
    { field: "baseline_create_date", headerName: "Baseline Create Date" },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      width: 109,
    },
    { field: "invoice_id", headerName: "Invoice ID" },
    { field: "aging_bucket", headerName: "AGING BUCKET" },
  ];

  useEffect(() => {
    async function getMyData() {
      let response = await getData();
      response = await response;
      setData(response);
    }
    getMyData();
  }, []);
  const predictHandler = () => {
    if (selectedRows.length == 0) {
      alert("You must select a row!");
    } else {
      let docIdArray = selectedRows.map((rowNumber) => {
        return Number(data[rowNumber].doc_id);
      });
      console.log(docIdArray);

      const resultArray = axios
        .post(
          "http://127.0.0.1:5000/get_prediction",
          {
            data: docIdArray,
          },
          {}
        )
        .then((response) => {
          console.log(response.data);
          let k = 0;
          for (let i = 0; i < selectedRows.length; i++) {
            if (data[selectedRows[i]].clear_date == "NA") {
              data[selectedRows[i]].doc_id = response.data[k].aging_bucket;
              k++;
            }
          }
          // data.aging_bucket = response.data[0];
          // setAging_bucket(data.aging_bucket)
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // data.aging_bucket = resultArray[0];
    }
  };
  const [pageSize, setPageSize] = React.useState(10);
  const [rowData, setRowData] = useState({
    sl_no: "",
    business_code: "",
    cust_number: "",
    clear_date: "",
    buisness_year: "",
    doc_id: "",
    posting_date: "",
    document_create_date: "",
    due_in_date: "",
    invoice_currency: "",
    document_type: "",
    posting_date: "",
    total_open_amount: "",
    baseline_create_date: "",
    cust_payment_terms: "",
    invoice_id: "",
    aging_bucket: "",
  });
  return (
    <div className="Table">
      <div className="button-row">
        <div className="three-buttons">
          <button
            id="b1"
            onClick={predictHandler}
            className="button-rounded left-rounded"
          >
            PREDICT
          </button>

          <button
            id="b2"
            onClick={(e) => {
              console.log(currentSelection);
              if (currentSelection == "b2") {
                document.getElementById(e.target.id).style.background =
                  "#293C4A";

                setSelection("");
              } else {
                handleButtonClick(e);
              }
            }}
            className="button-square button-rounded"
          >
            ANALYTICS VIEW
          </button>

          <button
            id="b3"
            onClick={(e) => {
              setCOB(
                DialogData(
                  "adv_search",
                  openDialog,
                  (d) => {
                    let a = {};

                    for (let i = 0; i < d.length; i++) {
                      if (d[i].value != undefined && d[i].value.length > 0)
                        a[d[i].name] = d[i].value;
                    }

                    console.log(a);

                    if (Object.entries(a).length == 0) {
                      wait(3000).then((e) => setErrorMessage(""));
                      setErrorMessage(
                        "Kindly enter the value for any one of the fields"
                      );
                      return;
                    }

                    openDialog(false);

                    async function advSearch() {
                      let response = await GetAdvancedSearchData(
                        a.doc_id,
                        a.invoice_id,
                        a.cust_number,
                        a.buisness_year
                      );
                      response = await response;
                      setData(response);
                    }
                    advSearch();
                  },
                  (d) => {
                    for (let i = 0; i < d.length; i++) d[i].value = "";
                    openDialog(false);
                  }
                ),
                () => {
                  openDialog(false);
                }
              );
              openDialog(true);
              // }

              // setSelection(e.target.id);
            }}
            className="button-rounded right-rounded"
          >
            ADVANCED SEARCH
          </button>
        </div>

        <IconButton
          aria-label="Refresh"
          color="primary"
          component="span"
          variant="outlined"
          style={{
            marginTop: "3.1vh",
            marginLeft: "1vw",
            // marginRight: "5vw",
            backgroundColor: "white",
            borderRadius: "10px",
            height: "2.2rem",
            border: "1px solid",
            borderColor: "blue",
          }}
          onClick={() => {
            async function getMyData() {
              let response = await getData();
              response = await response;
              setData(response);
            }
            getMyData();
          }}
        >
          <ReplayRoundedIcon />
        </IconButton>

        <TextField
          id="outlined-basic"
          label="Search Customer Id"
          size="small"
          variant="outlined"
          style={{
            marginTop: "3.5vh",
            marginLeft: "6vw",
            marginRight: "5vw",
            textAlign: "center",
            backgroundColor: "white",
            fontSize: "20px",
            borderRadius: "6px",
            height: "5.5vh",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setValue(e.target.value);
              console.log(e.target.value);
              async function search() {
                let response = await GetSearchData(e.target.value);
                response = await response;
                setData(response);
              }
              search();
            }
          }}
        ></TextField>

        <div className="three-buttons">
          <button
            id="b4"
            onClick={() => {
              setCOB(
                DialogData(
                  "add",
                  openDialog,
                  async (d) => {
                    let a = {};
                    console.log(d);
                    for (let i = 0; i < d.length; i++) {
                      if (d[i].value != undefined || d[i].value != "")
                        a[d[i].name] = d[i].value;
                    }

                    console.log(a);

                    for (const [key, val] of Object.entries(a)) {
                      if (key !== "clear_date" && val == "") {
                        wait(3000).then((e) => setErrorMessage(""));
                        setErrorMessage(
                          "The required field " + key + " is missing"
                        );
                        return;
                      }
                    }

                    try {
                      let response = await fetch(
                        "http://localhost:8080/Hrc_1930102/Add",
                        {
                          method: "POST",
                          body: new URLSearchParams(a),
                          headers: {
                            // "Access-Control-Allow-Origin": "*",
                            // Accept: "application/json",
                            // "Content-Type": "application/x-www-form-urlencoded"
                          },
                        }
                      );

                      let e = await response.json();

                      if (response.ok) {
                        for (let i = 0; i < d.length; i++) d[i].value = "";

                        openDialog(false);
                      } else {
                        throw e;
                      }
                    } catch (err) {
                      wait(3000).then((e) => setErrorMessage(""));
                      setErrorMessage(err.message);
                    }
                  },
                  (d) => {
                    for (let i = 0; i < d.length; i++) d[i].value = "";
                    openDialog(false);
                  }
                ),
                () => {
                  openDialog(false);
                }
              );

              openDialog(true);
            }}
            className="button-rounded left-rounded"
          >
            ADD
          </button>

          <button
            id="b5"
            onClick={() => {
              setCOB(
                DialogData(
                  "edit",
                  openDialog,
                  async (d) => {
                    // EDIT CLICK

                    // Checking if any rows are selected or not
                    if (selectedRows.length == 0) {
                      wait(3000).then((e) => setErrorMessage(""));
                      setErrorMessage("You have not selected any rows");
                      return;
                    }

                    // PARSING THE DATA
                    let a = {};
                    for (let i = 0; i < d.length; i++)
                      if (d[i].value != undefined && d[i].value != "")
                        a[d[i].name] = d[i].value;

                    console.log(Object.assign({ sl_no: selectedRows }, a));
                    if (
                      a["invoice_currency"] === undefined &&
                      a["cust_payment_terms"] === undefined &&
                      a["sl_no"] === undefined
                    ) {
                      wait(3000).then((e) => setErrorMessage(""));
                      setErrorMessage("Fill atleast one of the fields");
                      return;
                    }

                    let body = Object.assign(
                      { sl_no: selectedRows.map((e) => e.sl_no) },
                      a
                    );
                    fetch("http://localhost:8080/Hrc_1930102/Edit", {
                      method: "POST",
                      // body: JSON.stringify(body),
                      body: new URLSearchParams(body),
                      headers: {
                        //      "Access-Control-Allow-Origin": "*",
                        // Accept: "application/json",
                        // "Content-Type": "application/x-www-form-urlencoded",
                      },
                    }).then((ed) =>
                      ed
                        .json()
                        .then((e) => {
                          console.log(e);
                          if (ed.ok) {
                            for (let i = 0; i < d.length; i++) d[i].value = "";

                            openDialog(false);
                            window.location.reload();
                          } else throw e;
                        })
                        .catch((err) => {
                          wait(3000).then((e) => setErrorMessage(""));
                          // setErrorMessage(err.message);
                        })
                    );
                    openDialog(false);
                  },
                  (d) => {
                    openDialog(false);
                    // CANCEL CLICK
                  }
                )
              );

              openDialog(true);
            }}
            className="button-square button-rounded"
          >
            EDIT
          </button>

          <button
            id="b6"
            onClick={() => {
              setCOB(
                DialogData(
                  "delete",
                  openDialog,
                  () => {
                    openDialog(false);
                  },
                  () => {
                    if (selectedRows.length == 0) {
                      // wait(3000).then((e) => setErrorMessage(""));
                      // setErrorMessage("You have not selected any rows");
                      // return;
                      alert("Please Select atleast one row to delete");
                      return;
                    } else {
                      console.log(selectedRows);
                    }

                    let body = { sl_no: selectedRows.map((e) => e.sl_no) };
                    fetch("http://localhost:8080/Hrc_1930102/Delete", {
                      method: "POST",
                      //   body: JSON.stringify(body),
                      body: new URLSearchParams(body),
                      headers: {},
                    }).then((ed) =>
                      ed
                        .json()
                        .then((e) => {
                          console.log(e);
                          if (ed.ok) {
                            openDialog(false);
                            window.location.reload();
                          } else throw e;
                        })
                        .catch((err) => {
                          wait(3000).then((e) => setErrorMessage(""));
                          setErrorMessage(err.message);
                        })
                    );
                  }
                )
              );
              openDialog(true);
            }}
            className="button-rounded right-rounded"
          >
            DELETE
          </button>
        </div>
      </div>

      <div>
        <Dialog
          maxHeight={"90vh"}
          maxWidth={"100%"}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: " #2C4350",
              border: "none",
              borderRadius: 0,
            },
          }}
          open={dialogOpen}
          keepMounted
          onClose={() => {
            openDialog(false);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle color="white">{currentObj.title}</DialogTitle>
          <DialogContent>
            {errorMessage != "" && (
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  borderRadius: "15px",
                  justifyContent: "center",
                  width: "90%",
                  padding: "5px 3px 5px 3px",
                  backgroundColor: "red",
                  color: "white",
                  boxShadow: "inset 0 0 20px red",
                }}
              >
                {/* {"ERROR: " + errorMessage + "!"} */}
              </div>
            )}
            {currentObj.content}

            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>
          {currentObj.actions}
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          className={classes.root}
          headerHeight={85}
          style={{ backgroundColor: "#283d4a", color: "white" }}
          sx={{
            "& .MuiDataGrid-cell:hover": { color: "primary.main" },
            "& .MuiPagination-root": { color: "#eee" },
          }}
          getRowId={(s) => s.sl_no}
          rows={data}
          columns={columns}
          //pageSize={10}
          rowHeight={32}
          //rowsPerPageOptions={[10]}
          checkboxSelection
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          onSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRow = data.filter((row) =>
              selectedIds.has(row.sl_no)
            );
            console.log(selectedRow);
            setSelectedRows(selectedRow);
          }}
          {...data}
        />
      </div>
    </div>
  );
};

export default Table;
