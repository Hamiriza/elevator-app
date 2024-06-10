import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth?.logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Elevator Time Calculator
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/about" className="navbar-item">
            About
          </Link>
          {auth?.user && (
            <Link to="/calculate" className="navbar-item">
              Calculator
            </Link>
          )}

          {auth?.user ? (
            <>
              <span className="navbar-item">User: {auth.user.username}</span>
              <a onClick={handleLogout} className="navbar-item out">
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-item">
                Login
              </Link>{" "}
              <Link to="/register" className="navbar-item">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
