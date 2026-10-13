import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>ClubTrips</h2>

      <div className="nav-links">
        <NavLink to="/">Weather</NavLink>
        <NavLink to="/trips">Plan Trips</NavLink>
      </div>
    </nav>
  );
}