import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import UpdateAvailabilityForm from "../../components/UpdateAvailabilityForm/UpdateAvailabilityForm";
import currentDateAndTime from "../../utils/currentDateAndTime";
import { GET_CURRENT_USER } from "../../utils/queries";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../../utils/auth";
import "./Settings.css";

export default function Settings() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location = "/";
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(data?.me);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <div className="settings-full">
      <DashboardHeader />
      <div className="top-info">
        <h1 className="page-header">Settings</h1>
        <p className="current-date-time">{currentDateAndTime()}</p>
      </div>
      {userData && (
        <>
          <UpdateAvailabilityForm employee={userData} />
        </>
      )}
    </div>
  );
}
