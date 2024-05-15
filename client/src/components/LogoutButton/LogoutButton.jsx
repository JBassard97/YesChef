import Auth from "../../utils/auth";
import "./LogoutButton.css";

export default function LogoutButton() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <button className="logout-button" onClick={logout}>{Auth.loggedIn() ? "Log Out" : "Log In"}</button>
  );
}
