import React from 'react';
import { useSelector } from 'react-redux';

import { CircularProgress, Grid } from '@mui/material';

import Post from './Post/Post';

import useStyles from './styles';

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  if (!posts.length && isLoading === false) {
    return <div>No Posts</div>;
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={2}
        >
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Posts;
