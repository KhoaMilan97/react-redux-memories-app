import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import useStyles from './styles';

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch({ type: 'LOGOUT' });

    setUser(null);
    history.push('/');
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, location, logOut]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Toolbar>
        <Link to="/" className={classes.brandContainer}>
          <img
            className={classes.image}
            src={memoriesText}
            alt="icon"
            height="45px"
          />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="memories"
            height="40px"
          />
        </Link>
        <div className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Signin
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
