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
        <Typography color={theme.palette.background.default} variant={'h5'}>{t('welcome', {name: authState.name})}</Typography>
        <Typography color={theme.palette.background.default} variant={'h5'}>TODO</Typography>
        <Typography color={theme.palette.background.default} variant={'body1'}>Fix wine orders (full bottle vs. glass), try: save stock thats sold in full and parts as the parts (e.g. 1 bottle wine is saved as 5 units (1L in 0.2L glasses))</Typography>
        <Typography color={theme.palette.background.default} variant={'body1'}>add additional information to food and wine (item cards)</Typography>
        <Typography color={theme.palette.background.default} variant={'body1'}>statistics dashboard</Typography>
        <Typography color={theme.palette.background.default} variant={'body1'}>logging of actions (to potentially revert bad inputs by staff)</Typography>
        <Typography color={theme.palette.background.default} variant={'body1'}>add staff,admin,superuser groups instead of isAdmin bool</Typography>
      </Box>
      <Link to={'/license'}><Typography>{t('licensePage')}</Typography></Link>
    </Box>
  );
}

export default HomePage;
