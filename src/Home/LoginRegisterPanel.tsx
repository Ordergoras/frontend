import React from 'react';
import { Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { loginStaff, registerStaff } from '../utils/staffRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { credError, selectAuth } from '../Redux/authSlice';

function LoginRegisterPanel() {

  const authState = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const [mode, setMode] = React.useState<'login' | 'register'>('login')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    dispatch(credError({error: false, errorMessage: undefined}))
    setPassword('')
    setRepeatPassword('')
  }

  const submit = () => {
    if(username.length === 0 || password.length === 0) {
      dispatch(credError({error: true, errorMessage: 'Enter a valid username and password'}))
      return
    } else if(mode === 'register' && password !== repeatPassword) {
      dispatch(credError({error: true, errorMessage: 'Passwords don\'t match'}))
      return
    } else if(authState.error) {
      dispatch(credError({error: false, errorMessage: undefined}))
    }
    if(mode === 'login') {
      loginStaff(username, password)
    } else {
      registerStaff(username, password)
    }
  }

  return (
    <Paper sx={generalStyles.paper} elevation={4}>
      <Typography variant={'h5'} sx={{paddingBottom: 1}}>Ordergoras {mode === 'login' ? 'Login' : 'Register'}</Typography>
      <FormControl>
        <TextField sx={generalStyles.textField} label={'Username'} error={authState.error} value={username} onChange={e => setUsername(e.target.value)}/>
        <TextField sx={generalStyles.textField} label={'Password'} error={authState.error} type={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
        {
          mode === 'register' &&
          <TextField
            sx={generalStyles.textField}
            label={'Repeat Password'}
            error={authState.error}
            type={'password'}
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        }
        {
          authState.error &&
          <Typography variant={'body2'} color={'error'}>{authState.errorMessage}</Typography>
        }
        <Button
          sx={generalStyles.button}
          color={'primary'}
          variant={'contained'}
          onClick={() => submit()}
        >
          {mode === 'login' ? 'Login' : 'Create new User'}
        </Button>
        <Button
          sx={generalStyles.button}
          color={'secondary'}
          variant={'text'}
          onClick={() => switchMode()}
        >
          {mode === 'register' ? 'Back to Login' : 'I need a new account'}
        </Button>
      </FormControl>
    </Paper>
  );
}

export default LoginRegisterPanel;
