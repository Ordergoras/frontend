import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';

function HomePage() {
  const styles = {
    homePage: {
      height: '100%',
      width: '100%',
    },
    button: {
    },
  }

  return (
    <div style={styles.homePage}>
      <Typography>Welcome to Ordergoras!</Typography>
      <Paper>
        <Typography>
          Paper
        </Typography>
      </Paper>
      <Button sx={styles.button} color={'secondary'} variant={'contained'}>Test</Button>
      <Link to={'/about'}><Typography>About</Typography></Link>
    </div>
  );
}

export default HomePage;
