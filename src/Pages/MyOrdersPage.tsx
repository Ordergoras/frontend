import React from 'react';
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { getMyOrders, updateCompletedItemRequest } from '../utils/ordersRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { selectData, undoOrderUpdate } from '../Redux/dataSlice';
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
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    getMyOrders()
    const interval = setInterval(() => getMyOrders(), 60000);

    return () => clearInterval(interval);
  }, [])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleUndo = () => {
    if(dataState.lastOrderUpdate === undefined)
      return
    updateCompletedItemRequest(dataState.lastOrderUpdate.order.orderId, dataState.lastOrderUpdate.itemId, !dataState.lastOrderUpdate.increaseCompleted)
      .then(() => dispatch(undoOrderUpdate()))
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
        <Alert
          onClose={handleClose}
          severity={'success'}
          sx={{width: '100%'}}
          action={<Button color={'inherit'} size={'small'} onClick={() => handleUndo()}>{t('undo')}</Button>}
        >
          {dataState.snackbarMessageCode ? t(dataState.snackbarMessageCode) : ''}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MyOrdersPage;
