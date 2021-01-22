import React from "react";
import "./styles/List.scss";
const OrderedProfileList = ({ creds: { skills, bio } }) => {
  return (
    <div>
      <main className="list-collection">
        <ol class="gradient-list">
          <span style={span}>Bio :</span>
          <li>{bio && bio}</li>
          <span style={span}>Skills :</span>
          <li>{skills && skills}</li>
        </ol>
      </main>
    </div>
  );
};
const span = {
  color: "#FF0081",
  textAlign: "center",
  fontSize: "1.5rem",
  marginBottom: "18px",
};
export default OrderedProfileList;
