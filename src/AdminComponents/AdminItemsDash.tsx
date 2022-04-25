import React from 'react';
import {
  Alert, Box, Button, FormControl, FormControlLabel, Grid, IconButton, Modal, Paper, Radio, RadioGroup, Snackbar, TextField, Typography
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AdminItem from './AdminItem';
import { theme } from '../index';
import AddIcon from '@mui/icons-material/Add';
import { Item, ItemGroup } from '../utils/types';
import { selectData, setLastChangedItem, updateAllItems } from '../Redux/dataSlice';
import { addItem, deleteItem, getAllItems, updateItem } from '../utils/storageRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useTranslation } from 'react-i18next';

function AdminItemsDash() {

  const styles = {
    modal: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      justifyContent: 'center',
    },
    columnHead: {
      display: 'flex',
      flexDirection: 'row',
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
  const [itemGroup, setItemGroup] = React.useState<ItemGroup>('Food')
  const [itemPrice, setItemPrice] = React.useState('')

  React.useEffect(() => {
    if(sorting && dataState.allItems) {
      console.log('sort', sortKey)
      if(sortKey === 'name' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i2.name.localeCompare(i1.name))))
      } else if(sortKey === 'name' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i1.name.localeCompare(i2.name))))
      } else if(sortKey === 'amount' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i1.amount - i2.amount)))
      } else if(sortKey === 'amount' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i2.amount - i1.amount)))
      } else if(sortKey === 'price' && !sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i1.price - i2.price)))
      } else if(sortKey === 'price' && sortAsc) {
        dispatch(updateAllItems([...dataState.allItems].sort((i1, i2) => i2.price - i1.price)))
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
  }

  const handleItemModalClose = () => {
    setItemModalOpen(false)
    setItemEditMode(false)
    setItemId('')
    setItemName('')
    setItemAmount('')
    setItemPrice('')
    setItemGroup('Food')
  }

  const handleItemSubmit = (edit: boolean) => {
    if(edit && itemId !== '') {
      updateItem(itemId, itemName, parseInt(itemAmount), itemGroup, parseFloat(itemPrice)).then(() => setSnackbarOpen(true))
    } else if(!edit) {
      addItem(itemName, parseInt(itemAmount), itemGroup, parseFloat(itemPrice)).then(() => setSnackbarOpen(true))
    }
    handleItemModalClose()
  }

  const handleUndo = (action: 'update' | 'delete' | undefined) => {
    if(action === undefined)
      return
    const item = dataState.lastItemUpdate ? dataState.lastItemUpdate.item : undefined
    if(item) {
      if (action === 'update') {
        updateItem(item.itemId, item.name, item.amount, item.group, item.price).then(() => {})
      } else if(action === 'delete') {
        addItem(item.name, item.amount, item.group, item.price).then(() => {})
      }
    }
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
    dispatch(setLastChangedItem({item: {itemId: itemId, name: itemName, amount: parseInt(itemAmount), group: itemGroup, price: parseFloat(itemPrice)}, action: 'delete'}))
    deleteItem(itemId).then(() => setSnackbarOpen(true))
    handleItemModalClose()
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
            <Box sx={{...styles.columnHead, justifyContent: 'center'}}>
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
              color={item.group === 'Drink' ? theme.palette.primary.light : item.group === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark}
              onClick={handleEditItemModalOpen}
            />
          })
        }
      </Box>
      <IconButton onClick={handleItemModalOpen} color={'secondary'}>
        <AddIcon/>
      </IconButton>
      <Modal
        open={itemModalOpen}
        onClose={handleItemModalClose}
      >
        <Box sx={styles.modal}>
          <Typography variant={'h6'} sx={{marginBottom: 2}}>
            {itemEditMode ? t('editItem') : t('addItem')}
          </Typography>
          <TextField sx={{marginBottom: 2}} label={t('name')} value={itemName} onChange={e => setItemName(e.target.value)}/>
          <TextField sx={{marginBottom: 2}} label={t('inStorage')} value={itemAmount}
                     onChange={e => !Number.isNaN(parseInt(e.target.value)) ? setItemAmount(parseInt(e.target.value).toString()) : setItemAmount('')}
          />
          <TextField sx={{marginBottom: 2}} label={t('priceEuro')} value={itemPrice}
                     onChange={e => setItemPrice(e.target.value.replace(',', '.').replace(/[^\d.-]/g, ''))}
          />
          <FormControl sx={{marginBottom: 2}}>
            <RadioGroup row value={itemGroup} onChange={e => setItemGroup(e.target.value as ItemGroup)}>
              <FormControlLabel value={'Food'} control={<Radio color={'secondary'}/>} label={t('food')}/>
              <FormControlLabel value={'Drink'} control={<Radio color={'secondary'}/>} label={t('drink')}/>
              <FormControlLabel value={'Other'} control={<Radio color={'secondary'}/>} label={t('other')}/>
            </RadioGroup>
          </FormControl>
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
          sx={{width: '100%'}}
          action={dataState.snackbarMessage && !dataState.snackbarMessage.error &&
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
