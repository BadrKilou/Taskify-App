import React, { Fragment } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/resetPasswordAction";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const RestLink = ({ resetPassword, match }) => {
  const token = match.params.resetPassword;
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={`/reset/${token}`} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default connect(null, { resetPassword })(RestLink);
