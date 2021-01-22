import React, { Fragment } from "react";
import {
  resetPassword,
  forgotPassword,
} from "../../actions/resetPasswordAction";
import { connect } from "react-redux";
import { useState } from "react";
import Alert from "../../assets/components/Alert";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./ForgotPass.scss";
import { FcCheckmark } from "react-icons/fc";
const ForgotPass = ({ resetPassword, match }) => {
  const { addToast } = useToasts();
  const token = match.params.token;
  console.log(token);

  const [formData, setFormData] = useState({
    password: "",
    ConfirmationPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { password, ConfirmationPassword } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const OnSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      addToast("Please, Include a new password", {
        appearance: "error",
        autoDismiss: true,
      });
      return 0;
    }
    if (password !== ConfirmationPassword) {
      alert("Passwords do not match");
    } else {
      resetPassword({ password, ConfirmationPassword, token });
      setSuccessMessage(`Password has Changed Successfully`);
    }
  };

  return (
    <Fragment>
      <div className="right-content">
        <div className="layout-form">
          <div
            className="form-statss"
            style={{
              padding: "3px",
            }}
          ></div>
          <Alert />

          <div className="form" style={{ marginRight: "18px" }}>
            {!successMessage ? (
              <form onSubmit={OnSubmit}>
                <div className="input-form">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="*****"
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="email">Confirm Password</label>
                  <input
                    type="password"
                    name="ConfirmationPassword"
                    value={ConfirmationPassword}
                    onChange={onChange}
                    placeholder="*****"
                  />
                </div>
                <button type="submit" style={styledBtn}>
                  Submit
                </button>
              </form>
            ) : (
              <div className="email-sent_-">
                <span>{successMessage}</span>
                <FcCheckmark size={20} color="#3CFABB" />
              </div>
            )}
            <div style={{ margin: "8px" }}>
              <strong>
                Back To <Link to="/login">Login</Link>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const styledBtn = {
  padding: "12px",
  background: "#2B63FC",
  border: "none",
  borderRadius: "2px",
  fontSize: "14px",
  cursor: "pointer",
  color: "white",
  width: "89%",
  marginLeft: "20px",
  outline: "none",
};

const mapStateToProps = (state) => ({
  forgetPass: state.forgetPass,
});

export default connect(mapStateToProps, { resetPassword, forgotPassword })(
  ForgotPass
);
