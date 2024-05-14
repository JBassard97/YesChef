import Auth from "../../utils/auth";

export default function LogoutButton() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <button onClick={logout}>{Auth.loggedIn() ? "Log Out" : "Log In"}</button>
  );
}
