import React, { Fragment, useState } from "react";
import "../styles/Backdrop.scss";

export const Backdrop = ({ toggly }) => {
  const [active, setActive] = useState(false);

  return (
    <Fragment>
      <div
        className={`backdrop_dash ${active && "backdrop_dash active"}`}
        onClick={toggly}
      ></div>
    </Fragment>
  );
};
