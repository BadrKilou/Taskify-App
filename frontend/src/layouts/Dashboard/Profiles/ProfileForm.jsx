import React, { Fragment } from "react";
import "./styles/Profiles.scss";
import Button from "../../Button/Button";
import { createProfile } from "../../../actions/profile";
import { connect } from "react-redux";
import { useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { updateForm, setCurrent, clearCurrent } from "../../../actions/profile";
import "./styles/FormButton.scss";
import { useEffect } from "react";
import Buttom from "./Button";

import { withRouter } from "react-router-dom";

const ProfileForm = ({
  createProfile,
  updateForm,
  current,
  auth: { user },
  clearCurrent,
  setCurrent,
  profile: { profiles },
}) => {
  const onEdit = () => {
    clearCurrent();
    console.log(clearCurrent());
    setFormData({
      company: "",
      status: "",
      location: "",
      skills: "",
      age: "",
      bio: "",
    });
  };

  useEffect(() => {
    if (current) {
      setFormData(current);
    }
  }, [current]);

  const [activeForm, seTactiveForm] = useState(false);
  const onToggle = () => {
    seTactiveForm(!activeForm);
  };
  const { addToast } = useToasts();

  const [formData, setFormData] = useState({
    company: "",
    status: "",
    location: "",
    skills: "",
    age: "",
    bio: "",
  });

  const { company, status, location, skills, age, bio } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (skills === "" || status === "" || bio === "") {
      return addToast(`Skills, Status, Bio are required`, {
        appearance: "warning",
        autoDismiss: true,
      });
    } else if (current !== null) {
      const updatedForm = {
        _id: current._id,
        ...formData,
      };
      console.log(updatedForm);
      updateForm(updatedForm);
      addToast(`Form Updated Successfully by ${user !== null && user.name}`, {
        appearance: "success",
        autoDismiss: true,
      });
      setFormData({
        company: "",
        status: "",
        location: "",
        skills: "",
        age: "",
        bio: "",
      });
    } else {
      createProfile(formData); // formData exists in createProfile actions
      addToast("Form created successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setFormData({
        company: "",
        status: "",
        location: "",
        skills: "",
        age: "",
        bio: "",
      });
    }
  };

  return (
    <Fragment>
      <div className="form-profile">
        <div className="profile-container">
          <div className="toggle-form-btn">
            {/* {current !== null && <p>Profile Editing Mode</p>} */}
            <button onClick={onToggle} className="bubbly-button">
              {activeForm ? "Hide Form" : "Set up Profile Form"}{" "}
              <AiOutlineForm size={17} />
            </button>{" "}
            <Buttom show={() => setCurrent(profiles)} label="Edit Profile" />
            {current && (
              <Fragment>
                <button onClick={onEdit} className="bubbly-button">
                  Clear Data
                </button>
              </Fragment>
            )}
          </div>
          <div className="profile">
            {activeForm && (
              <form onSubmit={onSubmit}>
                <div className="profile-input">
                  <label htmlFor="Company">Company</label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="company"
                    value={company}
                  />
                </div>

                <div className="profile-input">
                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="status"
                    value={status}
                  />
                </div>

                <div className="profile-input">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="location"
                    value={location}
                  />
                </div>

                <div className="profile-input">
                  <label htmlFor="skills">Skills</label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="skills"
                    value={skills}
                  />
                </div>

                <div className="profile-input">
                  <label htmlFor="age">age</label>
                  <input
                    type="number"
                    onChange={onChange}
                    name="age"
                    value={age}
                  />
                </div>

                <div className="profile-input">
                  <label htmlFor="">BIO</label>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="submit-btn" style={{ marginTop: "18px" }}>
                  <Button label="Submit" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  current: state.profile.current,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  updateForm,
  setCurrent,
  clearCurrent,
})(withRouter(ProfileForm));
