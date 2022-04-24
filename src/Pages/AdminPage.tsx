import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, FormControlLabel, Grid, IconButton, Modal, Paper, Radio, RadioGroup, TextField, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import AdminItem from '../OrderComponents/AdminItem';
import { theme } from '../index';
import { Item } from '../utils/types';
import AddIcon from '@mui/icons-material/Add';
import { addItem } from '../utils/storageRequests';

function AdminPage() {

  const styles = {
    accordionTitle: {
      width: '100%',
      flexShrink: 0,
    },
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
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<string | false>('items')
  const [items, setItems] = React.useState<Item[] | undefined>(undefined)
  const [sortKey, setSortKey] = React.useState(undefined)
  const [sortAsc, setSortAsc] = React.useState(true)

  const [itemModalOpen, setItemModalOpen] = React.useState(false)
  const [itemName, setItemName] = React.useState('')
  const [itemAmount, setItemAmount] = React.useState('')
  const [itemGroup, setItemGroup] = React.useState('Food')
  const [itemPrice, setItemPrice] = React.useState('')

  React.useEffect(() => {
    if(dataState.allItems && sortKey === 'amount' && !sortAsc) {
      setItems([...dataState.allItems].sort((i1, i2) => i1.amount - i2.amount))
    } else if(dataState.allItems && sortKey === 'amount' && sortAsc) {
      setItems([...dataState.allItems].sort((i1, i2) => i2.amount - i1.amount))
    } else if(dataState.allItems && sortKey === 'price' && !sortAsc) {
      setItems([...dataState.allItems].sort((i1, i2) => i1.price - i2.price))
    } else if(dataState.allItems && sortKey === 'price' && sortAsc) {
      setItems([...dataState.allItems].sort((i1, i2) => i2.price - i1.price))
    }
  }, [dataState.allItems, sortAsc, sortKey])

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleItemModalOpen = () => setItemModalOpen(true)
  const handleItemModalClose = () => {
    setItemModalOpen(false)
    setItemName('')
    setItemAmount('')
    setItemPrice('')
    setItemGroup('Food')
  }

  const handleItemSubmit = () => {
    addItem(itemName, parseInt(itemAmount), itemGroup, parseFloat(itemPrice))
    handleItemModalClose()
  }

  return (
    <Box sx={{textAlign: 'center', margin: 1}}>
      <Accordion expanded={expanded === 'items'} onChange={handleChange('items')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('itemDash')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{padding: 1, margin: 1, display: 'flex', flexDirection: 'row'}}>
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'start'}}>
                  {t('name')}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  {t('inStorage')}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{textAlign: 'end'}}>
                  {t('price')}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          {
            items ?
              items.map((item) => {
                return <AdminItem
                  key={item.itemId}
                  item={item}
                  color={item.group === 'Drink' ? theme.palette.primary.light : item.group === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark}
                />
              })
              :
              dataState.allItems &&
              dataState.allItems.map((item) => {
                return <AdminItem
                  key={item.itemId}
                  item={item}
                  color={item.group === 'Drink' ? theme.palette.primary.light : item.group === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark}
                />
              })
          }
          <IconButton onClick={handleItemModalOpen} color={'secondary'}>
            <AddIcon/>
          </IconButton>
          <Modal
            open={itemModalOpen}
            onClose={handleItemModalClose}
          >
            <Box sx={styles.modal}>
              <Typography variant={'h6'} sx={{marginBottom: 1}}>
                {t('addItem')}
              </Typography>
              <TextField sx={{marginBottom: 1}} label={t('name')} value={itemName} onChange={e => setItemName(e.target.value)}/>
              <TextField sx={{marginBottom: 1}} label={t('inStorage')} value={itemAmount}
                         onChange={e => !Number.isNaN(parseInt(e.target.value)) ? setItemAmount(parseInt(e.target.value).toString()) : setItemAmount('')}
              />
              <TextField sx={{marginBottom: 1}} label={t('priceEuro')} value={itemPrice}
                         onChange={e => setItemPrice(e.target.value.replace(',', '.').replace(/[^\d.-]/g, ''))}
              />
              <FormControl sx={{marginBottom: 1}}>
                <RadioGroup row value={itemGroup} onChange={e => setItemGroup(e.target.value)}>
                  <FormControlLabel value={'Food'} control={<Radio color={'secondary'}/>} label={t('food')}/>
                  <FormControlLabel value={'Drink'} control={<Radio color={'secondary'}/>} label={t('drink')}/>
                  <FormControlLabel value={'Other'} control={<Radio color={'secondary'}/>} label={t('other')}/>
                </RadioGroup>
              </FormControl>
              <Button disabled={!(itemName && itemAmount && itemPrice)} color={'secondary'} variant={'contained'}
                      onClick={() => handleItemSubmit()}
              >
                {t('addItem')}
              </Button>
            </Box>
          </Modal>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'staff'} onChange={handleChange('staff')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('staffDash')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Staff  Overview
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default AdminPage;
