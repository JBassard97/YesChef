import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Auth from "../../utils/auth";
import "./Schedule.css";

export default function Schedule() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [availsAndScheds, setAvailsAndScheds] = useState(null);

  useEffect(() => {
    // ! If not logged in, go back to login page
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      const user = data?.me;
      const employees = data?.me.employees;

      let allSchedsAndAvails = [];
      const userSchedAndAvail = {
        firstname: user.firstname,
        lastname: user.lastname,
        availability: user.availability,
        schedule: user.schedule,
      };
      allSchedsAndAvails.push(userSchedAndAvail);

      for (const emp of employees) {
        const empSchedAndAvail = {
          firstname: emp.firstname,
          lastname: emp.lastname,
          availability: emp.availability,
          schedule: emp.schedule,
        };

        allSchedsAndAvails.push(empSchedAndAvail);
      }

      setAvailsAndScheds(allSchedsAndAvails);
    }
  }, [data]);

  useEffect(() => {
    if (availsAndScheds) {
      console.log(availsAndScheds);
    }
  }, [availsAndScheds]);

  return (
    <>
      <DashboardHeader />
      <h1 className="page-header">Schedule</h1>

          {availsAndScheds && (<table>
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
      </table>)}
    </>
  );
}
