import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { getAllItems } from '../utils/storageRequests';
import ItemCard from '../OrderComponents/ItemCard';
import { theme } from '../index';
import { generalStyles } from '../styles/generalStyles';
import { useTranslation } from 'react-i18next';

function ItemsPage() {

  const styles = {
    topMargin: {
      marginTop: 1,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()

  React.useEffect(() => {
    getAllItems()
  }, [])

  return (
    <Box sx={{textAlign: 'center', paddingTop: 1, paddingBottom: 1}}>
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('drinks')}
      </Typography>
      <Box sx={generalStyles.flexWrapBox}>
        {
          dataState.drinks !== undefined &&
            dataState.drinks.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.light}/>
            })
        }
        {
          dataState.drinks === undefined &&
            <Typography variant={'body1'} color={theme.palette.background.default}>{t('nothingFound')}</Typography>
        }
      </Box>
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('food')}
      </Typography>
      <Box sx={generalStyles.flexWrapBox}>
        {
          dataState.food !== undefined &&
            dataState.food.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.main}/>
            })
        }
        {
          dataState.food === undefined &&
            <Typography variant={'body1'} color={theme.palette.background.default}>{t('nothingFound')}</Typography>
        }
      </Box>
      <Typography variant={'h4'} color={theme.palette.background.default} sx={styles.topMargin}>
        {t('other')}
      </Typography>
      <Box sx={generalStyles.flexWrapBox}>
        {
          dataState.other !== undefined &&
            dataState.other.map((item) => {
              return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.dark}/>
            })
        }
        {
          dataState.other === undefined &&
            <Typography variant={'body1'} color={theme.palette.background.default}>{t('nothingFound')}</Typography>
        }
      </Box>
    </Box>
  )
}

export default ItemsPage;
