import React, { Fragment } from "react";
import "./scss/Navbar.scss";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import ResponsiveNav from "./ResponsiveNav";
const Navbar = (props) => {
  if (
    props.location.pathname === "/dashboard" ||
    props.location.pathname === "/notes" ||
    props.location.pathname === "/profile"
  ) {
    return false;
  }
  return (
    <Fragment>
      <header className="header_nav">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">FlewTask</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className="responsive">
          <ResponsiveNav register="Register" login="Login" about="about" />
        </div>
      </header>
    </Fragment>
  );
};

export default withRouter(Navbar);
