import React from 'react';
import { Box, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { getMyOrders } from '../utils/ordersRequests';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import OrderCard from '../OrderComponents/OrderCard';
import { theme } from '../index';

function MyOrdersPage() {

  const styles = {
    topMargin: {
      marginTop: 1,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()

  React.useEffect(() => {
    getMyOrders()
  }, [])

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('ordersOpen')}
      </Typography>
      {dataState.orders && dataState.orders.map((order) => {
        return !order.completed ? <OrderCard key={order.orderId} order={order}/> : null
      })}
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('ordersCompleted')}
      </Typography>
      {dataState.orders && dataState.orders.map((order) => {
        return order.completed ? <OrderCard key={order.orderId} order={order}/> : null
      })}
    </Box>
  )
}

export default MyOrdersPage;
