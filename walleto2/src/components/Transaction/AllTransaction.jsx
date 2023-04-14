import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Transactions.module.css";
import tableStyles from "../../styles/Table.module.css";
import dashboardStyle from "../../styles/Dashboard.module.css";
import Card from "../card/Card";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllTransaction = ({ response }) => {
  const [transactions, setTransactions] = useState(response);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const formattedDate = (date) => new Date(date).toLocaleDateString();
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const columnDefs = [
    { headerName: "S.No.", field: "sNo", sortable: true, filter: true },
    { headerName: "Transaction Id", field: "id", sortable: true, filter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    {
      headerName: "Transaction",
      field: "transaction",
      sortable: true,
      filter: true,
    },
    { headerName: "Message", field: "message", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    { headerName: "Cashback", field: "cashback", sortable: true, filter: true },
  ];

  // const frameworkComponents = {
  //   statusRenderer: StatusRenderer,
  // };

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
  }, [currentTransactions]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className={dashboardStyle.projects}>
      <Card>
        <div className={`${styles.transactionList} ${styles.centerTable}`}>
          {/* <Container> */}
          <div
            className="ag-theme-alpine"
            style={{ height: "400px", width: "100%", marginBottom: "1rem" }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              defaultColDef={defaultColDef}
              // frameworkComponents={frameworkComponents}
              pagination={true}
              paginationPageSize={transactionsPerPage}
              onPaginationChanged={(event) =>
                setCurrentPage(event.api.paginationGetCurrentPage() + 1)
              }
            />
          </div>
          <nav style={{ display: "flex", justifyContent: "center" }}>
            <ul className="pagination">
              {currentTransactions.length >= transactionsPerPage &&
                indexOfLastTransaction < transactions.length && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                )}
              {currentTransactions.length >= transactionsPerPage &&
                indexOfLastTransaction < transactions.length && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                )}
            </ul>
          </nav>
          {/* </Container> */}
        </div>
      </Card>
    </div>
  );
};
export default AllTransaction;
