import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

import { GET_CURRENT_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import "./Dashboard.css";

export default function Dashboard() {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    console.log("User data:", data?.me);
  }, [data]);

  return (
    <>
      <DashboardHeader/>

      <h1>You made it!</h1>
    </>
  );
}
