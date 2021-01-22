import React, { Fragment, useEffect, useState } from "react";

import "../styles/Dashboard.scss";
import { getProfiles } from "../../../actions/profile";
import { getPhotos, addPhotos } from "../../../actions/photos";
import { getPosts, editPost } from "../../../actions/posts";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import { RingLoader, HashLoader, CircleLoader } from "react-spinners";
import { AiOutlineVerticalRight } from "react-icons/ai";
import DropdownMenu from "../Profiles/DropdownMenu";
import NoteModal from "./NoteModal";
import { CgGoogleTasks } from "react-icons/cg";
import "./NoteModal.scss";
import { GotoDashboardBtn } from "../Profiles/GotoDashboardBtn";

const Notes = ({
  getProfiles,
  getPosts,
  profile: { profile, loading },
  auth: { user },
  logout,
  getPhotos,
  editPost,
  current,
  photo: {
    photos: { imageName },
  },
}) => {
  useEffect(() => {
    getProfiles();
    getPhotos();
    getPosts();
  }, [getProfiles, getPhotos, getPosts]);

  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };

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
                <GotoDashboardBtn />
                <p>Lorem ipsum dolor sit amet.</p>
                <p>searchbox</p>
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
              <div class="div1" style={{ background: "#f1f1f1" }}>
                <div class="heading-dashboard">
                  {loading || profile !== null ? (
                    <HashLoader css={AiOutlineVerticalRight} color="#577bf9" />
                  ) : (
                    <h1>
                      Hey{" "}
                      <span style={{ color: "#9698D6" }}>
                        {user !== null && user.name}
                      </span>
                    </h1>
                  )}
                  <p>This is Where you can start Adding your Notes</p>
                </div>
                <div class="svg-header">
                  <img alt="" />
                </div>
              </div>
            </div>
            <div className="modal-container">
              {show && <div onClick={closeModal} className="back-drop"></div>}

              <button onClick={() => setShow(true)} className="btn-openModal">
                ADD A TASK
                <CgGoogleTasks size={15} />
              </button>
            </div>

            <NoteModal
              show={show}
              closeModal={closeModal}
              addPhotos={addPhotos}
            />
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
  post: state.post.current,
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
  editPost,
})(Notes);
