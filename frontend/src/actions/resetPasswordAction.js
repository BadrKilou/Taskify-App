import axios from "axios";
import {
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
} from "./types";
import { setAlert } from "./alert";

export const forgotPassword = ({ email }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.put("/api/forgot-password", body, config);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: res.data,
    });
    const success = res.data.msg;
    if (success) {
      dispatch(setAlert(success, "is-success"));
    }
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      dispatch(setAlert(errors, "is-danger"));
    }

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

export const resetPassword = ({
  token,
  password,
  ConfirmationPassword,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token, password, ConfirmationPassword });
  try {
    const res = await axios.put(`/api/reset-password/${token}`, body, config);
    console.log(res.data);
    dispatch({
      type: RESET_PASSWORD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};
