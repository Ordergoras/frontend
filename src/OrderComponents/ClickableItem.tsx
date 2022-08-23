import React from 'react';
import {Item, ItemEnum} from '../utils/types';
import { Box, Button, Typography } from '@mui/material';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';

interface ItemCardProps {
  item: Item,
  onClick: () => void,
}

function ClickableItem(props: ItemCardProps) {

  const styles = {
    button: {
      padding: 1,
      margin: 1,
      backgroundColor: ItemEnum[props.item.group] === 0 ? theme.palette.primary.light :
        ItemEnum[props.item.group] === 1 ? theme.palette.primary.main :
          ItemEnum[props.item.group] === 2 ? theme.palette.tertiary.main :
            theme.palette.primary.dark,
      ':hover': {
        backgroundColor: ItemEnum[props.item.group] === 0 ? theme.palette.primary.main :
          ItemEnum[props.item.group] === 1 ? theme.palette.primary.dark :
            ItemEnum[props.item.group] === 2 ? theme.palette.tertiary.dark :
              theme.palette.primary.main
      },
      textTransform: 'none',
    },
    divider: {
      border: 1,
      borderColor: theme.palette.divider,
    },
  }

  const { t } = useTranslation()

  return (
    <Button sx={styles.button} variant={'contained'} disabled={!props.item.inStock} onClick={() => props.onClick()} children={
      <Box>
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
            {props.item.inStock ? t('inStorage') : t('outOfStock')}
          </Typography>
        </Box>
      </Box>
    }/>
  )
}

export default ClickableItem;
