import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import {login, logout} from "../Redux/authSlice";

function HomePage() {
  const styles = {
    homePage: {
      height: '100%',
      width: '100%',
    },
    button: {
    },
  }

  const dispatch = useAppDispatch()
  const authState = useAppSelector(state => state.auth);

  return (
    <div style={styles.homePage}>
      <Typography>Welcome to Ordergoras!</Typography>
      <Paper>
        <Typography>
          {authState.isAuthenticated ? 'Hey ' + authState.name : 'Please log in'}
        </Typography>
      </Paper>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => dispatch(login({staffId: 1, name: 'Monargoras'}))}
      >
        Login
      </Button>
      <Button
        sx={styles.button}
        color={'secondary'}
        variant={'contained'}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
      <Link to={'/about'}><Typography>About</Typography></Link>
    </div>
  );
}

export default HomePage;
