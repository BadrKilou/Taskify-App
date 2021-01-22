import React, { Fragment, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Backdrop } from "./backdrop/Backdrop";
import "./styles/ResponsiveNavDash.scss";
import "./styles/Backdrop.scss";
import { AiOutlineHome } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import Svg from "../../assets/Animated-Shape.svg";

export const ResponsiveNavDash = () => {
  const [active, setActive] = useState(false);

  const toggleNav = () => {
    setActive(!active);
  };
  return (
    <Fragment>
      <button
        className="burger_nav"
        style={{ outline: "none", background: "none", border: "none" }}
      >
        <GiHamburgerMenu
          id="menu"
          color="#5C60DB"
          style={{ cursor: "pointer" }}
          size={28}
          onClick={toggleNav}
        />
      </button>
      <nav className={active ? "navbar_dash active" : "navbar_dash"}>
        <div style={style}>
          <ul>
            <li>
              <Link to="/dashboard">
                <AiOutlineHome /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/notes">
                <GrNotes /> Notes
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <ImProfile /> Profile
              </Link>
            </li>

            <div style={{ width: "458px" }}>
              <img style={{ width: "100%" }} src={Svg} alt="svg_dash" />
            </div>
          </ul>
        </div>
      </nav>
      <div
        className={`backdrop_dash ${active && "backdrop_dash active"}`}
        onClick={toggleNav}
      ></div>
    </Fragment>
  );
};

const style = {
  height: "100%",
  width: "100%",
};
