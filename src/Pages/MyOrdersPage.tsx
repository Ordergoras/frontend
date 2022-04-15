import React from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { getMyOrders } from '../utils/ordersRequests';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import OrderCard from '../OrderComponents/OrderCard';
import { theme } from '../index';
import i18next from 'i18next';

function MyOrdersPage() {

  const styles = {
    topMargin: {
      marginTop: 1,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getMyOrders()
  }, [])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('ordersOpen')}
      </Typography>
      {dataState.orders && dataState.orders.map((order) => {
        return !order.completed ? <OrderCard key={order.orderId} order={order} setOpen={(val: boolean) => setOpen(val)}/> : null
      })}
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('ordersCompleted')}
      </Typography>
      {dataState.orders && dataState.orders.map((order) => {
        return order.completed ? <OrderCard key={order.orderId} order={order} setOpen={(val: boolean) => setOpen(val)}/> : null
      })}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
          {dataState.snackbarMessageCode ? i18next.t(dataState.snackbarMessageCode) : ''}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MyOrdersPage;
