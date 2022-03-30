import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Home/HomePage';
import AboutPage from './Home/AboutPage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'about'} element={<AboutPage/>} />
    </Routes>
  );
}

export default App;
