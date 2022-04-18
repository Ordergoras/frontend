import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { theme } from '../index';
import ItemCard from '../OrderComponents/ItemCard';
import { useAppSelector } from '../Redux/hooks';
import { selectData } from '../Redux/dataSlice';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CreateOrderPage() {

  const styles = {
    accordionTitle: {
      width: '100%',
      flexShrink: 0,
    },
  }

  const dataState = useAppSelector(selectData)
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  React.useEffect(() => {

  }, [])

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{textAlign: 'center', margin: 1}}>
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
                return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.light}/>
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
                return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.main}/>
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
                return <ItemCard key={item.itemId} item={item} color={theme.palette.primary.dark}/>
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
