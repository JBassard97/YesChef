import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import EmailSchedulesButton from "../../components/EmailSchedulesButton/EmailSchedulesButton";
import currentDateAndTime from "../../utils/currentDateAndTime";
import sortEmployees from "../../utils/sortEmployees";
import sortContacts from "../../utils/sortContacts";
import "./Dashboard.css";

export default function Dashboard() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [sortEmployeeOrder, setSortEmployeeOrder] =
    useState("CreatedFirstToLast");
  const [sortContactOrder, setSortContactOrder] =
    useState("CreatedFirstToLast");

  useEffect(() => {
    // ! If not logged in, go back to login page
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log("User Data:\n", data.me);
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setEmployeeData(userData.employees);
      setContactData(userData.contacts);
      console.log("Employee Data:\n", userData.employees);
      console.log("Contact Data:\n", userData.contacts);
    }
  }, [userData]);

  const handleEmpSortChange = (event) => {
    setSortEmployeeOrder(event.target.value);
  };

  const handleContSortChange = (event) => {
    setSortContactOrder(event.target.value);
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

            <div className="page-break"></div>

            {employeeData && (
              <>
                <div className="employee-section-full">
                  <div className="employee-section-header">
                    <h5>
                      <Link to="/employees">
                        Employees: {employeeData?.length}
                      </Link>
                    </h5>
                    <select
                      value={sortEmployeeOrder}
                      onChange={handleEmpSortChange}
                    >
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
                      {sortEmployees(employeeData, sortEmployeeOrder).map(
                        (employee, index) => (
                          <tr className="employee-row" key={index}>
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

                <div className="page-break"></div>

                <div className="dashboard-schedule-header">
                  <h5>Current Schedule</h5>
                  <EmailSchedulesButton />
                  <button>
                    <Link to="/printable">View Printable</Link>
                  </button>
                </div>
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mon</th>
                      <th>Tues</th>
                      <th>Wed</th>
                      <th>Thurs</th>
                      <th>Fri</th>
                      <th>Sat</th>
                      <th>Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="each-name">
                        <p>{userData.firstname}</p>
                        <p>{userData.lastname}</p>
                        <p>({userData.position})</p>
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.monday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.monday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.tuesday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.tuesday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.wednesday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.wednesday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.thursday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.thursday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.friday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.friday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.saturday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.saturday}</p>
                        )}
                      </td>
                      <td className="dashboard-schedule-day">
                        {userData.availability.sunday == "unavailable" ? (
                          <p>OFF</p>
                        ) : (
                          <p>{userData.schedule.sunday}</p>
                        )}
                      </td>
                    </tr>
                    {employeeData.map((emp, index) => (
                      <>
                        <tr key={index}>
                          <td className="each-name">
                            <p>{emp.firstname}</p>
                            <p>{emp.lastname}</p>
                            <p>({emp.position})</p>
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.monday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.monday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.tuesday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.tuesday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.wednesday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.wednesday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.thursday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.thursday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.friday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.friday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.saturday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.saturday}</p>
                            )}
                          </td>
                          <td className="dashboard-schedule-day">
                            {emp.availability.sunday == "unavailable" ? (
                              <p>OFF</p>
                            ) : (
                              <p>{emp.schedule.sunday}</p>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <div className="page-break"></div>

            {contactData && (
              <>
                <div className="contact-section-full">
                  <div className="contact-section-header">
                    <h5>
                      <Link to="/contacts">
                        Contacts: {contactData?.length}
                      </Link>
                    </h5>
                    <select
                      value={sortContactOrder}
                      onChange={handleContSortChange}
                    >
                      <option value="CreatedFirstToLast">
                        Created 1st to Last
                      </option>
                      <option value="CreatedLastToFirst">
                        Created Last to 1st
                      </option>
                      <option value="ContactNameAtoZ">
                        Contact Name A to Z
                      </option>
                      <option value="ContactNameZtoA">
                        Contact Name Z to A
                      </option>
                    </select>
                  </div>
                  <table className="contact-table">
                    <thead>
                      <tr>
                        <th>Contact</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortContacts(contactData, sortContactOrder).map(
                        (contact, index) => (
                          <tr key={index}>
                            <td>{contact.contactname}</td>
                            <td className="contact-details">
                              {contact.contacttext}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
