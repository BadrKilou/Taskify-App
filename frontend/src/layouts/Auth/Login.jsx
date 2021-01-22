import React, { useState } from "react";
import "./sass/Login.scss";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "../../assets/components/Alert";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };
  // Redirect if is logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <div className="right-content">
        <div className="layout-form">
          <div className="form-stats">
            <h1>
              Login on <span>Badniox</span>
            </h1>
          </div>
          <Alert />
          <div className="form">
            <form onSubmit={onSubmit}>
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

              <div className="cta-btn">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
          <div className="oldmember">
            <small>
              Forgot your Password ?{" "}
              <Link to="/forgot-password">Forgot Password</Link>{" "}
            </small>
            <small>
              Not a member yet ? <Link to="/register">Sign up</Link>
            </small>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
