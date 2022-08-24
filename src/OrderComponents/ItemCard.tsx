import React from 'react';
import { Item } from '../utils/types';
import { Box, Paper, Typography } from '@mui/material';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import {isFoodInfo, isWineInfo} from '../utils/helperFunctions';

interface ItemCardProps {
  item: Item,
  color: string,
}

function ItemCard(props: ItemCardProps) {

  const styles = {
    paper: {
      maxWidth: '20%',
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
      {
        props.item.group === 'Wine' && isWineInfo(props.item.information) &&
          <>
              <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
              <Typography variant={'subtitle2'}>
                {props.item.information?.fullName}
              </Typography>
              <Typography variant={'subtitle2'}>
                {props.item.information?.winery}
              </Typography>
          </>
      }
      {
        props.item.group === 'Food' && props.item.information && isFoodInfo(props.item.information) && props.item.information?.description &&
          <>
              <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
              <Typography variant={'subtitle2'}>
                {props.item.information?.description}
              </Typography>
          </>
      }
      <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {
          props.item.group === 'Wine' && isWineInfo(props.item.information) &&
            <Typography variant={'subtitle2'} sx={styles.text}>
              {t('year')}{': '}{props.item.information?.year}
            </Typography>
        }
        {
          props.item.group !== 'Wine' &&
            <Typography variant={'subtitle2'} sx={styles.text}>
              {t('price')}: {props.item.price.toFixed(2)}€
            </Typography>
        }
        <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1, marginBottom: props.item.group === 'Wine' ? -1 : 0}}/>
        <Typography variant={'subtitle2'} sx={styles.text}>
          {props.item.inStock ? t('inStorage') : t('outOfStock')}
        </Typography>
      </Box>
      {
        props.item.group === 'Wine' && isWineInfo(props.item.information) &&
          <>
            <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              {
                props.item.information?.pointOnePrice !== '' &&
                  <>
                    <Typography variant={'subtitle2'} sx={styles.text}>
                      {t('pointOne')}{': '}{parseFloat(props.item.information?.pointOnePrice).toFixed(2)}€
                    </Typography>
                    <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
                  </>
              }
              {
                props.item.information?.pointTwoPrice !== '' &&
                <>
                  <Typography variant={'subtitle2'} sx={styles.text}>
                    {t('pointTwo')}{': '}{parseFloat(props.item.information?.pointTwoPrice).toFixed(2)}€
                  </Typography>
                  <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
                </>
              }
              {
                props.item.information?.pointFourPrice !== '' &&
                <>
                  <Typography variant={'subtitle2'} sx={styles.text}>
                    {t('pointFour')}{': '}{parseFloat(props.item.information?.pointFourPrice).toFixed(2)}€
                  </Typography>
                  <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
                </>
              }
              {
                props.item.information?.bottlePrice !== '' &&
                <Typography variant={'subtitle2'} sx={styles.text}>
                  {t('bottle')}{': '}{parseFloat(props.item.information?.bottlePrice).toFixed(2)}€
                </Typography>
              }
            </Box>
          </>
      }
    </Paper>
  )
}

export default ItemCard;
