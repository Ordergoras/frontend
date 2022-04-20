import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { useTranslation } from 'react-i18next';
import { theme } from '../index';

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
        <Typography color={theme.palette.background.default}>{t('welcome', {name: authState.name})}</Typography>
      </Box>
      <Link to={'/license'}><Typography>{t('licensePage')}</Typography></Link>
    </Box>
  );
}

export default HomePage;
