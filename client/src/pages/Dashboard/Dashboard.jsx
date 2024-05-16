import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import currentDateAndTime from "../../utils/currentDateAndTime";
import sortEmployees from "../../utils/sortEmployees";
import "./Dashboard.css";

export default function Dashboard() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [sortOrder, setSortOrder] = useState("CreatedFirstToLast");

  useEffect(() => {
    // ! If not logged in, go back to login page
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    // ! If GraphQL data is present, turn into states for user and employees
    if (data) {
      console.log("User Data:\n", data.me);
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      console.log(userData.employees);
      setEmployeeData(userData.employees);
    }
  }, [userData]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <div className="dashboard-full">
        <DashboardHeader />

        <div className="top-info">
          <h1 className="page-header">Dashboard</h1>
          <p className="current-date-time">{currentDateAndTime()}</p>
        </div>

        {userData ? (
          <>
            <h2 className="personalized-welcome">
              Welcome {userData.firstname} {userData.lastname}
            </h2>
            <p className="personalized-welcome position">
              ({userData.position})
            </p>
            <div className="employee-section-full">
              <div className="employee-section-header">
                <h5>
                  <Link to="/employees">
                    Employee Count: {employeeData?.length}
                  </Link>
                </h5>
                <select value={sortOrder} onChange={handleSortChange}>
                  <option value="CreatedFirstToLast">
                    Created 1st to Last
                  </option>
                  <option value="CreatedLastToFirst">
                    Created Last to 1st
                  </option>
                  <option value="LastNameAtoZ">Last Name A to Z</option>
                  <option value="LastNameZtoA">Last Name Z to A</option>
                  <option value="FirstNameAtoZ">First Name A to Z</option>
                  <option value="FirstNameZtoA">First Name Z to A</option>
                  <option value="TitleAtoZ">Title A to Z</option>
                  <option value="TitleZtoA">Title Z to A</option>
                  <option value="RateHighToLow">Rate High to Low</option>
                  <option value="RateLowToHigh">Rate Low to High</option>
                </select>
              </div>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>Title</th>
                    <th>Rate($)</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData &&
                    sortEmployees(employeeData, sortOrder).map(
                      (employee, index) => (
                        <tr key={index}>
                          <td>{employee.firstname}</td>
                          <td>{employee.lastname}</td>
                          <td>{employee.position}</td>
                          <td>{employee.rate}</td>
                          <td>
                            <a
                              href={`tel:${employee.phone}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              📞
                            </a>
                          </td>
                          <td>
                            <a
                              href={"mailto:" + employee.email}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              ✉️
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
