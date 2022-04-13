import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography, Box } from '@mui/material';
import { useAppSelector } from '../Redux/hooks'
import { selectAuth } from '../Redux/authSlice';
import {getStaff, loginStaff, logoutStaff, registerStaff } from '../utils/staffRequests';
import { addItem, getItems, retrieveItems } from '../utils/storageRequests';
import { postOrder, getOrder } from '../utils/ordersRequests';
import { generalStyles } from '../styles/generalStyles';
import LanguageSelector from '../MenuComponents/LanguageSelector';

function ImprintPage() {

  const authState = useAppSelector(selectAuth)

  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const [group, setGroup] = React.useState('Food')

  return (
    <Box sx={generalStyles.backgroundContainer}>
      <Typography>Welcome to Ordergoras!</Typography>
      <Paper>
        <Typography>
          {authState.isAuthenticated ? 'Hey ' + authState.name : 'Please log in'}
        </Typography>
      </Paper>
      <Button
        color={'primary'}
        variant={'contained'}
        onClick={() => loginStaff('Monargoras', 'password')}
      >
        Login
      </Button>
      <Button
        color={'primary'}
        variant={'contained'}
        onClick={() => logoutStaff()}
      >
        Logout
      </Button>
      <Button
        color={'primary'}
        variant={'contained'}
        onClick={() => registerStaff('Monargoras', 'password')}
      >
        register User
      </Button>

      <Button
        color={'primary'}
        variant={'contained'}
        onClick={() => getStaff('1ad60f8a331f4845bd6e7aa2730e7a8c')}
      >
        get Staff
      </Button>
      <Button
        color={'secondary'}
        variant={'contained'}
        onClick={() => getItems(['0c63165d847b4f459d53966946aac8c5','8eb3426d4648408a80acc8e16427d451','90e356b3690d4b579efd01d30aa16766'])}
      >
        get Items
      </Button>
      <Button
        color={'secondary'}
        variant={'contained'}
        onClick={() => retrieveItems({'90e356b3690d4b579efd01d30aa16766': 2, 'b89792752d804dffb973bfb7daa59552': 5, 'dd3d742436fc4987a7658ee4e8fcfefe': 3})}
      >
        retrieve Items
      </Button>
      <TextField value={name} onChange={e => setName(e.target.value)}/>
      <TextField type={'number'} value={amount} onChange={e => !isNaN(parseInt(e.target.value)) ? setAmount(parseInt(e.target.value)) : {}}/>
      <FormControl>
        <FormLabel>Group</FormLabel>
        <RadioGroup row value={group} onChange={e => setGroup(e.target.value)}>
          <FormControlLabel value='Food' control={<Radio/>} label='Food'/>
          <FormControlLabel value='Drink' control={<Radio/>} label='Drink'/>
          <FormControlLabel value='Other' control={<Radio/>} label='Other'/>
        </RadioGroup>
      </FormControl>
      <Button
        color={'secondary'}
        variant={'contained'}
        onClick={() => addItem(name, amount, group, 1.50)}
      >
        add Item
      </Button>
      <Button
        color={'success'}
        variant={'contained'}
        onClick={() => postOrder(1, '1ad60f8a331f4845bd6e7aa2730e7a8c', {'90e356b3690d4b579efd01d30aa16766': 2, 'b89792752d804dffb973bfb7daa59552': 5, 'dd3d742436fc4987a7658ee4e8fcfefe': 3})}
      >
        post Order
      </Button>
      <Button
        color={'success'}
        variant={'contained'}
        onClick={() => getOrder('ef6f5b4045ef4450ae5a98e13f077dc7')}
      >
        get Order
      </Button>

      <LanguageSelector/>

      <Link to={'/'}><Typography>Home</Typography></Link>
    </Box>
  );
}

export default ImprintPage;
