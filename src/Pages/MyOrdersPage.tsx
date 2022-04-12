import React from 'react';
import { Box, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { verifyCred } from '../utils/staffRequests';
import { getMyOrders } from '../utils/ordersRequests';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';

function MyOrdersPage() {

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()

  React.useEffect(() => {
    verifyCred()
    getMyOrders()
  }, [])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>
        My Orders Page
      </Typography>
      {dataState.myOrders && dataState.myOrders.map((order) => {
        return <Typography key={order.orderId}>
          {order.orderId}
        </Typography>
      })}
    </Box>
  )
}

export default MyOrdersPage;
