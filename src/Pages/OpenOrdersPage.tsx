import React from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { getOpenOrders, updateCompletedItemRequest } from '../utils/ordersRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { selectData, undoOrderUpdate } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import OrderCard from '../OrderComponents/OrderCard';

function OpenOrdersPage() {

  const dataState = useAppSelector(selectData)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    getOpenOrders()
    const interval = setInterval(() => getOpenOrders(), 60000)

    return () => clearInterval(interval)
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
      {dataState.orders && dataState.orders.map((order) => {
        return !order.completed ? <OrderCard key={order.orderId} order={order} setOpen={(val: boolean) => setOpen(val)}/> : null
      })}
      <Snackbar open={open} autoHideDuration={dataState.snackbarMessage && !dataState.snackbarMessage.error ? 3000 : 2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={dataState.snackbarMessage && dataState.snackbarMessage.error ? 'error' : 'success'}
          sx={{width: '100%'}}
          action={dataState.snackbarMessage && !dataState.snackbarMessage.error && <Button color={'inherit'} size={'small'} onClick={() => handleUndo()}>{t('undo')}</Button>}
        >
          {dataState.snackbarMessage ? t(dataState.snackbarMessage.messageCode) : ''}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default OpenOrdersPage;
