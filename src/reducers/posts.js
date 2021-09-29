import * as actionTypes from '../constants/actionTypes';

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      return action.payload;
    case actionTypes.CREATE_POST:
      return [...state, action.payload];

    case actionTypes.UPDATE_POST:
    case actionTypes.LIKE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case actionTypes.DELETE_POST:
      return state.filter((post) => post._id !== action.payload);

    default:
      return state;
  }
};

export default postsReducer;
