import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <>
      <LogoutButton />
      <h1>You made it!</h1>
    </>
  );
}
