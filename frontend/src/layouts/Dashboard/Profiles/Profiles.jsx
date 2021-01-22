import React, { Fragment } from "react";
import Avatar from "./Avatar";
import Sidebar from "../Sidebar";
import "../styles/Dashboard.scss";
import { getProfiles } from "../../../actions/profile";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import { useEffect } from "react";

import { setCurrent } from "../../../actions/profile";
import { withRouter } from "react-router-dom";
import TableProfileItems from "./TableProfileItems";

const Profiles = ({ getProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  let data = [];
  data.push(profiles);
  console.log(data);
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper-elem">
          <Sidebar />
          <div className="profile-layout">
            {data.map((data) => (
              <Avatar key={data} profiles={profiles} />
            ))}
            <ProfileForm />
            <TableProfileItems />
          </div>
          <br />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfiles, setCurrent })(
  withRouter(Profiles)
);
