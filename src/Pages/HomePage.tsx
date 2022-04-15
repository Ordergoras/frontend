import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { logoutStaff } from '../utils/staffRequests';
import { useTranslation } from 'react-i18next';

function HomePage() {

  const authState = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const { t } = useTranslation()

  React.useEffect(() => {
    if(!authState.isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [authState.isAuthenticated, navigate])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Box>
        <Typography>{t('welcome', {name: authState.name})}</Typography>
        <Button
          color={'primary'}
          variant={'contained'}
          onClick={() => logoutStaff()}
        >
          {t('logout')}
        </Button>
      </Box>
      <Link to={'/imprint'}><Typography>{t('imprintPage')}</Typography></Link>
    </Box>
  );
}

export default HomePage;
