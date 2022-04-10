import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import LoginRegisterPanel from '../MenuComponents/LoginRegisterPanel';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';

function AuthenticationScreen() {

  const authState = useAppSelector(selectAuth)
  const navigate = useNavigate()

  React.useEffect(() => {
    if(authState.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [authState.isAuthenticated, navigate])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <LoginRegisterPanel/>
      <Link to={'/about'}><Typography>About</Typography></Link>
    </Box>
  );
}

export default AuthenticationScreen;
