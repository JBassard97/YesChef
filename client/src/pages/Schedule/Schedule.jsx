import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Auth from "../../utils/auth";
import UpdateScheduleForm from "../../components/UpdateScheduleForm/UpdateScheduleForm";
import currentDateAndTime from "../../utils/currentDateAndTime";
import "./Schedule.css";

export default function Schedule() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userAndEmps, setUserAndEmps] = useState(null);
  const [editDay, setEditDay] = useState({});

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

  const handleAvailClass = (availability) => {
    return availability === "unavailable" ? "unavailable" : "available";
  };

  const handleDayForm = (availability, schedule, scheduleId, day) => {
    if (availability === "unavailable") {
      return <p>❌</p>;
    }

    if (editDay[scheduleId]?.[day]) {
      return (
        <UpdateScheduleForm
          scheduleId={scheduleId}
          day={day}
          closeForm={() =>
            setEditDay((prev) => ({
              ...prev,
              [scheduleId]: { ...prev[scheduleId], [day]: false },
            }))
          }
        />
      );
    }

    return (
      <>
        <p>{schedule}</p>
        <button
          className="edit-schedule-button"
          onClick={() =>
            setEditDay((prev) => ({
              ...prev,
              [scheduleId]: { ...prev[scheduleId], [day]: true },
            }))
          }
        >
          ✏️
        </button>
      </>
    );
  };

  return (
    <>
      <div className="schedule-full">
        <DashboardHeader />

        <div className="top-info">
          <h1 className="page-header">Schedule</h1>
          <p className="current-date-time">{currentDateAndTime()}</p>
        </div>

        {userAndEmps && (
          <>
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
                {userAndEmps.map((each, index) => (
                  <tr key={index}>
                    <td className="each-name">
                      <p>{each.firstname}</p> <p>{each.lastname}</p>{" "}
                      <p>({each.position})</p>
                    </td>
                    <td className={handleAvailClass(each.availability.monday)}>
                      {handleDayForm(
                        each.availability.monday,
                        each.schedule.monday,
                        each.schedule._id,
                        "monday"
                      )}
                    </td>
                    <td className={handleAvailClass(each.availability.tuesday)}>
                      {handleDayForm(
                        each.availability.tuesday,
                        each.schedule.tuesday,
                        each.schedule._id,
                        "tuesday"
                      )}
                    </td>
                    <td
                      className={handleAvailClass(each.availability.wednesday)}
                    >
                      {handleDayForm(
                        each.availability.wednesday,
                        each.schedule.wednesday,
                        each.schedule._id,
                        "wednesday"
                      )}
                    </td>
                    <td
                      className={handleAvailClass(each.availability.thursday)}
                    >
                      {handleDayForm(
                        each.availability.thursday,
                        each.schedule.thursday,
                        each.schedule._id,
                        "thursday"
                      )}
                    </td>
                    <td className={handleAvailClass(each.availability.friday)}>
                      {handleDayForm(
                        each.availability.friday,
                        each.schedule.friday,
                        each.schedule._id,
                        "friday"
                      )}
                    </td>
                    <td
                      className={handleAvailClass(each.availability.saturday)}
                    >
                      {handleDayForm(
                        each.availability.saturday,
                        each.schedule.saturday,
                        each.schedule._id,
                        "saturday"
                      )}
                    </td>
                    <td className={handleAvailClass(each.availability.sunday)}>
                      {handleDayForm(
                        each.availability.sunday,
                        each.schedule.sunday,
                        each.schedule._id,
                        "sunday"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
