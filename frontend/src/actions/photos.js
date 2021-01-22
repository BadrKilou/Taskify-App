import axios from "axios";
import { GET_PHOTOS, ERROR_PHOTOS, ADD_PHOTOS, REMOVE_PHOTO } from "./types";
import { setAlert } from "./alert";

// Get Photos Action

export const getPhotos = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/file/${id}`);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: ERROR_PHOTOS,
      payload: err.response.data,
    });
    console.error(err.response.data);
  }
};

// Upload & ADD PHOTO

export const addPhotos = (image) => async (dispatch) => {
  // const config = {
  //   headers: { "Content-Type": "multipart/form-data" },
  // };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      console.log(
        "Upload progress " +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          "%"
      );
    },
  };

  try {
    let formData = new FormData();
    formData.append("image", image);
    console.log(image);
    // console.log(file)
    const res = await axios.post(`/api/file`, formData, config);
    console.log(res.data);
    dispatch({
      type: ADD_PHOTOS,
      payload: res.data,
    });
    dispatch(getPhotos());
  } catch (err) {
    const errors = err.response.data.upload_error;
    if (errors) {
      dispatch(setAlert(errors, "is-danger"));
    }

    dispatch({
      type: ERROR_PHOTOS,
      payload: err.response.data,
    });
    console.log(err.response.data.upload_error);
  }
};

// Delete Photo

export const deleteImage = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/file/delete/${id}`);

    dispatch({
      type: REMOVE_PHOTO,
      payload: res.data,
    });
    dispatch(getPhotos());
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "is-danger"));
    }
    dispatch({
      type: ERROR_PHOTOS,
      payload: err.response.data.msg,
    });

    console.log(err.response.data);
  }
};
