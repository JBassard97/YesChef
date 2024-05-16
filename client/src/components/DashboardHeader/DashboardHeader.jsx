import "./DashboardHeader.css";
import { Link, useLocation } from "react-router-dom";

export default function DashboardHeader() {
  const location = useLocation();

  return (
    <>
      <div className="dashboard-header-full">
        <Link
          className={`tab ${location.pathname === "/settings" ? "active" : ""}`}
          to="/settings"
        >
          <div>Settings</div>
        </Link>
        <Link
          className={`tab ${
            location.pathname === "/employees" ? "active" : ""
          }`}
          to="/employees"
        >
          <div>Employees</div>
        </Link>
        <Link
          className={`tab ${location.pathname === "/schedule" ? "active" : ""}`}
          to="/schedule"
        >
          <div>Schedule</div>
        </Link>
        <Link
          className={`tab ${location.pathname === "/contacts" ? "active" : ""}`}
          to="/contacts"
        >
          <div>Contacts</div>
        </Link>
      </div>
    </>
  );
}
