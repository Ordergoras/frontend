import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';

function LicensePage() {

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Paper sx={{margin: 1, padding: 1, textAlign: 'start'}}>
        <Typography>
          MIT License <br/>
          <br/>
          Copyright (c) 2022 Ordergoras <br/>
          <br/>
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:<br/>
          <br/>
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.<br/>
          <br/>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </Typography>
      </Paper>

      <Link to={'/'}><Typography>Home</Typography></Link>
    </Box>
  );
}

export default LicensePage;
