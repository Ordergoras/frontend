import React from 'react';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { Order } from '../utils/types';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { updateCompletedItems } from '../utils/ordersRequests';

interface OrderCardProps {
  order: Order,
}

function OrderCard(props: OrderCardProps) {

  const styles = {
    paper: {
      padding: 2,
      margin: 1,
      backgroundColor: props.order.completed ? theme.palette.success.light : theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
    },
    divider: {
      border: 1,
      borderColor: theme.palette.background.default,
    },
    flexWrapBox: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center',
    },
    chip: {
      margin: 1,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [order, setOrder] = React.useState(props.order)
  const [fetching, setFetching] = React.useState(false)

  const updateCompleted = (itemId: string, increaseCompleted: boolean) => {
    setFetching(true)
    updateCompletedItems(order.orderId, itemId, increaseCompleted)
      .then(res => {
        if(res) {
          let newOrder = JSON.parse(JSON.stringify(order))
          newOrder.completedItems[itemId] = increaseCompleted ? newOrder.completedItems[itemId] + 1 : newOrder.completedItems[itemId] - 1
          let isCompleted = true
          Object.keys(newOrder.orderedItems).forEach((itemId) => {
            if(newOrder.orderedItems[itemId] !== newOrder.completedItems[itemId]) {
              isCompleted = false
            }
          })
          if(isCompleted) {
            newOrder.completed = true
          }
          setOrder(newOrder)
          console.log('set new order')
        }
        setFetching(false)
      })
  }

  return (
    <Paper sx={styles.paper}>
      <Box>
        <Typography variant={'subtitle2'}>
          {t('orderStaff')}: {order.staffName}
        </Typography>
        <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1, marginRight: -1}}/>
        <Typography variant={'subtitle2'}>
          {t('tableNr')} {order.tableNr}
        </Typography>
      </Box>
      <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1}}/>
      <Box sx={styles.flexWrapBox}>
        <Typography variant={'subtitle2'} sx={{marginTop: 'auto', marginBottom: 'auto'}}>
          {t('open')}:
        </Typography>
        {Object.keys(order.orderedItems).map((itemId) => {
          return dataState.itemIdMap && (order.orderedItems[itemId] - order.completedItems[itemId]) > 0 &&
            <Chip
              key={itemId}
              sx={{...styles.chip, backgroundColor: theme.palette.secondary.dark}}
              label={dataState.itemIdMap[itemId] + ': ' + (order.orderedItems[itemId] - order.completedItems[itemId])}
              onClick={() => updateCompleted(itemId, true)}
              disabled={fetching}
            />
        })}
      </Box>
      <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1}}/>
      <Box sx={styles.flexWrapBox}>
        <Typography variant={'subtitle2'} sx={{marginTop: 'auto', marginBottom: 'auto'}}>
          {t('completed')}:
        </Typography>
        {Object.keys(order.completedItems).map((itemId) => {
          return dataState.itemIdMap && order.completedItems[itemId] > 0 &&
            <Chip
              key={itemId}
              sx={{...styles.chip, backgroundColor: theme.palette.success.main, ":hover": {backgroundColor: theme.palette.success.dark}}}
              label={dataState.itemIdMap[itemId] + ': ' + order.completedItems[itemId]}
              onClick={() => updateCompleted(itemId, false)}
              disabled={fetching}
            />
        })}
      </Box>
    </Paper>
  )
}

export default OrderCard;
