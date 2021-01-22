import {
  SET_LOADING,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  ERROR_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_TASK,
} from "./types";

import axios from "axios";

export const getPosts = (id) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    console.log(res.data.length);
  } catch (err) {
    dispatch({
      type: ERROR_POST,
      payload: err.response.data,
    });
  }
};

// Add Posts
export const addPosts = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();
    const res = await axios.post("/api/post", formData, config);
    dispatch({
      type: ADD_POST,
      payload: [res.data],
    });
    dispatch(getPosts());
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: ERROR_POST,
      payload: err.response.data,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.delete(`/api/post/${id}`, config);
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};

export const editPost = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/post/${userId._id}`, userId, config);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data,
    });
  }
};

// Edit Post

export const setCurrent = (client) => {
  return {
    type: SET_CURRENT,
    payload: client,
  };
};

// Set Loading to true

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
