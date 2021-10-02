import * as api from '../api';

import * as actionTypes from '../constants/actionTypes';

// Actions Creatros
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.fetchPosts(page);

    dispatch({
      type: actionTypes.FETCH_POSTS,
      payload: data,
    });

    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: actionTypes.FETCH_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({
      type: actionTypes.CREATE_POST,
      payload: data,
    });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({
      type: actionTypes.UPDATE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({
      type: actionTypes.DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: actionTypes.LIKE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
