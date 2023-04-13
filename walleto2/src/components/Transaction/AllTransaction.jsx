import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Transactions.module.css";
import tableStyles from "../../styles/Table.module.css";
import dashboardStyle from "../../styles/Dashboard.module.css";
import Card from "../card/Card";

// const jwtToken = localStorage.getItem("tokens");

// export async function getServerSideProps() {
//   try {
//     console.log("Hello");
//     console.log(jwtToken);
//     const response = await fetch(
//       `http://localhost:8080/accounts/transaction/${accNo}`,
//       {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return {
//       props: {
//         transaction: data,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { transaction },
//     };
//   }
// }
// export async function getServerSideProps(context) {
//   const jwtToken = context.req.cookies.tokens; // Fetch JWT token from cookies
//   const accNo = context.req.cookies.accounts; // Fetch account number from cookies
//   console.log(jwtToken);
//   console.log(accNo);
//   const headers = {
//     Authorization: `Bearer ${jwtToken}`,
//     "Content-Type": "application/json",
//   };

//   // Fetch transactions from server
//   const transactionsResponse = await fetch(
//     `http://localhost:8080/accounts/transaction/${accNo}`,
//     {
//       headers,
//     }
//   );
//   const transactionsData = await transactionsResponse.json();
//   const transactions = transactionsData.transactions; // Assuming the API response has a property 'transactions' containing the required data

//   return {
//     props: {
//       transactions,
//     },
//   };
// }

const AllTransaction = ({ transactionData }) => {
  console.log(transactionData);
  const [transactions, setTransactions] = useState([]);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const jwtToken = localStorage.getItem("tokens");

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
  }, [jwtToken]);
  var accNo = localStorage.getItem("accounts");
  useEffect(() => {
    fetch(`http://localhost:8080/accounts/transaction/${accNo}`, { headers })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, [accNo, headers]);

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
