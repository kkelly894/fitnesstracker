import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/activities");
  }

  return (
    <header>
      <p>Fitness Trackr</p>

      <nav>
        <NavLink to="/activities">Activities</NavLink>

        {token ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
