import React from 'react';
import { Link } from 'react-router-dom';
import {Typography, Box, Button} from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import LoginRegisterPanel from './LoginRegisterPanel';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { logoutStaff } from '../utils/staffRequests';

function HomePage() {

  const authState = useAppSelector(selectAuth)

  return (
    <Box sx={generalStyles.backgroundContainer}>
      {
        !authState.isAuthenticated &&
        <LoginRegisterPanel/>
      }
      {
        authState.isAuthenticated &&
        <Box>
          <Typography>Logged in as {authState.name}</Typography>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={() => logoutStaff()}
          >
            Logout
          </Button>
        </Box>
      }
      <Link to={'/about'}><Typography>About</Typography></Link>
    </Box>
  );
}

export default HomePage;
