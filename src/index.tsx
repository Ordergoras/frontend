import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import './utils/i18n';
import App from './App';
import store from './Redux/store'
import LoadingScreen from './Pages/LoadingScreen';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

ReactDOM.render(
  <React.Suspense fallback={<LoadingScreen/>}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
          <CssBaseline/>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
