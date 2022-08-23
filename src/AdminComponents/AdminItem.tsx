import React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Item } from '../utils/types';
import { theme } from '../index';

interface AdminItemProps {
  item: Item,
  color: string,
  onClick: (item: Item) => void,
}

function AdminItem(props: AdminItemProps) {

  const styles = {
    button: {
      width: '100%',
      textTransform: 'none',
    },
    paper: {
      backgroundColor: props.item.inStock ? props.color : theme.palette.error.dark,
      width: '100%',
      padding: 1,
      display: 'flex',
      flexDirection: 'row',
    },
  }

  return (
    <Button sx={styles.button} onClick={() => props.onClick(props.item)}>
      <Paper sx={styles.paper}>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{textAlign: 'start'}}>
              { props.item.name }
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              { props.item.inStock }
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{textAlign: 'end'}}>
              { props.item.price.toFixed(2) + '€' }
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Button>
  )
}

export default AdminItem;
