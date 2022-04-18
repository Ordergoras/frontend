import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip, Paper } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { theme } from '../index';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Order, Item } from '../utils/types';
import { selectAuth } from '../Redux/authSlice';
import ClickableItem from '../OrderComponents/ClickableItem';

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

  const removeItemFromOrder = (item: Item) => {
    let newOrder = JSON.parse(JSON.stringify(order))
    if(newOrder.orderedItems[item.itemId] === 1) {
      delete newOrder.orderedItems[item.itemId]
    } else {
      newOrder.orderedItems[item.itemId] -= 1
    }
    newOrder.price -= item.price
    setOrder(newOrder)
  }

  return (
    <Box sx={{textAlign: 'center', margin: 1}}>
      <Paper sx={{padding: 1, marginBottom: 2, minHeight: '10vh'}}>
        {Object.keys(order.orderedItems).map((itemId) => {
          return dataState.itemIdMap &&
            <Chip
              key={itemId}
              sx={{
                ...styles.chip,
                backgroundColor: dataState.itemIdMap[itemId]['group'] === 'Drink' ? theme.palette.primary.light :
                  dataState.itemIdMap[itemId]['group'] === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark
            }}
              label={dataState.itemIdMap[itemId]['name'] + ': ' + order.orderedItems[itemId]}
              onClick={() => {
                if(dataState.itemIdMap)
                  removeItemFromOrder(dataState.itemIdMap[itemId])
              }}
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
                return <ClickableItem
                  key={item.itemId}
                  item={{...item, amount: item.amount - (isNaN(order.orderedItems[item.itemId]) ? 0 : order.orderedItems[item.itemId])}}
                  color={theme.palette.primary.light}
                  onClick={() => addItemToOrder(item)}
                />
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
                return <ClickableItem
                  key={item.itemId}
                  item={{...item, amount: item.amount - (isNaN(order.orderedItems[item.itemId]) ? 0 : order.orderedItems[item.itemId])}}
                  color={theme.palette.primary.main}
                  onClick={() => addItemToOrder(item)}
                />
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
                return <ClickableItem
                  key={item.itemId}
                  item={{...item, amount: item.amount - (isNaN(order.orderedItems[item.itemId]) ? 0 : order.orderedItems[item.itemId])}}
                  color={theme.palette.primary.dark}
                  onClick={() => addItemToOrder(item)}
                />
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
