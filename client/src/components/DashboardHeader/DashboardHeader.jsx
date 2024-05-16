import "./DashboardHeader.css";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  return (
    <>
      <div className="dashboard-header-full">
        <Link className="tab settings" to="/settings">
          <div>Settings</div>
        </Link>
        <Link className="tab employees" to="/employees">
          <div>Employees</div>
        </Link>
        <Link className="tab schedule" to="/schedule">
          <div>Schedule</div>
        </Link>
        <Link className="tab lists" to="/contacts">
          <div>Contacts</div>
        </Link>
      </div>
    </>
  );
}
