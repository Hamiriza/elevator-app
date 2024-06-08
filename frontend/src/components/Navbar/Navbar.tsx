import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
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
          <Link to="/calculate" className="navbar-item">
            Calculator
          </Link>
          <Link to="/about" className="navbar-item">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
