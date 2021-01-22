
import React, { Fragment } from 'react'
import Notes from './Notes/Notes'
import Sidebar from './Sidebar'


const NoteDashboard = () => {
    return (
        <Fragment>
            <div className="container">
            <div class="wrapper-elem">
            <Sidebar />
            <Notes />
            </div>
            </div>
        </Fragment>
    )
}

export default NoteDashboard
