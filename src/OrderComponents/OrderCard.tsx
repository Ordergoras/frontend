import React from 'react';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { Order } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { selectData, updateCompletedItem } from '../Redux/dataSlice';
import { updateCompletedItemRequest } from '../utils/ordersRequests';
import DoneIcon from '@mui/icons-material/Done';

interface OrderCardProps {
  order: Order,
  setOpen: Function,
}

function OrderCard(props: OrderCardProps) {

  const styles = {
    paper: {
      padding: 2,
      margin: 1,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
    },
    divider: {
      border: 1,
      borderColor: theme.palette.getContrastText(theme.palette.background.default),
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
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [fetching, setFetching] = React.useState(false)

  const updateCompleted = (itemId: string, increaseCompleted: boolean, amount: number) => {
    setFetching(true)
    updateCompletedItemRequest(props.order.orderId, itemId, increaseCompleted, amount)
      .then(res => {
        if(res) {
          let newOrder = JSON.parse(JSON.stringify(props.order))
          newOrder.completedItems[itemId] = increaseCompleted ? newOrder.completedItems[itemId] + amount : newOrder.completedItems[itemId] - amount
          let isCompleted = true
          Object.keys(newOrder.orderedItems).forEach((itemId) => {
            if(newOrder.orderedItems[itemId] !== newOrder.completedItems[itemId]) {
              isCompleted = false
            }
          })
          newOrder.completed = isCompleted
          dispatch(updateCompletedItem({order: props.order, itemId: itemId, increaseCompleted: increaseCompleted, newOrder: newOrder, amount: amount}))
        }
        props.setOpen(true)
        setFetching(false)
      })
  }

  return (
    <Paper sx={styles.paper}>
      <Box>
        <Typography variant={'subtitle2'}>
          {t('orderStaff')}: {props.order.staffName}
        </Typography>
        <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1, marginRight: -1}}/>
        <Typography variant={'subtitle2'}>
          {t('tableNr')} {props.order.tableNr}
        </Typography>
      </Box>
      <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1}}/>
      {
        !props.order.completed &&
        <>
          <Box sx={styles.flexWrapBox}>
            <Typography variant={'subtitle2'} sx={{marginTop: 'auto', marginBottom: 'auto'}}>
              {t('open')}:
            </Typography>
            {Object.keys(props.order.orderedItems).map((itemId) => {
              return dataState.itemIdMap && (props.order.orderedItems[itemId] - props.order.completedItems[itemId]) > 0 &&
                <Chip
                  key={itemId}
                  sx={{...styles.chip, backgroundColor: theme.palette.secondary.dark, ':hover': {backgroundColor: theme.palette.secondary.light}}}
                  label={dataState.itemIdMap[itemId]['name'] + ': ' + (props.order.orderedItems[itemId] - props.order.completedItems[itemId])}
                  onClick={() => updateCompleted(itemId, true, 1)}
                  disabled={fetching}
                  onDelete={() => updateCompleted(itemId, true, (props.order.orderedItems[itemId] - props.order.completedItems[itemId]))}
                  deleteIcon={<DoneIcon/>}
                />
            })}
          </Box>
          <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1}}/>
        </>
      }
      <Box sx={styles.flexWrapBox}>
        {
          !props.order.completed &&
          <Typography variant={'subtitle2'} sx={{marginTop: 'auto', marginBottom: 'auto'}}>
            {t('completed')}:
          </Typography>
        }
        {Object.keys(props.order.completedItems).map((itemId) => {
          return dataState.itemIdMap && props.order.completedItems[itemId] > 0 &&
            <Chip
              key={itemId}
              sx={{...styles.chip, backgroundColor: theme.palette.success.dark, ':hover': {backgroundColor: theme.palette.success.light}}}
              label={dataState.itemIdMap[itemId]['name'] + ': ' + props.order.completedItems[itemId]}
              onClick={() => updateCompleted(itemId, false, 1)}
              disabled={fetching}
            />
        })}
      </Box>
    </Paper>
  )
}

export default OrderCard;
