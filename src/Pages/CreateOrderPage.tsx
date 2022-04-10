import React from 'react';
import { Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { verifyCred } from '../utils/staffRequests';

function CreateOrderPage() {

  React.useEffect(() => {
    verifyCred()
  }, [])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>
        Create Orders Page
      </Typography>
    </Box>
  )
}

export default CreateOrderPage;
