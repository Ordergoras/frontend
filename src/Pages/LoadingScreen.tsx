import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';

function LoadingScreen() {

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>Loading App</Typography>
      <CircularProgress/>
    </Box>
  );
}

export default LoadingScreen;
