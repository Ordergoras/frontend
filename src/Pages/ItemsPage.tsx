import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import ItemCard from '../OrderComponents/ItemCard';
import { theme } from '../index';
import { generalStyles } from '../styles/generalStyles';
import { useTranslation } from 'react-i18next';

function ItemsPage() {

  const styles = {
    paper: {
      padding: 2,
      margin: 1,
      backgroundColor: theme.palette.background.default,
    },
    divider: {
      border: 1,
      marginTop: 1,
      marginBottom: 1,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()

  return (
    <Box sx={{textAlign: 'center', paddingTop: 1, paddingBottom: 1}}>
      <Paper sx={styles.paper}>
        <Typography variant={'h5'}>
          {t('drinks')}
        </Typography>
        <Box sx={{...styles.divider}}/>
        <Box sx={generalStyles.flexWrapBox}>
          {
            dataState.drinks !== undefined &&
            dataState.drinks.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.light}/>
            })
          }
          {
            dataState.drinks === undefined &&
              <Typography variant={'body1'}>{t('nothingFound')}</Typography>
          }
        </Box>
      </Paper>
      <Paper sx={styles.paper}>
        <Typography variant={'h5'}>
          {t('food')}
        </Typography>
        <Box sx={{...styles.divider}}/>
        <Box sx={generalStyles.flexWrapBox}>
          {
            dataState.food !== undefined &&
            dataState.food.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.main}/>
            })
          }
          {
            dataState.food === undefined &&
              <Typography variant={'body1'}>{t('nothingFound')}</Typography>
          }
        </Box>
      </Paper>
      <Paper sx={styles.paper}>
        <Typography variant={'h5'}>
          {t('wine')}
        </Typography>
        <Box sx={{...styles.divider}}/>
        <Box sx={generalStyles.flexWrapBox}>
          {
            dataState.wine !== undefined &&
            dataState.wine.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.tertiary.main}/>
            })
          }
          {
            dataState.wine === undefined &&
              <Typography variant={'body1'}>{t('nothingFound')}</Typography>
          }
        </Box>
      </Paper>
      <Paper sx={styles.paper}>
        <Typography variant={'h5'}>
          {t('other')}
        </Typography>
        <Box sx={{...styles.divider}}/>
        <Box sx={generalStyles.flexWrapBox}>
          {
            dataState.other !== undefined &&
            dataState.other.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.dark}/>
            })
          }
          {
            dataState.other === undefined &&
              <Typography variant={'body1'}>{t('nothingFound')}</Typography>
          }
        </Box>
      </Paper>
    </Box>
  )
}

export default ItemsPage;
