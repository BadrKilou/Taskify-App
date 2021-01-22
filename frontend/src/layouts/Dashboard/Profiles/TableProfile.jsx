import React from "react";
import "./styles/TableProfile.scss";
import { setCurrent } from "../../../actions/profile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const TableProfile = ({ profile: { status, company, location, age } }) => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <table style={{ marginBottom: "2.5rem" }}>
        <caption>Summary</caption>
        <thead>
          <tr>
            <th scope="col">LOCATION</th>
            <th scope="col">AGE</th>
            <th scope="col">COMPANY</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Location" style={{ color: "green" }}>
              {location}
            </td>
            <td data-label="Age">{age && age}</td>
            <td data-label="Company">{company && company}</td>
            <td data-label="Status">{status && status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default connect(null, { setCurrent })(withRouter(TableProfile));
