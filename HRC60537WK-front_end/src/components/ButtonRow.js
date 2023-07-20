import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Slide} from "@mui/material";
import { borderRadius, width } from "@mui/system";
import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import "./ButtonRow.css";
import DialogData from "./DialogData";
import MyGrid from "./MyGrid";

const ButtonRow = ({setPredictedRows, predictedRows, setSelection, selectedRows, setinputVal, currentSelection, value, inputVal, setAdvancedSearchOptions,advancedSearchOptions,setCustIDVisible,
}) => {
  const [dialogOpen, openDialog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  // console.log(selectedRows);
  const [currentObj, setCOB] = React.useState(<></>);

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

  // selectedRows = MyGrid.selectedRows

  return (
    <div className="button-row">
      <div className="three-buttons">
        <button
          id="b1" onClick={async () => {
            if (selectedRows.length == 0) {
              alert("Please Select atleast one row to predict");
              return;
            }
            console.log(selectedRows);
            // let respone = await fetch("http://localhost:8080/HRC/Fetch", {
            //   method: "POST",
            //   body: JSON.stringify(selectedRows),
            // });
            // let data = await respone.json();
            // let c = {};
            // for (const [key, value] of Object.entries(data.sl_no)) {
            //   c[value] = new Date(data.predicted_date[key]).toLocaleString(
            //     "en-US",
            //     { year: "numeric", month: "short", day: "numeric" }
            //   );
            // }

            // let a = Object.assign(c, predictedRows);
            // console.log(a);
            // setPredictedRows(a);
            // console.log(data);
          }}
          className="button-rounded left-rounded"
        >PREDICT</button>

        <button
          id="b2"
          onClick={(e) => {
            console.log(currentSelection);
            if (currentSelection == "b2") {
              document.getElementById(e.target.id).style.background = "#293C4A";

              setSelection("");
            } else {
              handleButtonClick(e);
            }
          }}
          className="button-square button-rounded"
        >ANALYTICS VIEW</button>

        <button id="b3" onClick={(e) => {
            if (advancedSearchOptions.isActive) {
              setAdvancedSearchOptions({ isActive: false });
              setSelection("");

              document.getElementById(e.target.id).style.background = "#293C4A";
            } else {
              setCOB(DialogData("adv_search", openDialog, (d) => {
                    let a = {};
                  
                    for (let i = 0; i < d.length; i++) {

                      if (d[i].value != undefined && d[i].value.length > 0)
                        a[d[i].name] = d[i].value;
                    }
                    console.log(a);

                    if (Object.entries(a).length == 0) {
                      wait(3000).then((e) => setErrorMessage(""));
                      setErrorMessage("Kindly enter the value for any one of the fields");
                      return;
                    }

                    openDialog(false);

                    handleButtonClick(e);

                    setAdvancedSearchOptions(
                      Object.assign({ isActive: true }, a)
                    );

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
            }

            // setSelection(e.target.id);
          }}
          className="button-rounded right-rounded"
        >ADVANCED SEARCH</button>
      </div>

      <Input id="c-search" onKeyDown={(e) => {
          if (e.which == 13) {
            let val = value.value;
            console.log(value.value);
            console.log(inputVal);

            if (val != inputVal && val.length > 0) {
              console.log("CHANGING");
              setinputVal(val);
            }
          }
        }}
        onChange={(e) => {
          value.value = e.target.value;
          if (e.target.value.length === 0 && inputVal != "") {
            console.log("GEl");
            setinputVal("");
          }
        }}
        placeholder="Search Customer Id"
        className="customer-search"
      ></Input>


      <div className="three-buttons">
        <button id="b4" onClick={() => {
            setCOB(DialogData("add", openDialog, async (d) => {
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
                      setErrorMessage("The required field " + key + " is missing");
                      return;
                    }
                  }

                  try {
                    let response = await fetch("http://localhost:8080/HRC/Add",{method: "POST", body: new URLSearchParams(a), headers: {
                          // "Access-Control-Allow-Origin": "*",
                          // Accept: "application/json",
                          // "Content-Type": "application/x-www-form-urlencoded"
                        },
                      }
                    );
                    let e = await response.json();

                    if (response.ok) {
                      for (let i = 0; i < d.length; i++)
                        d[i].value = "";

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
        >ADD</button>

        <button id="b5" onClick={() => {
            setCOB(DialogData("edit", openDialog, async (d) => {
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
                  if (a["invoice_currency"] === undefined && a["cust_payment_terms"] === undefined && a["sl_no"] === undefined) {
                    wait(3000).then((e) => setErrorMessage(""));
                    setErrorMessage("Fill atleast one of the fields");
                    return;
                  }

                  let body = Object.assign({ sl_no: selectedRows.map(e => e.sl_no) }, a);
                  fetch("http://localhost:8080/HRC/Edit", {
                    method: "POST", body: JSON.stringify(body), headers: {
                      //      "Access-Control-Allow-Origin": "*",
                      // Accept: "application/json",
                      // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    // method: "POST", body: new URLSearchParams(a), headers: {
                    //   //      "Access-Control-Allow-Origin": "*",
                    //   // Accept: "application/json",
                    //   // "Content-Type": "application/x-www-form-urlencoded",
                    // },
                  }).then((ed) =>
                    ed.json().then((e) => {
                        console.log(e);
                        if (ed.ok) {
                          for (let i = 0; i < d.length; i++)
                            d[i].value = "";

                          openDialog(false);
                          window.location.reload();
                        } else throw e;
                      })
                      .catch((err) => {
                        wait(3000).then((e) => setErrorMessage(""));
                        setErrorMessage(err.message);
                      })
                  );
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
        >EDIT</button>

        <button id="b6" onClick={() => {
            setCOB(DialogData("delete", openDialog,
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

                  // let body = { sl_no: selectedRows.map(e => e.sl_no) };
                  // fetch("http://localhost:8080/HRC/Delete", {
                  //   method: "POST",
                  //   body: JSON.stringify(body),
                  //   // body: new URLSearchParams(body),
                  //   headers: {},
                  // }).then((ed) =>
                  //   ed
                  //     .json()
                  //     .then((e) => {
                  //       console.log(e);
                  //       if (ed.ok) {
                  //         openDialog(false);
                  //         window.location.reload();
                  //       } else throw e;
                  //     })
                  //     .catch((err) => {
                  //       wait(3000).then((e) => setErrorMessage(""));
                  //       setErrorMessage(err.message);
                  //     })
                  // );
                }
              )
            );
            openDialog(true);
          }}
          className="button-rounded right-rounded"
        >DELETE</button>

      </div>

      <div>
        <Dialog
          maxHeight={"90vh"}
          maxWidth={"100%"}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: " #2C4350",border: "none",borderRadius: 0},
          }}
          open={dialogOpen}
          keepMounted
          onClose={() => {
            openDialog(false);
          }}
          aria-describedby="alert-dialog-slide-description">

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
                {"ERROR: " + errorMessage + "!"}
              </div>
            )}
            {currentObj.content}

            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>
          {currentObj.actions}

          <DialogActions></DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ButtonRow;
