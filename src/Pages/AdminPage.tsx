import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import AdminItem from '../OrderComponents/AdminItem';
import { theme } from '../index';
import { Item } from '../utils/types';

function AdminPage() {

  const styles = {
    accordionTitle: {
      width: '100%',
      flexShrink: 0,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<string | false>('items')
  const [items, setItems] = React.useState<Item[] | undefined>(undefined)
  const [sortKey, setSortKey] = React.useState(undefined)
  const [sortAsc, setSortAsc] = React.useState(true)

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
                  item={item}
                  color={item.group === 'Drink' ? theme.palette.primary.light : item.group === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark}
                />
              })
              :
              dataState.allItems &&
              dataState.allItems.map((item) => {
                return <AdminItem
                  item={item}
                  color={item.group === 'Drink' ? theme.palette.primary.light : item.group === 'Food' ? theme.palette.primary.main : theme.palette.primary.dark}
                />
              })
          }
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
