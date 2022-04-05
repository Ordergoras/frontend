import React from 'react';
import { Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import { generalStyles } from '../styles/generalStyles';
import { loginStaff, registerStaff } from '../utils/staffRequests';

function LoginRegisterPanel() {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <Paper sx={generalStyles.paper} elevation={4}>
      <Typography variant={'h5'} sx={{paddingBottom: 1}}>Ordergoras Login</Typography>
      <FormControl>
        <TextField sx={generalStyles.textField} label={'Username'} value={username} onChange={e => setUsername(e.target.value)}/>
        <TextField sx={generalStyles.textField} label={'Password'} type={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
        <Button
          sx={generalStyles.button}
          color={'primary'}
          variant={'contained'}
          onClick={() => loginStaff(username, password)}
        >
          Login
        </Button>
        <Button
          sx={generalStyles.button}
          color={'secondary'}
          variant={'contained'}
          onClick={() => registerStaff(username, password)}
        >
          Create new User
        </Button>
      </FormControl>
    </Paper>
  );
}

export default LoginRegisterPanel;
