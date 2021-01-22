import { combineReducers } from "redux";
import alert from "./reducers/alertReducer";
import auth from "./reducers/authReducer";
import profile from "./reducers/profileReducer";
import photo from "./reducers/photoReducer";
import post from "./reducers/postReducer";
import forgotPass from "./reducers/resetPass";

export default combineReducers({
  alert,
  auth,
  profile,
  photo,
  post,
  forgotPass,
});
