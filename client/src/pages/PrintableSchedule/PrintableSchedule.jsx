import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./PrintableSchedule.css";

export default function PrintableSchedule() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userAndEmps, setUserAndEmps] = useState(null);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      const UserAndEmps = [];
      const userData = data?.me;
      const empData = data?.me.employees;
      UserAndEmps.push(userData);
      for (const emp of empData) {
        UserAndEmps.push(emp);
      }
      setUserAndEmps(UserAndEmps);
    }
  }, [data]);

  useEffect(() => {
    if (userAndEmps) {
      console.log(userAndEmps);
    }
  }, [userAndEmps]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-full">
      <button className="print-button" onClick={handlePrint}>Print</button>

      {userAndEmps && (
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
            {userAndEmps.map((person, index) => (
              <tr key={index}>
                <td className="each-name">
                  <p>{person.firstname}</p>
                  <p>{person.lastname}</p>
                  <p>({person.position})</p>
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.monday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.monday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.tuesday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.tuesday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.wednesday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.wednesday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.thursday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.thursday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.friday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.friday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.saturday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.saturday}</p>
                  )}
                </td>
                <td className="dashboard-schedule-day">
                  {person.availability.sunday == "unavailable" ? (
                    <p>OFF</p>
                  ) : (
                    <p>{person.schedule.sunday}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
