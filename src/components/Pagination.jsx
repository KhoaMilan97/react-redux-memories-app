import { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

import useStyles from './styles';

function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const numberOfPage = useSelector((state) => state.posts.numberOfPage);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}

export default Paginate;
