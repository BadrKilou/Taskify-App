import React from "react";
import { Link } from "react-router-dom";
export const GotoDashboardBtn = () => {
  return (
    <div>
      <Link style={styledButton} id="desktop-hide" to="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
};

const styledButton = {
  padding: "12px",
  background: "#87FDFF",
  border: "none",
  borderRadius: "2px",
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "32px",
  margin: "12px 0px",
  float: "left",
  marginLeft: "20px",
  outline: "none",
  textDecoration: "none",
};
