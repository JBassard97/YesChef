import "./WelcomeHeader.css";
import Auth from "../../utils/auth";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function WelcomeHeader() {
  return (
    <div className="welcome-header-full">
      {Auth.loggedIn() && <LogoutButton />}

      <h1>YesChef</h1>
    </div>
  );
}
