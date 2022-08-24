import React from 'react';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { Order } from '../utils/types';
import { useAppDispatch } from '../Redux/hooks';
import { updateCompletedItem } from '../Redux/dataSlice';
import { updateCompletedItemRequest } from '../utils/ordersRequests';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getChipLabel } from '../utils/helperFunctions';

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
      borderColor: theme.palette.divider,
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

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [fetching, setFetching] = React.useState(false)

  const updateCompleted = (outerKey: string, itemId: string, increaseCompleted: boolean, amount: number) => {
    setFetching(true)
    updateCompletedItemRequest(props.order.orderId, outerKey, itemId, increaseCompleted, amount)
      .then(res => {
        if(res) {
          let newOrder = JSON.parse(JSON.stringify(props.order))
          newOrder.completedItems[outerKey][itemId] = increaseCompleted ? newOrder.completedItems[outerKey][itemId] + amount : newOrder.completedItems[outerKey][itemId] - amount
          let isCompleted = true
          Object.keys(newOrder.orderedItems).forEach((outerK) => {
            Object.keys(newOrder.orderedItems[outerK]).forEach((itemIdx) => {
              if(newOrder.orderedItems[outerK][itemIdx] !== newOrder.completedItems[outerK][itemIdx]) {
                isCompleted = false
              }
            })
          })
          newOrder.completed = isCompleted
          dispatch(updateCompletedItem({order: props.order, outerKey: outerKey, itemId: itemId, increaseCompleted: increaseCompleted, newOrder: newOrder, amount: amount}))
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
            {Object.keys(props.order.orderedItems).map((outerKey) => {
              return Object.keys(props.order.orderedItems[outerKey]).map((itemId) => {
                return (props.order.orderedItems[outerKey][itemId] - props.order.completedItems[outerKey][itemId]) > 0 &&
                  <Chip
                    key={outerKey + itemId}
                    sx={{...styles.chip, backgroundColor: theme.palette.secondary.dark, ':hover': {backgroundColor: theme.palette.secondary.light}}}
                    label={getChipLabel(outerKey, itemId, (props.order.orderedItems[outerKey][itemId] - props.order.completedItems[outerKey][itemId]))}
                    onClick={() => updateCompleted(outerKey, itemId, true, 1)}
                    disabled={fetching}
                    onDelete={() => updateCompleted(outerKey, itemId, true, (props.order.orderedItems[outerKey][itemId] - props.order.completedItems[outerKey][itemId]))}
                    deleteIcon={<CheckCircleIcon/>}
                  />
              })
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
        {Object.keys(props.order.orderedItems).map((outerKey) => {
          return Object.keys(props.order.orderedItems[outerKey]).map((itemId) => {
            return props.order.completedItems[outerKey][itemId] > 0 &&
              <Chip
                key={outerKey + itemId}
                sx={{...styles.chip, backgroundColor: theme.palette.success.dark, ':hover': {backgroundColor: theme.palette.success.light}}}
                label={getChipLabel(outerKey, itemId, props.order.completedItems[outerKey][itemId])}
                onClick={() => updateCompleted(outerKey, itemId, false, 1)}
                disabled={fetching}
                onDelete={() => updateCompleted(outerKey, itemId, false, props.order.completedItems[outerKey][itemId])}
              />
          })
        })}
      </Box>
    </Paper>
  )
}

export default OrderCard;
