import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { logoutStaff, verifyCred } from '../utils/staffRequests';

function HomePage() {

  const authState = useAppSelector(selectAuth)
  const navigate = useNavigate()

  React.useEffect(() => {
    verifyCred()
  }, [])

  React.useEffect(() => {
    if(!authState.isAuthenticated) {
      navigate('login', { replace: true })
    }
  }, [authState.isAuthenticated, navigate])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Box>
        <Typography>Welcome to the HomePage {authState.name}</Typography>
        <Button
          color={'primary'}
          variant={'contained'}
          onClick={() => logoutStaff()}
        >
          Logout
        </Button>
      </Box>
      <Link to={'/about'}><Typography>About</Typography></Link>
    </Box>
  );
}

export default HomePage;
