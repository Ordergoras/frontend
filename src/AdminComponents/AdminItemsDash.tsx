import React from 'react';
import {
  Alert, Box, Button, Fab, FormControl, FormControlLabel, Grid, Modal, Paper, Radio, RadioGroup, Snackbar, TextField, Typography
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AdminItem from './AdminItem';
import { theme } from '../index';
import AddIcon from '@mui/icons-material/Add';
import { FoodInfo, Item, ItemEnum, ItemGroup, ItemInfo, WineInfo } from '../utils/types';
import { selectData, setLastChangedItem, updateAllItems } from '../Redux/dataSlice';
import { addItem, deleteItem, getAllItems, updateItem } from '../utils/storageRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useTranslation } from 'react-i18next';
import { generalStyles } from '../styles/generalStyles';

function AdminItemsDash() {

  const styles = {
    modal: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    columnHead: {
      display: 'flex',
      flexDirection: 'row',
    },
    infoTextField: {
      marginBottom: 2,
      width: '100%',
    },
  }

  const dataState = useAppSelector(selectData)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [sortKey, setSortKey] = React.useState<string | undefined>(undefined)
  const [sortAsc, setSortAsc] = React.useState(true)
  const [sorting, setSorting] = React.useState(false)

  const [itemModalOpen, setItemModalOpen] = React.useState(false)
  const [itemEditMode, setItemEditMode] = React.useState(false)
  const [itemId, setItemId] = React.useState('')
  const [itemName, setItemName] = React.useState('')
  const [itemAmount, setItemAmount] = React.useState('')
  const [itemGroup, setItemGroup] = React.useState<ItemGroup>(Object.values(ItemEnum)[0] as ItemGroup)
  const [itemPrice, setItemPrice] = React.useState('')
  const [itemInfo, setItemInfo] = React.useState<ItemInfo | undefined>(undefined)

  React.useEffect(() => {
    if(sorting && dataState.allItems) {
      if(sortKey === 'name' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i2.name.localeCompare(i1.name))))
      } else if(sortKey === 'name' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i1.name.localeCompare(i2.name))))
      } else if(sortKey === 'amount' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i1.amount - i2.amount)))
      } else if(sortKey === 'amount' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i2.amount - i1.amount)))
      } else if(sortKey === 'price' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i1.price - i2.price)))
      } else if(sortKey === 'price' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => ItemEnum[i1.group] - ItemEnum[i2.group] || i2.price - i1.price)))
      } else {
        getAllItems()
      }
    }
    setSorting(false)
  }, [dataState.allItems, dispatch, sortAsc, sortKey, sorting])

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleItemModalOpen = () => setItemModalOpen(true)

  const handleEditItemModalOpen = (item: Item) => {
    dispatch(setLastChangedItem({item: item, action: 'update'}))
    setItemEditMode(true)
    setItemModalOpen(true)
    setItemId(item.itemId)
    setItemName(item.name)
    setItemAmount(item.amount.toString())
    setItemPrice(item.price.toString())
    setItemGroup(item.group)
    setItemInfo(item.information)
  }

  const handleItemModalClose = () => {
    setItemModalOpen(false)
    setItemEditMode(false)
    setItemId('')
    setItemName('')
    setItemAmount('')
    setItemPrice('')
    setItemGroup(Object.values(ItemEnum)[0] as ItemGroup)
    setItemInfo(undefined)
  }

  const handleItemSubmit = (edit: boolean) => {
    if(edit && itemId !== '') {
      updateItem(itemId, itemName, parseInt(itemAmount), itemGroup, parseFloat(itemPrice), itemInfo).then(() => setSnackbarOpen(true))
    } else if(!edit) {
      addItem(itemName, parseInt(itemAmount), itemGroup, parseFloat(itemPrice), itemInfo).then(() => setSnackbarOpen(true))
    }
    handleItemModalClose()
  }

  const handleUndo = (action: 'update' | 'delete' | undefined) => {
    if(action === undefined)
      return
    const item = dataState.lastItemUpdate ? dataState.lastItemUpdate.item : undefined
    if(item) {
      if (action === 'update') {
        updateItem(item.itemId, item.name, item.amount, item.group, item.price, item.information).then(() => {})
      } else if(action === 'delete') {
        addItem(item.name, item.amount, item.group, item.price, item.information).then(() => {})
      }
    }
    dispatch(setLastChangedItem(undefined))
  }

  const sortTable = (newSortKey: string) => {
    setSorting(true)
    if(sortKey === newSortKey) {
      if(sortAsc) {
        setSortAsc(!sortAsc)
      } else {
        setSortKey(undefined)
        setSortAsc(true)
      }
    } else  {
      setSortKey(newSortKey)
      setSortAsc(true)
    }
  }

  const handleItemDelete = () => {
    dispatch(setLastChangedItem({
      item: {itemId: itemId, name: itemName, amount: parseInt(itemAmount), group: itemGroup, price: parseFloat(itemPrice), information: itemInfo},
      action: 'delete'
    }))
    deleteItem(itemId).then(() => setSnackbarOpen(true))
    handleItemModalClose()
  }

  const updateItemInfo = (property: string, newVal: string) => {
    if(itemInfo) {
      const newObj = {...itemInfo, [property]: newVal}
      setItemInfo(newObj)
    } else {
      if(itemGroup === Object.values(ItemEnum)[1]) {
        const newObj = {...cleanFoodInfo, [property]: newVal}
        setItemInfo(newObj)
      } else if(itemGroup === Object.values(ItemEnum)[2]) {
        const newObj = {...cleanWineInfo, [property]: newVal}
        setItemInfo(newObj)
      }
    }
  }

  const cleanWineInfo: WineInfo = {
    wineId: '',
    description: '',
    winery: '',
    year: '',
    bottleSize: '',
    glassSize: '',
  }

  const cleanFoodInfo: FoodInfo = {
    description: '',
  }

  const renderInfoInput = () => {
    switch(itemGroup) {
      case Object.values(ItemEnum)[0]:
        return (
          <>
          </>
        )
      case Object.values(ItemEnum)[1]:
        return (
          <>
            <TextField
              sx={styles.infoTextField}
              label={t('description')}
              value={itemInfo ? itemInfo.description : ''}
              onChange={e => updateItemInfo('description', e.target.value)}
            />
          </>
        )
      case Object.values(ItemEnum)[2]:
        return (
          <Grid container sx={{justifyContent: 'space-evenly'}}>
            <Grid item xs={2}>
              <TextField
                sx={styles.infoTextField}
                label={t('wineId')}
                // @ts-ignore
                value={itemInfo ? itemInfo.wineId : ''}
                onChange={e => updateItemInfo('wineId', e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                sx={styles.infoTextField}
                label={t('description')}
                value={itemInfo ? itemInfo.description : ''}
                onChange={e => updateItemInfo('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={styles.infoTextField}
                label={t('year')}
                // @ts-ignore
                value={itemInfo ? itemInfo.year : ''}
                onChange={e => updateItemInfo('year', e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                sx={styles.infoTextField}
                label={t('winery')}
                // @ts-ignore
                value={itemInfo ? itemInfo.winery : ''}
                onChange={e => updateItemInfo('winery', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={styles.infoTextField}
                label={t('glassSize')}
                // @ts-ignore
                value={itemInfo ? itemInfo.glassSize : ''}
                onChange={e => updateItemInfo('glassSize', e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                sx={styles.infoTextField}
                label={t('bottleSize')}
                // @ts-ignore
                value={itemInfo ? itemInfo.bottleSize : ''}
                onChange={e => updateItemInfo('bottleSize', e.target.value)}
              />
            </Grid>
          </Grid>
        )
      default:
        return (
          <>
          </>
        )
    }
  }

  return (
    <Box>
      <Paper sx={{padding: 1, margin: 1, paddingTop: 0, marginTop: 0, display: 'flex', flexDirection: 'row'}}>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{...styles.columnHead, textAlign: 'start'}}>
              {
                sortKey === 'name' && sortAsc && <ArrowDropDownIcon/>
              }
              {
                sortKey === 'name' && !sortAsc && <ArrowDropUpIcon/>
              }
              <Typography onClick={() => sortTable('name')}>
                {t('name')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{...styles.columnHead, justifyContent: 'center',  marginRight: 2}}>
              {
                sortKey === 'amount' && sortAsc && <ArrowDropDownIcon/>
              }
              {
                sortKey === 'amount' && !sortAsc && <ArrowDropUpIcon/>
              }
              <Typography onClick={() => sortTable('amount')}>
                {t('inStorage')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{...styles.columnHead, justifyContent: 'end', marginRight: 2}}>
              {
                sortKey === 'price' && sortAsc && <ArrowDropDownIcon/>
              }
              {
                sortKey === 'price' && !sortAsc && <ArrowDropUpIcon/>
              }
              <Typography onClick={() => sortTable('price')}>
                {t('price')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{height: '60vh', overflow: 'auto'}}>
        {
          dataState.allItems &&
          dataState.allItems.map((item) => {
            return <AdminItem
              key={item.itemId}
              item={item}
              color={ItemEnum[item.group] === 0 ? theme.palette.primary.light :
                ItemEnum[item.group] === 1 ? theme.palette.primary.main :
                ItemEnum[item.group] === 2 ? theme.palette.tertiary.main :
                  theme.palette.primary.dark
              }
              onClick={handleEditItemModalOpen}
            />
          })
        }
      </Box>
      <Fab onClick={handleItemModalOpen} color={'secondary'} size={'small'} sx={{marginTop: 1}}>
        <AddIcon/>
      </Fab>
      <Modal
        open={itemModalOpen}
        onClose={handleItemModalClose}
      >
        <Box sx={styles.modal}>
          <Typography variant={'h6'} sx={{marginBottom: 2}}>
            {itemEditMode ? t('editItem') : t('addItem')}
          </Typography>
          <TextField sx={{marginBottom: 2, width: '95%', alignSelf: 'center'}} label={t('name')} value={itemName} onChange={e => setItemName(e.target.value)}/>
          <TextField sx={{marginBottom: 2, width: '95%', alignSelf: 'center'}} label={t('inStorage')} value={itemAmount}
                     onChange={e => !Number.isNaN(parseInt(e.target.value)) ? setItemAmount(parseInt(e.target.value).toString()) : setItemAmount('')}
          />
          <TextField sx={{marginBottom: 2, width: '95%', alignSelf: 'center'}} label={t('priceEuro')} value={itemPrice}
                     onChange={e => setItemPrice(e.target.value.replace(',', '.').replace(/[^\d.-]/g, ''))}
          />
          <FormControl sx={{marginBottom: 2}}>
            <RadioGroup row value={itemGroup} sx={{justifyContent: 'center'}} onChange={e => {
              setItemGroup(e.target.value as ItemGroup)
              setItemInfo(undefined)
            }}>
              <FormControlLabel value={Object.values(ItemEnum)[0]} control={<Radio color={'secondary'}/>} label={t('drink')}/>
              <FormControlLabel value={Object.values(ItemEnum)[1]} control={<Radio color={'secondary'}/>} label={t('food')}/>
              <FormControlLabel value={Object.values(ItemEnum)[2]} control={<Radio color={'secondary'}/>} label={t('wine')}/>
              <FormControlLabel value={Object.values(ItemEnum)[3]} control={<Radio color={'secondary'}/>} label={t('other')}/>
            </RadioGroup>
          </FormControl>
          {
            renderInfoInput()
          }
          <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button disabled={!(itemName && itemAmount && itemPrice)} color={'secondary'} variant={'contained'}
                    onClick={() => itemEditMode ? handleItemSubmit(true) : handleItemSubmit(false)}
            >
              {itemEditMode ? t('editItem') : t('addItem')}
            </Button>
            {
              itemEditMode &&
                <Button color={'error'} variant={'contained'} onClick={() => handleItemDelete()}>
                  {t('deleteItem')}
                </Button>
            }
          </Box>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={dataState.snackbarMessage && !dataState.snackbarMessage.error ? 3000 : 2000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={dataState.snackbarMessage && dataState.snackbarMessage.error ? 'error' : 'success'}
          sx={generalStyles.snackbarAlert}
          action={dataState.snackbarMessage && !dataState.snackbarMessage.error && dataState.lastItemUpdate &&
            <Button color={'inherit'} size={'small'}
                    onClick={() => dataState.lastItemUpdate ? handleUndo(dataState.lastItemUpdate.action) : {}}
            >
              {t('undo')}
            </Button>
          }
        >
          {dataState.snackbarMessage ? t(dataState.snackbarMessage.messageCode, dataState.snackbarMessage.args) : ''}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AdminItemsDash;
