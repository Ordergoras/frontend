import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ImprintPage from './Pages/ImprintPage';
import AuthenticationScreen from './Pages/AuthenticationScreen';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'/login'} element={<AuthenticationScreen/>} />
      <Route path={'/imprint'} element={<ImprintPage/>} />
    </Routes>
  );
}

export default App;
