import React, { Fragment, useEffect } from "react";
import Task from "../../assets/Task.svg";
import "./styles/Dashboard.scss";
import { getProfiles } from "../../actions/profile";
import { getPhotos } from "../../actions/photos";
import { getPosts } from "../../actions/posts";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { RingLoader, HashLoader, CircleLoader } from "react-spinners";
import { AiOutlineVerticalRight } from "react-icons/ai";
import DropdownMenu from "./Profiles/DropdownMenu";

import { ResponsiveNavDash } from "./ResponsiveNavDash";
import Tasks from "./Tasks";
import { TaskCount } from "./TaskCount";

const DashboardItems = ({
  getProfiles,
  getPosts,
  profile: { profile, loading },
  auth: { user },
  logout,
  getPhotos,
  photo: {
    photos: { imageName },
  },
  post: { posts },
}) => {
  useEffect(() => {
    getProfiles();
    getPhotos();
    getPosts();
  }, [getProfiles, getPhotos, getPosts]);

  let postsData = [];
  postsData.push(posts);

  return (
    <Fragment>
      {loading && profile === null ? (
        <div style={center}>
          <br />
          <CircleLoader size={120} color="#36D7B7" />
        </div>
      ) : (
        <main class="main-content">
          <div class="dashboard-layout">
            <div class="dashboard-flex">
              <div class="nav-board">
                <ResponsiveNavDash />
                <h2>Dashboard</h2>

                {/* <button  onClick={logout}>LOGOUT</button> */}
                {loading ? (
                  <RingLoader color="#36D7B7" />
                ) : (
                  <DropdownMenu
                    logout={logout}
                    avatar={imageName}
                    user={user}
                    disconnect="Log out"
                    profile="Profile"
                    notes="Notes"
                  />
                )}
              </div>
            </div>
            <div class="parent">
              <div class="div1">
                <div class="heading-dashboard">
                  {loading || profile !== null ? (
                    <HashLoader css={AiOutlineVerticalRight} color="#577bf9" />
                  ) : (
                    <h1>
                      Welcome{" "}
                      <span style={{ color: "#9698D6" }}>
                        {user !== null && user.name}
                      </span>
                    </h1>
                  )}
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quam ipsum voluptas earum quibusdam vero hic officiis
                    facilis, at itaque molestias.
                  </p>
                </div>
                <div class="svg-header">
                  <img src={Task} alt="" />
                </div>
              </div>
            </div>
          </div>
          <TaskCount getPosts={getPosts} />
          <div class="wrapper light" style={{ margin: "auto" }}>
            {postsData.map((post) => (
              <Tasks
                key={post._id}
                getPosts={getPosts}
                posts={post}
                imageName={imageName}
                user={user}
              />
            ))}
          </div>
        </main>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  photo: state.photo,
  post: state.post,
});

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  margin: "auto",
};

export default connect(mapStateToProps, {
  getProfiles,
  logout,
  getPhotos,
  getPosts,
})(DashboardItems);
