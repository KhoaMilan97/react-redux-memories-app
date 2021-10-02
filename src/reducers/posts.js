import * as actionTypes from '../constants/actionTypes';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };

    case actionTypes.FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypes.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case actionTypes.UPDATE_POST:
    case actionTypes.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default postsReducer;
