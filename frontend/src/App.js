import React, { Fragment, useEffect } from "react";
import Register from "./layouts/Auth/Register";
import Home from "./layouts/STATIC/Home";
import Pricing from "./layouts/STATIC/Pricing";
import About from "./layouts/STATIC/About";
import Dashboard from "./layouts/Dashboard/Dashboard";
import Login from "./layouts/Auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/SetAuthToken";
import Navbar from "./layouts/STATIC/Navbar";
import { loadUser } from "./actions/auth";
import Profile from "./layouts/Dashboard/Profiles/Profiles";
import NoteDashboard from "./layouts/Dashboard/NoteDashboard";
import { ToastProvider } from "react-toast-notifications";
import PrivateRoute from "./assets/components/routing/PrivateRoute";
import ForgotPass from "./layouts/AuthReset/ForgotPass";
import ResetPass from "./layouts/AuthReset/ResetPass";

if (localStorage) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <ToastProvider>
          <Router>
            <Navbar />

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/forgot-password" component={ForgotPass} />
              <Route
                exact
                path={`/reset-password/:token`}
                component={ResetPass}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/notes" component={NoteDashboard} />
            </Switch>
          </Router>
        </ToastProvider>
      </Fragment>
    </Provider>
  );
};

export default App;
