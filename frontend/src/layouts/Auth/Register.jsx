import React, { Fragment, useState } from "react";
import "./sass/Register.scss";
import svg from "../../assets/prioritize.svg";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../../assets/components/Alert";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmationPassword) {
      return setAlert("passwords do not match", "is-danger");
    } else {
      register({ name, email, password, confirmationPassword }); // from the auth action destucturing
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { name, email, password, confirmationPassword } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name)
  };

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <div className="left-content">
            <div className="content-data">
              <div className="wrap-former">
                <div className="logo">
                  <a className="logo-name" href="#">
                    Badniox
                  </a>
                </div>
                <div className="discovering">
                  <h1 className="heading-large">
                    Discover the world's & top's WorkSpace
                  </h1>
                  <span>You'll Like it !</span>
                </div>
                <div className="svg">
                  <img src={svg} alt="svg" />
                </div>
              </div>
            </div>
          </div>

          <div className="right-content">
            <div className="layout-form">
              <div className="form-stats">
                <h1>
                  Sign Up on <span>Badniox</span>
                </h1>
              </div>
              <Alert />
              <div className="form">
                <form onSubmit={onSubmit}>
                  <div className="input-form">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      name="name"
                      onChange={onChange}
                      placeholder="ex: Swever"
                    />
                  </div>

                  <div className="input-form">
                    <label htmlFor="email">Email Adress</label>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={onChange}
                      placeholder="example@example.com"
                    />
                  </div>

                  <div className="input-form">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={password}
                      name="password"
                      placeholder="********"
                      onChange={onChange}
                    />
                  </div>

                  <div className="input-form">
                    <label htmlFor="confirmationPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmationPassword}
                      name="confirmationPassword"
                      placeholder="********"
                      onChange={onChange}
                    />
                  </div>

                  <div className="cta-btn">
                    <button type="submit">Create Account</button>
                  </div>
                </form>
              </div>
              <div className="oldmember">
                <small>
                  Already a member ? <Link to="login">Sign in</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
