import { useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Transactions.module.css";
import tableStyles from "../../styles/Table.module.css";
import dashboardStyle from "../../styles/Dashboard.module.css";
import Card from "../card/Card";

const AllTransaction = ({ response }) => {
  // console.log(response);
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

  return (
    <div className={dashboardStyle.projects}>
      <Card>
        <div className={`${styles.transactionList} ${styles.centerTable}`}>
          <Container>
            <table className={`${tableStyles.table} ${styles.table}  `}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Transaction Id</th>
                  <th>Date</th>
                  <th>Transaction</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Cashback</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={transaction?.id}>
                    <td>{indexOfFirstTransaction + index + 1}</td>
                    <td>{transaction?.id}</td>
                    <td>{formattedDate(transaction?.date)}</td>
                    <td
                      style={{
                        color:
                          transaction?.sendAmount !== 0
                            ? "red"
                            : transaction?.receiveAmount !== 0
                            ? "green"
                            : transaction?.deposited !== 0
                            ? "blue"
                            : "black",
                      }}>
                      {transaction?.sendAmount !== 0
                        ? `-${transaction?.sendAmount}`
                        : transaction?.receiveAmount !== 0
                        ? `+${transaction?.receiveAmount}`
                        : transaction?.deposited !== 0
                        ? transaction?.deposited
                        : ""}
                    </td>
                    <td>{transaction?.message}</td>
                    <td>{transaction?.status}</td>
                    <td>{transaction?.cashback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <ul className="pagination">
            {currentPage !== 1 && (
              <li className="page-item">
                <button
                  className="page-link"
                  style={{ backgroundColor: "grey", color: "white" }}
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
                    style={{ backgroundColor: "grey", color: "white" }}
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              )}
          </ul>
        </nav>
      </Card>
    </div>
  );
};
export default AllTransaction;
