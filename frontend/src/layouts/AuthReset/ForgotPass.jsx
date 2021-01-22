import React, { Fragment } from "react";
import { forgotPassword } from "../../actions/resetPasswordAction";
import { RiLockPasswordLine } from "react-icons/ri";
import { connect } from "react-redux";
import { useState } from "react";
import Alert from "../../assets/components/Alert";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { FcCheckmark } from "react-icons/fc";
const ForgotPass = ({ forgotPassword }) => {
  const { addToast } = useToasts();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const OnSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      addToast("Please, Include Your Email", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      setFormData({
        email: "",
      });
      forgotPassword({ email });
      setMessage(`Email was sent to ${email} please check your inbox`);
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
          >
            <h1>
              Forgot Your Password? <RiLockPasswordLine size={25} />
            </h1>
            <p>
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>
          <Alert />

          <div className="form" style={{ marginRight: "18px" }}>
            {!message ? (
              <form onSubmit={OnSubmit}>
                <div className="input-form">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="example@example.com"
                  />
                </div>
                <button type="submit" style={styledBtn}>
                  Submit
                </button>
              </form>
            ) : (
              <div className="email-sent_-">
                <span>{message}</span> <FcCheckmark size={20} color="#3CFABB" />
              </div>
            )}

            <div>
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
};

const mapStateToProps = (state) => ({
  forgetPass: state.forgetPass,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPass);
