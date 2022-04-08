import React from 'react';
import { Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { loginStaff, registerStaff } from '../utils/staffRequests';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { credError, selectAuth } from '../Redux/authSlice';
import { useTranslation } from 'react-i18next';

function LoginRegisterPanel() {

  const authState = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const { t } = useTranslation();

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
      dispatch(credError({error: true, errorMessage: t('errorCredInvalid')}))
      return
    } else if(mode === 'register' && password !== repeatPassword) {
      dispatch(credError({error: true, errorMessage: t('errorPassMatch')}))
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
      <Typography variant={'h5'} sx={{paddingBottom: 1}}>Ordergoras</Typography>
      <FormControl>
        <TextField
          sx={generalStyles.textField}
          label={t('username')}
          error={authState.error}
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyPress={
            event => {
              if (event.key === "Enter") {
                submit()
              }
            }}
        />
        <TextField
          sx={generalStyles.textField}
          label={t('password')}
          error={authState.error}
          type={'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={
            event => {
              if (event.key === "Enter") {
                submit()
              }
            }}
        />
        {
          mode === 'register' &&
          <TextField
            sx={generalStyles.textField}
            label={t('repeatPass')}
            error={authState.error}
            type={'password'}
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            onKeyPress={
              event => {
                if (event.key === "Enter") {
                  submit()
                }
              }}
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
          {mode === 'login' ? t('login') : t('registerConfirm')}
        </Button>
        <Button
          sx={generalStyles.button}
          color={'secondary'}
          variant={'text'}
          onClick={() => switchMode()}
        >
          {mode === 'register' ? t('backLogin') : t('needAcc')}
        </Button>
      </FormControl>
    </Paper>
  );
}

export default LoginRegisterPanel;
