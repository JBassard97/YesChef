import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer-full">
        <div className="footer-first-row">
          <Link to="/help">Help</Link>
          <Link to="/about">About</Link>
          <Link to="/developer">Developer</Link>
        </div>
        <div className="footer-second-row">
          <Link to="/stats">Stats</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>
      </div>
    </>
  );
}
