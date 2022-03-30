import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function AboutPage() {
  return (
    <div>
      <p>
        5/7 dentists recommend ordergoras.
      </p>
      <Link to={'/'}><Typography>Home</Typography></Link>
    </div>
  )
}

export default AboutPage;
