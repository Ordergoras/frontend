import React from 'react';
import { Item } from '../utils/types';
import { Box, Paper, Typography } from '@mui/material';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';

interface ItemCardProps {
  item: Item,
  color: string,
}

function ItemCard(props: ItemCardProps) {

  const styles = {
    paper: {
      padding: 1,
      margin: 1,
      backgroundColor: props.color,
    },
    divider: {
      border: 1,
      borderColor: theme.palette.getContrastText(props.color),
    },
  }

  const { t } = useTranslation()

  return (
    <Paper sx={styles.paper}>
      <Typography variant={'h6'}>
        {props.item.name}
      </Typography>
      <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Typography variant={'subtitle2'}>
          {t('price')}: {props.item.price.toFixed(2)}€
        </Typography>
        <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
        <Typography variant={'subtitle2'}>
          {t('inStorage')}: {props.item.amount}
        </Typography>
      </Box>
    </Paper>
  )
}

export default ItemCard;
