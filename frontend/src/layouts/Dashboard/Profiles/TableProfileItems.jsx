import React, { Fragment } from 'react'
import { BarLoader, HashLoader } from 'react-spinners';
import { getProfiles } from '../../../actions/profile';
import { useEffect } from 'react';
import TableProfile from './TableProfile';
import OrderedProfileList from './OrderedProfileList';
import { connect } from 'react-redux';
import profile from '../../../assets/profile.svg';
const TableProfileItems = ({ 
    profile: { profiles, loading },
    auth,

}) => {

    useEffect(() => {
        getProfiles();
      }, [getProfiles])
       
    return (
        <Fragment>
            <Fragment>
    
               
               {loading && profile == null ? <HashLoader /> : (
                
                 <Fragment>
                   
                   <div className="parent-griddy">
                     
                       
                         <Fragment>
                             {loading ? <BarLoader /> :
                             (Object.keys(profiles).length) > 0 ? 
                             (
                                 <>
                                <TableProfile profile={profiles} />
                                <OrderedProfileList creds={profiles} />
                                </>
                             )  : <div className='setup-profile'>
                                 <strong>Nothing to Show</strong>
                                   <div className="setup-svg">
                                    <img src={profile} alt="svg"/>
                                   </div>
                                   
                                   <h2>Start Off by setting up your Profile !</h2>
                                 </div>
                            }
    
                        
                         </Fragment>
                     
                    
                   
                   
                   </div>           
                   </Fragment>
               )} 
       
               
                    </Fragment>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfiles }) (TableProfileItems)
