import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
} from "../actions/types";

const initialState = {
  forgot: null,
  loading: true,
  error: {},
  reset: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD:
      console.log(action.payload);
      return {
        ...state,
        forgot: action.payload,
        loading: false,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        forgot: null,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        reset: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        reset: null,
      };
    default:
      return state;
  }
}
