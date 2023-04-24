import { useEffect, useMemo, useRef, useState } from "react";
import dashboardStyle from "../../styles/Dashboard.module.css";
import Card from "../card/Card";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { Button } from "react-bootstrap";

function AllTransaction({ response }) {
  const [transactions, setTransactions] = useState(response ?? []);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // const gridApi = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("tokens");

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
    var acNo = localStorage.getItem("accounts");

    const fetchTransactionData = async () => {
      try {
        const apiResponse = await axios.get(
          `/api/alltransactions?acNo=${acNo}&jwtToken=${jwtToken}`
        );
        setTransactions(apiResponse.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    if (response === null || response === undefined) {
      fetchTransactionData(acNo);
    } else {
      setTransactions(response);
    }
  }, [response]);

  const formattedDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "";
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const columnDefs = [
    { field: "sNo" },
    { field: "id", filter: true },
    { field: "date" },

    {
      field: "transaction",
      // filter: "agNumberColumnFilter",
      //
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan"],
      },

      floatingFilter: true,
      cellStyle: (params) => {
        if (params.data.transaction < 0) {
          return { color: "red" };
        } else if (params.data.transaction > 0) {
          return { color: "green" };
        }
        return null;
      },
    },

    {
      field: "message",
      filter: "agTextColumnFilter",

      filterParams: {
        filterOptions: ["contains"],
      },
      floatingFilter: true,
    },
    {
      headerName: "Status",
      field: "status",
      // rowGroup: true,
    },
    {
      field: "cashback",
      filter: "agNumberColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
      },
      floatingFilter: true,
    },
  ];

  const rowData = useMemo(() => {
    return currentTransactions.map((transaction, index) => ({
      sNo: indexOfFirstTransaction + index + 1,
      id: transaction?.id,
      date: formattedDate(transaction?.date),
      transaction:
        transaction?.sendAmount !== 0
          ? `-${transaction?.sendAmount}`
          : transaction?.receiveAmount !== 0
          ? `+${transaction?.receiveAmount}`
          : transaction?.deposited !== 0
          ? transaction?.deposited
          : "",
      message: transaction?.message,
      status: transaction?.status,
      cashback: transaction?.cashback,
    }));
  }, [currentTransactions, indexOfFirstTransaction]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      enableRowGroup: true,
      flex: 1,
      minWidth: 100,
      // filter: true,
      // floatingFilter: true,
    }),
    []
  );
  // const handlePaginationChange = (event) => {
  //   const newPageSize = parseInt(event.target.value, 10);
  //   setTransactionsPerPage(newPageSize);
  //   setCurrentPage(1);
  // };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleDownload = (format) => {
    const params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: `transactions.${format}`,
    };
    gridRef.current.exportDataAsCsv(params);
  };
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <Card>
      <div className={dashboardStyle.cardHeader}>
        <div className={dashboardStyle.paginationContainer}></div>
      </div>
      <div className={dashboardStyle.cardBody}>
        <div
          className="ag-theme-alpine"
          style={{ height: "520px", width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            rowGroupPanelShow="always"
            animateRows={true}
            // enableRangeSelection={true}
            // enableCharts={true}
            rowSelection="multiple"
            onGridReady={(params) => {
              // gridApi.current = params.api;
              gridRef.current = params.api;
            }}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={transactionsPerPage}
            suppressPaginationPanel={true}
            onFirstDataRendered={(params) => {
              params.api.sizeColumnsToFit();
            }}></AgGridReact>
        </div>
        <div className={dashboardStyle.paginationContainer}>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1rem 0",
            }}>
            <Button
              className="btn btn-secondary"
              style={{ marginRight: "1rem" }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              &lt; Prev
            </Button>
            <Button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next &gt;
            </Button>
          </div>
          <Button onClick={() => handleDownload("csv")}>Download File</Button>
        </div>
      </div>
    </Card>
  );
}

export default AllTransaction;
