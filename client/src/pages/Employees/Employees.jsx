import { useQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import CreateEmployeeForm from "../../components/CreateEmployeeForm/CreateEmployeeForm";
import UpdateEmployeeForm from "../../components/UpdateEmployeeForm/UpdateEmployeeForm";
import DeleteEmployeeForm from "../../components/DeleteEmployeeForm/DeleteEmployeeForm";
import UpdateAvailabilityForm from "../../components/UpdateAvailabilityForm/UpdateAvailabilityForm";
import sortEmployees from "../../utils/sortEmployees";
import currentDateAndTime from "../../utils/currentDateAndTime";
import "./Employees.css";

export default function Employees() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [sortOrder, setSortOrder] = useState("CreatedFirstToLast");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(data.me);
      console.log("User Data:\n", data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setEmployeeData(userData.employees);
      console.log("Employee Data:\n", userData.employees);
    }
  }, [userData]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleRowClick = (employee, index) => {
    setSelectedEmployee(null);
    setSelectedEmployee(selectedEmployee === employee ? null : employee);
    if (rowRefs.current[index]) {
      rowRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
        // inline: "start",
      });
    }
  };

  return (
    <>
      <div className="employees-full">
        <DashboardHeader />

        <div className="top-info">
          <h1 className="page-header">Employees</h1>
          <p className="current-date-time">{currentDateAndTime()}</p>
        </div>

        {employeeData && (
          <>
            <div className="employee-section-full">
              <div className="employee-section-header">
                <h5>Employees: {employeeData?.length}</h5>
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
              {employeeData.length > 0 && (
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
                    {sortEmployees(employeeData, sortOrder).map(
                      (employee, index) => (
                        <React.Fragment key={index}>
                          <tr
                            ref={(el) => (rowRefs.current[index] = el)}
                            className={`employee-row ${
                              selectedEmployee &&
                              selectedEmployee._id === employee._id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleRowClick(employee, index)}
                          >
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
                          {selectedEmployee &&
                            selectedEmployee._id === employee._id && (
                              <>
                                <tr>
                                  <td colSpan="6">
                                    <UpdateEmployeeForm
                                      employee={selectedEmployee}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="6">
                                    <UpdateAvailabilityForm
                                      employee={selectedEmployee}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="6">
                                    <DeleteEmployeeForm
                                      employee={selectedEmployee}
                                    />
                                  </td>
                                </tr>
                              </>
                            )}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="page-break"></div>
          </>
        )}

        <CreateEmployeeForm />
      </div>
    </>
  );
}
