import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import AdminItemsDash from '../AdminComponents/AdminItemsDash';

function AdminPage() {

  const styles = {
    accordionTitle: {
      width: '100%',
      flexShrink: 0,
    },
  }

  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<string | false>('items')

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
          <AdminItemsDash/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'stats'} onChange={handleChange('stats')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={styles.accordionTitle}>
            {t('statsDash')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Statistics
          </Typography>
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
