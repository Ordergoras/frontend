import React from 'react';
import { Box, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { verifyCred } from '../utils/staffRequests';

function MyOrdersPage() {

  React.useEffect(() => {
    verifyCred()
  }, [])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>
        My Orders Page
      </Typography>
    </Box>
  )
}

export default MyOrdersPage;
