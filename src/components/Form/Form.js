import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, Typography, Paper } from '@mui/material';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'));

  const { title, message, tags } = postData;

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memoeirs.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Updating' : 'Creating'} a memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          margin="normal"
          fullWidth
          value={title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          margin="normal"
          fullWidth
          value={message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          margin="normal"
          fullWidth
          value={tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          sx={{
            marginTop: '16px',
          }}
          color="secondary"
          fullWidth
          size="small"
          type="button"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
