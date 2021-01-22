import React, { Fragment } from "react";
import { useState } from "react";
import "./styles/Avatar.scss";
const DeleteAvatar = ({ deleteAvatar, id }) => {
  const [active, setActive] = useState(false);

  const showBtn = () => {
    setActive(!active);
  };
  console.log(id);
  const deleteItem = () => {
    deleteAvatar(id);
  };

  return (
    <Fragment>
      <span onClick={showBtn}>
        {active ? "return" : "Click here, to Delete Avatar"}
      </span>{" "}
      {active && (
        <button style={styledBtn} onClick={deleteItem}>
          X
        </button>
      )}
    </Fragment>
  );
};

const styledBtn = {
  backgroundColor: "red",
  border: "none",
  padding: "15px 28px",
  color: "whitesmoke",
  cursor: "pointer",
  width: "100px",
  marginTop: "15px",
  borderRadius: "8px",
  transition: "500ms ease",
};

export default DeleteAvatar;
