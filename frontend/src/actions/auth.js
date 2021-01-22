import {
   USER_LOADED,
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   AUTH_ERROR,
   LOGOUT,
   CLEAR_PROFILE,
   CLEAR_PHOTO
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage){
        setAuthToken(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
     const res = await axios.get('/api/auth', config);
     dispatch({
         type: USER_LOADED,
         payload: res.data
     })
    } catch (error) {
     dispatch({
         type: AUTH_ERROR,
         payload: error.response.statusText
     })
    }
}


export const register = ({ name, email, password, confirmationPassword }) => async dispatch => {
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({  name, email, password, confirmationPassword });

    try {
     const res = await axios.post('/api/users', body, config);
     dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
     });
     dispatch(loadUser()) // Load user Immediatly
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'is-danger')
            ))
        }
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.statusText
        })
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
     const res = await axios.post('/api/auth', body, config);
     dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
     });
     dispatch(loadUser()) // Load user Immediatly
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'is-danger')
            ))
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.statusText
        })
    }
}

// Logout User

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: CLEAR_PHOTO
    })
}