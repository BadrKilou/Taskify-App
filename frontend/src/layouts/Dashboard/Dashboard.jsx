import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import DashboardItems from "./DashboardItems";

const Dashboard = ({ isOpened }) => {
  return (
    <Fragment>
      <Fragment>
        <div className="container">
          <div class="wrapper-elem">
            <Sidebar isOpened={isOpened} />
            <DashboardItems />
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Dashboard;
