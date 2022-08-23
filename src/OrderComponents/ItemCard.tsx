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
      backgroundColor: props.item.inStock ? props.color : '#393939',
    },
    divider: {
      border: 1,
      borderColor: theme.palette.divider,
    },
    text: {
      color: props.item.inStock ? theme.palette.grey[50] : theme.palette.grey[600],
    },
  }

  const { t } = useTranslation()

  return (
    <Paper sx={styles.paper}>
      <Typography variant={'h6'} sx={styles.text}>
        {props.item.name}
      </Typography>
      <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Typography variant={'subtitle2'} sx={styles.text}>
          {t('price')}: {props.item.price.toFixed(2)}€
        </Typography>
        <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
        <Typography variant={'subtitle2'} sx={styles.text}>
          {props.item.inStock ? t('inStorage') : t('outOfStock')}
        </Typography>
      </Box>
    </Paper>
  )
}

export default ItemCard;
