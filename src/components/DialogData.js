import { Input, Button } from "@mui/material";

export default function DialogData(type, openDialog, onButton1Click, onButton2Click) {
  const addData = [
    { placeholder: "Business Code", name: "business_code", type: ""},
    { placeholder: "Customer Number", name: "cust_number", type: "number"},
    { required: false, placeholder: "Clear Date", name: "clear_date", type: "date"},
    { placeholder: "Business Year", name: "buisness_year", type: "number"},
    { placeholder: "Document Id", name: "doc_id", type: "" },
    { placeholder: "Posting Date", name: "posting_date", type: "date"},
    { placeholder: "Document Create Date", name: "document_create_date", type: "date"},
    { placeholder: "Due In Date", name: "due_in_date", type: "date"},
    { placeholder: "Invoice Currency", name: "invoice_currency", type: ""},
    { placeholder: "Document Type", name: "document_type", type: ""},
    { placeholder: "Posting ID", name: "posting_id", type: ""},
    { placeholder: "Total Open Amount", name: "total_open_amount", type: ""},
    { placeholder: "Baseline Create Date",name: "baseline_create_date",type: "date"},
    { placeholder: "Customer Payment Terms",name: "cust_payment_terms",type: ""},
    { placeholder: "Invoice ID", name: "invoice_id", type: ""}
  ];
  const dd = {
    add: {
      title: "Add",
      content: (
        <form id="form1">
          {addData.map((e) => (
            <input
              required={e.required === false}
              className="add_input"
              placeholder={e.placeholder}
              type={e.type}
              name={e.name}
            />
          ))}
        </form>
      ),
      actions: (
        <div style={{ width: "100%", display: "flex", alignItems: "stretch" }}>
          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",marginLeft: "10px",color: "white",border: "1px solid white",borderRadius: "5px"}}
            onClick={() =>
              onButton1Click(document.getElementById("form1").elements)
            }
          >ADD</Button>

          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",color: "white",border: "1px solid white",borderRadius: "5px"}}
            onClick={() => {
              onButton2Click(document.getElementById("form1").elements);
            }}
          >CANCEL</Button>
        </div>
      ),
    },
    edit: {
      title: "Edit",
      content: (
        <form id="edit_form">
          <input
            placeholder="Enter Invoice Currency"
            name="invoice_currency"
            style={{fontSize: "14px",margin: "0",paddingTop: "0",height: "5vh",width: "35%"}}
            className="customer-search"
          ></input>
          <input
            placeholder="Enter Customer Payment Terms"
            name="cust_payment_terms"
            selectedRows
            style={{marginLeft: "20px",fontSize: "12px",height: "5vh",width: "35%",}}
            className="customer-search"
          ></input>
        </form>
      ),
      actions: (
        <div style={{ width: "100%", display: "flex", alignItems: "stretch" }}>
          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",marginLeft: "10px",color: "white",border: "1px solid white",borderRadius: "5px",}}
            onClick={() => onButton1Click(document.getElementById("edit_form").elements)}
          >EDIT</Button>


          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",color: "white",border: "1px solid white",borderRadius: "5px",}}
            onClick={() =>
              onButton2Click(document.getElementById("edit_form").elements)
            }
          >CANCEL</Button>
        </div>
      ),
    },

    adv_search: {
      title: "Advanced Search",
      content: (
        <form id="adv_search_form" style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch"
        }}>
          <input
            placeholder="Document ID"
            name="doc_id"
            style={{
              fontSize: "14px",

              
              height: "5vh",
              width: "35%",
            }}
            className="customer-search"
          ></input>
          <input
            placeholder="Invoice ID"
            name="invoice_id"selectedRows
            style={{
             

              fontSize: "12px",
              height: "5vh",
              width: "35%",
            }}
            className="customer-search"
          ></input>
          <br></br>
          <input
            placeholder="Customer Number"
            name="cust_number"
            style={{
              fontSize: "14px",

              height: "5vh",
              width: "35%",
            }}
            className="customer-search"
          ></input><input
          placeholder="Business Year"
          name="buisness_year"
          style={{
            fontSize: "14px",

            height: "5vh",
            width: "35%",
          }}
          className="customer-search"
        ></input>
        </form>
      ),
      actions: (
        <div style={{ width: "100%", display: "flex", alignItems: "stretch" }}>
          <Button
            className="button-square"
            style={{
              flexGrow: "1",
              marginRight: "10px",

              marginLeft: "10px",
              color: "white",
              border: "1px solid white",
              borderRadius: "5px",
            }}
            onClick={() =>
              onButton1Click(document.getElementById("adv_search_form").elements)
            }
          >SEARCH
          </Button>

          <Button
            className="button-square"
            style={{
              flexGrow: "1",
              marginRight: "10px",
              color: "white",

              border: "1px solid white",
              borderRadius: "5px",
            }}
            onClick={() =>
              onButton2Click(document.getElementById("adv_search_form").elements)
            }
          >CANCEL
          </Button>
        </div>
      ),
    },

    delete: {
      title: "Delete Records?",
      content: (
        <div>
          <p style={{ color: "white" }}>
            Are you sure you want to delete these records[s]?
          </p>{" "}
        </div>
      ),
      actions: (
        <div style={{ width: "100%", display: "flex", alignItems: "stretch" }}>
          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",marginLeft: "10px",color: "white",border: "1px solid white",borderRadius: "5px"}}
            onClick={onButton1Click}
          >CANCEL</Button>

          <Button
            className="button-square"
            style={{flexGrow: "1",marginRight: "10px",color: "white",border: "1px solid white",borderRadius: "5px"}}
            onClick={onButton2Click}
          >DELETE</Button>
        </div>
      ),
    },
  };
  return dd[type];
}
