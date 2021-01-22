import React, { Fragment } from 'react'
import './Alert.scss';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
    return (
        <div>
            <Fragment>
            {alerts !== null && alerts.length > 0 && alerts.map( alert => (
                <article 
                
                key={alert.id}>
                
                 <p className={alert.alertType === 'is-danger' ? 'is-danger' : 'is-success'}>
                     {alert.msg}
                     </p>
                
               
               </article>
            ))}
        </Fragment>
        </div>
    )
}
const mapStateToProps = state => ({
    alerts: state.alert
})
export default connect(mapStateToProps) (Alert)
