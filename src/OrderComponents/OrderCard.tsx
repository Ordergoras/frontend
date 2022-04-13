import React from 'react';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography } from '@mui/material';
import { Order } from '../utils/types';

interface OrderCardProps {
  order: Order,
}

function OrderCard(props: OrderCardProps) {

  const styles = {
    paper: {
      padding: 2,
      margin: 1,
      backgroundColor: theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start'
    },
    divider: {
      border: 1,
      borderColor: theme.palette.background.default,
    }
  }

  const { t } = useTranslation()

  return (
    <Paper sx={styles.paper}>
      <Box sx={{}}>
        <Typography variant={'subtitle2'}>
          {t('orderStaff')}: {props.order.staffName}
        </Typography>
        <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1, marginRight: -1}}/>
        <Typography variant={'subtitle2'}>
          {t('tableNr')} {props.order.tableNr}
        </Typography>
      </Box>
      <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1}}/>
      <Typography variant={'h6'}>
        {props.order.orderId}
      </Typography>
    </Paper>
  )
}

export default OrderCard;
