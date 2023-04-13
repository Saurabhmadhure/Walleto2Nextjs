import React, { useEffect, useState } from "react";
import styles from "../src/styles/Dashboard.module.css";
import DashboardItem from "../src/components/dashboard/DashboardItems";

const UserDashboard = ({ userDetails }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      setLoggedIn(true);
    }
  }, [userDetails]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <br />
              {loggedIn ? (
                <>
                  <div className={`card text-center ${styles.accountcard}`}>
                    <div className={`card-header bg-secondary text-white`}>
                      <h2 className={styles.accountinfo}>
                        Welcome {userDetails?.name}
                      </h2>
                    </div>
                  </div>
                  <hr />
                  <DashboardItem userDetails={userDetails} />
                </>
              ) : (
                <div className={`card text-center ${styles.accountcard}`}>
                  <div className={`card-header bg-secondary text-white`}>
                    <h2 className={styles["account-info"]}>
                      Please login or register to continue
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const userDetails = await fetch("https://api.example.com/userDetails");
//   const userDetailsJson = await userDetails.json();

//   return {
//     props: {
//       userDetails: userDetailsJson,
//     },
//   };
// }

export default UserDashboard;
