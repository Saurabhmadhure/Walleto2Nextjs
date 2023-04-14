import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function aggrid() {
  const rowData = [
    { make: "Ford", model: "Mustang", price: "$40000 " },
    { make: "BMW", model: "8 Series", price: "$60000" },
    { make: "Audi", model: "R8", price: "$50000" },
  ];
  const columDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];
  return (
    <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={columDefs} />
    </div>
  );
}
export default aggrid;
