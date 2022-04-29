import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import { createTheme, CssBaseline, GlobalStyles, PaletteColor, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import './utils/i18n';
import App from './App';
import store from './Redux/store'
import LoadingScreen from './Pages/LoadingScreen';
import Appbar from './MenuComponents/Appbar';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary: PaletteColor;
  }
}

const { palette } = createTheme()
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ef6f17',
    },
    tertiary: palette.augmentColor({
      color: {
        main: '#814dbd'
      }
    }),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingScreen/>}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Appbar/>
            <App/>
            <CssBaseline/>
            <GlobalStyles styles={{body:
                {background: 'linear-gradient(to right bottom, #FF7043, #FFAB40)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}
            }}/>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
