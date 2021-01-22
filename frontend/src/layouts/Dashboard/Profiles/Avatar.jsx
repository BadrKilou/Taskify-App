import React, { Fragment } from "react";
import { getPhotos, addPhotos, deleteImage } from "../../../actions/photos";
import { connect } from "react-redux";
import "./styles/Avatar.scss";
import { useEffect } from "react";

import UploadAvatar from "./UploadAvatar";
import { MoonLoader } from "react-spinners";
import { GotoDashboardBtn } from "./GotoDashboardBtn";

const Avatar = ({
  getPhotos,
  photo: { photos, loading },
  auth: { user },
  addPhotos,
  profiles: { location },
  deleteImage,
}) => {
  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  const data = [];
  data.push(photos);

  return (
    <Fragment>
      <div className="profile-centered">
        <GotoDashboardBtn />
        <div className="flex-profile">
          <h3>
            {" "}
            Full-Name:{" "}
            <span style={styled}>
              {user !== null && user.name.toUpperCase()}
            </span>
          </h3>
          <strong>
            Location: <span style={styled}>{location}</span>
          </strong>
          {!loading ? (
            data &&
            data.map((photo) => (
              <UploadAvatar
                key={photo._id}
                photo={photo}
                addPhoto={addPhotos}
                deleteImage={deleteImage}
              />
            ))
          ) : (
            <MoonLoader color="#235EE6" size={25} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

const styled = {
  marginLeft: "5px",
  color: "#FA5A8D",
  fontSize: "20px",
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPhotos, addPhotos, deleteImage })(
  Avatar
);
