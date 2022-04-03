import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { login, logout, selectAuth } from '../Redux/authSlice';
import { createRequest } from '../utils/fetchUtils';

const styles = {
  button: {

  },
}

export const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdGFmZklkIjoiMWFkNjBmOGEzMzFmNDg0NWJkNmU3YWEyNzMwZTdhOGMifQ.9cp1e4sJbMu3ah-mmGFW-Mq_6Z3b7wcmO0RLNPXgzE0"

function HomePage() {

  const dispatch = useAppDispatch()
  const authState = useAppSelector(selectAuth)

  const getItems = () => {
    createRequest('PUT', 'storage/getItems', {itemIds: [1,2,3]})
      .then(res => {
        if(res) res.json().then(data => console.log(data))
      })
      .catch((e) => {alert(e)})
  }

  const registerStaff = () => {
    createRequest('POST', 'staff/registerStaff', {name: 'Monargoras', password: 'password'})
      .then(res => {
        if(res) res.json().then(data => {
          if(res.ok)
            console.log(data)
          else
            alert(data.message)
        })
      })
      .catch((e) => {alert(e)})
  }

  const loginStaff = () => {
    createRequest('POST', 'staff/login', {name: 'Monargoras', password: 'password'})
      .then(res => {
        if(res) res.json().then(data => {
          if(res.ok)
            dispatch(login({token: data.jwtToken, name: data.name}))
          else
            alert(data.message)
        })
      })
      .catch((e) => {alert(e)})
  }

  const logoutStaff = () => {
    createRequest('POST', 'staff/logout', undefined, undefined)
      .then(res => {
        if(res)
          res.json().then(data => {
            alert(data.message)
            if(res.ok)
              dispatch(logout())
          })
      })
      .catch((e) => {alert(e)})
  }

  const getStaff = () => {
    createRequest('GET', 'staff/getStaff', undefined, {staffId: '1ad60f8a331f4845bd6e7aa2730e7a8c'})
      .then(res => {
        if(res && res.ok) res.json().then(data => console.log(data))
      })
      .catch((e) => {console.log(e)})
  }

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
        onClick={() => loginStaff()}
      >
        Login
      </Button>
      <Button
        sx={styles.button}
        color={'secondary'}
        variant={'contained'}
        onClick={() => logoutStaff()}
      >
        Logout
      </Button>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => registerStaff()}
      >
        register User
      </Button>
      <Button
        sx={styles.button}
        color={'secondary'}
        variant={'contained'}
        onClick={() => getItems()}
      >
        get Items
      </Button>
      <Button
        sx={styles.button}
        color={'primary'}
        variant={'contained'}
        onClick={() => getStaff()}
      >
        get Staff
      </Button>
      <Link to={'/about'}><Typography>About</Typography></Link>
    </div>
  );
}

export default HomePage;
