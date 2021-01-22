import {
   GET_PROFILE,
   PROFILE_ERROR,
   CLEAR_PROFILE,
   UPDATE_PROFILE, 
   GET_PROFILES,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    current: null,
    error: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PROFILE:
            console.log(action.payload)
        case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                profile: action.payload
            }
        case GET_PROFILES:
            return{
                ...state,
                loading: false,
                profiles: action.payload
            }
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload,
                loading: false
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null,
                loading: false
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                profiles: 
                state.profiles.map(profile => profile._id === action.payload.id ? action.payload : profile)
                
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                loading: false,
                profile: null,
                profiles: []
            }
       
        default:
            return state
    }
}