import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import LoginRegisterPanel from './LoginRegisterPanel';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';

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
        <Typography>Logged in as {authState.name}</Typography>
      }
      <Link to={'/about'}><Typography>About</Typography></Link>
    </Box>
  );
}

export default HomePage;
