import React, { Fragment } from "react";
import svg from "../../assets/prioritize.svg";
import { AiOutlineHome } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";
import { RiProfileLine } from "react-icons/ri";

import { Link, withRouter } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const isOpened = () => {
    setOpen(!open);
  };
  return (
    <Fragment>
      {/* <!-- Sidebar --> */}
      <aside className={open ? "aside_items active" : "aside_items"}>
        <div className="toolbar_items">
          {/* <GiHamburgerMenu
            style={{ cursor: "pointer" }}
            onClick={isOpened}
            size={30}
            color="#63F265"
          /> */}
          <div className="logo">
            <a href="#" onClick={isOpened}>
              Tranquilos Hermanos
            </a>
          </div>
          <div className={open ? "nav-icons active" : "nav-icons"}>
            <div className="icons">
              <Link to="/dashboard">
                <AiOutlineHome size={25} />
                Home
              </Link>
              <Link to="/notes">
                <GrNotes size={25} />
                Notes
              </Link>
              <Link to="/profile">
                <RiProfileLine size={25} />
                Profile
              </Link>
            </div>
          </div>
          <div className="svg-elem">
            <img src={svg} alt="svg" />
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default withRouter(Sidebar);
