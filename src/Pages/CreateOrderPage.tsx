import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip, Paper, Button, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { theme } from '../index';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Order, Item, ItemEnum} from '../utils/types';
import { selectAuth } from '../Redux/authSlice';
import ClickableItem from '../OrderComponents/ClickableItem';
import { postOrder } from '../utils/ordersRequests';
import { getAllItems } from '../utils/storageRequests';

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
      borderColor: theme.palette.divider,
    },
  }

  const tables = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

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
  const [expanded, setExpanded] = React.useState<string | false>(Object.values(ItemEnum)[0] as string)
  const [order, setOrder] = React.useState<Order>(getInitOrder)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const setTableNr = (event: SelectChangeEvent) => {
    let newOrder = JSON.parse(JSON.stringify(order))
    console.log(event.target.value)
    newOrder.tableNr = event.target.value === 'tableSelect' ? -1 : event.target.value
    setOrder(newOrder)
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

  const removeItemFromOrder = (item: Item, deleteAll: boolean = false) => {
    let newOrder = JSON.parse(JSON.stringify(order))
    const amount = newOrder.orderedItems[item.itemId]
    if(amount === 1 || deleteAll) {
      delete newOrder.orderedItems[item.itemId]
    } else {
      newOrder.orderedItems[item.itemId] -= 1
    }
    newOrder.price -= (item.price * (deleteAll ? amount : 1))
    setOrder(newOrder)
  }

  const submitOrder = () => {
    postOrder(order.tableNr, order.orderedItems)
    setTimeout(() => {
      getAllItems()
      setOrder(getInitOrder)
    }, 1000)
  }

  return (
    <Box sx={{textAlign: 'center', margin: 1}}>
      <Paper sx={{padding: 1, marginBottom: 2}}>
        {Object.keys(order.orderedItems).map((itemId) => {
          return dataState.itemIdMap &&
            <Chip
              key={itemId}
              sx={{
                ...styles.chip,
                backgroundColor: ItemEnum[dataState.itemIdMap[itemId]['group']] === 0 ? theme.palette.primary.light :
                  ItemEnum[dataState.itemIdMap[itemId]['group']] === 1 ? theme.palette.primary.main :
                    ItemEnum[dataState.itemIdMap[itemId]['group']] === 2 ? theme.palette.tertiary.main :
                      theme.palette.primary.dark,
                ':hover': {
                  backgroundColor: ItemEnum[dataState.itemIdMap[itemId]['group']] === 0 ? theme.palette.primary.main :
                    ItemEnum[dataState.itemIdMap[itemId]['group']] === 1 ? theme.palette.primary.dark :
                      ItemEnum[dataState.itemIdMap[itemId]['group']] === 2 ? theme.palette.tertiary.dark :
                        theme.palette.primary.main
                }
            }}
              label={dataState.itemIdMap[itemId]['name'] + ': ' + order.orderedItems[itemId]}
              onClick={() => {
                if(dataState.itemIdMap)
                  removeItemFromOrder(dataState.itemIdMap[itemId])
              }}
              onDelete={() => {
                if(dataState.itemIdMap)
                  removeItemFromOrder(dataState.itemIdMap[itemId], true)
              }}
            />
        })}
        {
          Object.keys(order.orderedItems).length === 0 &&
            <Typography variant={'h6'} sx={{padding: 1}}>{t('emptyOrder')}</Typography>
        }
        <Box>
          <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
          <Typography>
            {t('total')}: {order.price.toFixed(2)}€
          </Typography>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <FormControl>
              <Select
                value={order.tableNr.toString()}
                onChange={setTableNr}
                variant={'standard'}
              >
                <MenuItem value={-1}>{t('selectTable')}</MenuItem>
                {
                  tables.map((tableNr: number) => <MenuItem key={tableNr} value={tableNr}>{tableNr}</MenuItem>)
                }
              </Select>
            </FormControl>
            <Button
              sx={generalStyles.button}
              color={'primary'}
              variant={'contained'}
              onClick={() => submitOrder()}
              disabled={order.tableNr === -1 || Object.keys(order.orderedItems).length <= 0}
            >
              {t('orderSubmit')}
            </Button>
          </Box>
        </Box>
      </Paper>
      <Accordion expanded={expanded === Object.values(ItemEnum)[0]} onChange={handleChange(Object.values(ItemEnum)[0] as string)}>
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
                  item={item}
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
      <Accordion expanded={expanded === Object.values(ItemEnum)[1]} onChange={handleChange(Object.values(ItemEnum)[1] as string)}>
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
                  item={item}
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
      <Accordion expanded={expanded === Object.values(ItemEnum)[2]} onChange={handleChange(Object.values(ItemEnum)[2] as string)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('wine')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={generalStyles.flexWrapBox}>
            {
              dataState.wine !== undefined &&
              dataState.wine.map((item) => {
                return <ClickableItem
                  key={item.itemId}
                  item={item}
                  onClick={() => addItemToOrder(item)}
                />
              })
            }
            {
              dataState.wine === undefined &&
                <Typography variant={'body1'}>{t('nothingFound')}</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === Object.values(ItemEnum)[3]} onChange={handleChange(Object.values(ItemEnum)[3] as string)}>
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
                  item={item}
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
