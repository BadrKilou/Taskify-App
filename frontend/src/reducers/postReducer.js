import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  UPDATE_TASK,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  current: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST:
      console.log(state.posts);
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case UPDATE_TASK:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? action.payload : post
        ),
        loading: false,
      };
    default:
      return state;
  }
};
