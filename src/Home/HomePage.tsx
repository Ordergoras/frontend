import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { selectAuth } from '../Redux/authSlice';
import { getStaff, loginStaff, logoutStaff, registerStaff } from '../utils/staffRequests';
import { addItem, getItems, retrieveItems, updateItemAmount } from '../utils/storageRequests';
import { postOrder, getOrder } from '../utils/ordersRequests';

const styles = {
  button: {

  },
}

export const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdGFmZklkIjoiMWFkNjBmOGEzMzFmNDg0NWJkNmU3YWEyNzMwZTdhOGMifQ.9cp1e4sJbMu3ah-mmGFW-Mq_6Z3b7wcmO0RLNPXgzE0'

function HomePage() {

  const dispatch = useAppDispatch()
  const authState = useAppSelector(selectAuth)

  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const [group, setGroup] = React.useState('Food')

  return (
    <div>
      <Typography>Welcome to Ordergoras!</Typography>
      <Paper>
        <Typography>
          {authState.isAuthenticated ? 'Hey ' + authState.name : 'Please log in'}
        </Typography>
      </Paper>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => loginStaff('Monargoras', 'password')}
      >
        Login
      </Button>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => logoutStaff()}
      >
        Logout
      </Button>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => registerStaff('Monargoras', 'password')}
      >
        register User
      </Button>

      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => getStaff('1ad60f8a331f4845bd6e7aa2730e7a8c')}
      >
        get Staff
      </Button>
      <Button
        sx={styles.button}
        color={'secondary'}
        variant={'contained'}
        onClick={() => getItems(['0c63165d847b4f459d53966946aac8c5','8eb3426d4648408a80acc8e16427d451','90e356b3690d4b579efd01d30aa16766'])}
      >
        get Items
      </Button>
      <Button
        sx={styles.button}
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
        sx={styles.button}
        color={'secondary'}
        variant={'contained'}
        onClick={() => addItem(name, amount, group)}
      >
        add Item
      </Button>
      <Button
        sx={styles.button}
        color={'success'}
        variant={'contained'}
        onClick={() => postOrder(1, '1ad60f8a331f4845bd6e7aa2730e7a8c', {'90e356b3690d4b579efd01d30aa16766': 2, 'b89792752d804dffb973bfb7daa59552': 5, 'dd3d742436fc4987a7658ee4e8fcfefe': 3})}
      >
        post Order
      </Button>
      <Button
        sx={styles.button}
        color={'success'}
        variant={'contained'}
        onClick={() => getOrder('ef6f5b4045ef4450ae5a98e13f077dc7')}
      >
        get Order
      </Button>

      <Link to={'/about'}><Typography>About</Typography></Link>
    </div>
  );
}

export default HomePage;
