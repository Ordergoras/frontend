import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip, Paper } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { theme } from '../index';
import ItemCard from '../OrderComponents/ItemCard';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Order, Item } from '../utils/types';
import { selectAuth } from '../Redux/authSlice';

function CreateOrderPage() {

  const styles = {
    accordionTitle: {
      width: '100%',
      flexShrink: 0,
    },
    chip: {
      margin: 1,
    },
    divider: {
      border: 1,
    },
  }

  const getInitOrder = (): Order => {
    return {
      orderId: 'tbd',
      tableNr: -1,
      staffId: authState.staffId ? authState.staffId: '',
      staffName: authState.name ? authState.name : '',
      orderedItems: {},
      completedItems: {},
      createdAt: Date.now().toLocaleString(),
      completed: false,
      price: 0,
    }
  }

  const authState = useAppSelector(selectAuth)
  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<string | false>('drinks')
  const [order, setOrder] = React.useState<Order>(getInitOrder)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const addItemToOrder = (item: Item) => {
    let newOrder = JSON.parse(JSON.stringify(order))
    if(newOrder.orderedItems[item.itemId] === undefined) {
      newOrder.orderedItems[item.itemId] = 1
    } else {
      newOrder.orderedItems[item.itemId] += 1
    }
    newOrder.price += item.price
    setOrder(newOrder)
  }

  return (
    <Box sx={{textAlign: 'center', margin: 1}}>
      <Paper sx={{padding: 1, marginBottom: 2}}>
        {Object.keys(order.orderedItems).map((itemId) => {
          return dataState.itemIdMap &&
            <Chip
              key={itemId}
              sx={{...styles.chip, backgroundColor: theme.palette.secondary.dark}}
              label={dataState.itemIdMap[itemId] + ': ' + order.orderedItems[itemId]}
              onClick={() => {}}
            />
        })}
        <Box>
          <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
          <Typography>
            Total: {order.price.toFixed(2)}€
          </Typography>
        </Box>
      </Paper>
      <Accordion expanded={expanded === 'drinks'} onChange={handleChange('drinks')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('drinks')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={generalStyles.flexWrapBox}>
            {
              dataState.drinks !== undefined &&
              dataState.drinks.map((item) => {
                return <Box key={item.itemId} onClick={() => addItemToOrder(item)}>
                  <ItemCard item={item} color={theme.palette.primary.light}/>
                </Box>
              })
            }
            {
              dataState.drinks === undefined &&
                <Typography variant={'body1'}>{t('nothingFound')}</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'food'} onChange={handleChange('food')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('food')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={generalStyles.flexWrapBox}>
            {
              dataState.food !== undefined &&
              dataState.food.map((item) => {
                return <Box key={item.itemId} onClick={() => addItemToOrder(item)}>
                  <ItemCard item={item} color={theme.palette.primary.main}/>
                </Box>
              })
            }
            {
              dataState.food === undefined &&
                <Typography variant={'body1'}>{t('nothingFound')}</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'other'} onChange={handleChange('other')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('other')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={generalStyles.flexWrapBox}>
            {
              dataState.other !== undefined &&
              dataState.other.map((item) => {
                return <Box key={item.itemId} onClick={() => addItemToOrder(item)}>
                  <ItemCard item={item} color={theme.palette.primary.dark}/>
                </Box>
              })
            }
            {
              dataState.other === undefined &&
                <Typography variant={'body1'}>{t('nothingFound')}</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default CreateOrderPage;
