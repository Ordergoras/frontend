import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import LoginRegisterPanel from '../MenuComponents/LoginRegisterPanel';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { useTranslation } from 'react-i18next';
import { verifyCred } from '../utils/staffRequests';


function AuthenticationScreen() {

  const authState = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const { t } = useTranslation()

  React.useEffect(() => {
    verifyCred()
  }, [])

  React.useEffect(() => {
    if(authState.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [authState.isAuthenticated, navigate])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <LoginRegisterPanel/>
      <Link to={'/imprint'}><Typography>{t('imprintPage')}</Typography></Link>
    </Box>
  );
}

export default AuthenticationScreen;
