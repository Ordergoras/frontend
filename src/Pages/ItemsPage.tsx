import React from 'react';
import { Box, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { getAllItems } from '../utils/storageRequests';
import { verifyCred } from '../utils/staffRequests';

function ItemsPage() {

  const dataState = useAppSelector(selectData)

  React.useEffect(() => {
    getAllItems()
    verifyCred()
  }, [])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>
        Items Page
      </Typography>
      {dataState.allItems && dataState.allItems.toString()}
    </Box>
  )
}

export default ItemsPage;
