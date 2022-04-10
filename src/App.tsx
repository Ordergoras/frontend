import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import AuthenticationScreen from './Pages/AuthenticationScreen';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'login'} element={<AuthenticationScreen/>} />
      <Route path={'about'} element={<AboutPage/>} />
    </Routes>
  );
}

export default App;
