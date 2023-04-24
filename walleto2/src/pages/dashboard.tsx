import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import DashboardItem from "../components/dashboard/DashboardItems";
import { Props } from "./type/UserDetails";

const UserDashboard: React.FC<Props> = ({ userDetails }) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

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
                  {userDetails && <DashboardItem userDetails={userDetails} />}
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

export default UserDashboard;
