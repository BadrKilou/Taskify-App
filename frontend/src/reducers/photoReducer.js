import {
  ADD_PHOTOS,
  ERROR_PHOTOS,
  GET_PHOTOS,
  REMOVE_PHOTO,
  CLEAR_PHOTO,
} from "../actions/types";

const initialState = {
  loading: true,
  photos: [],
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };
    case ADD_PHOTOS:
      console.log(state.photos);
      return {
        ...state,
        photos: [state.photos, action.payload],
        loading: false,
      };
    case ERROR_PHOTOS:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REMOVE_PHOTO:
      console.log(state.photos);
      return {
        ...state,
        photos: () =>
          state.photos.filter((photo) => photo._id !== action.payload),
        loading: false,
      };
    case CLEAR_PHOTO:
      return {
        ...state,
        loading: false,
        photos: [],
      };
    default:
      return state;
  }
};
