import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ImprintPage from './Pages/ImprintPage';
import AuthenticationScreen from './Pages/AuthenticationScreen';
import CreateOrderPage from './Pages/CreateOrderPage';
import OpenOrdersPage from './Pages/OpenOrdersPage';
import MyOrdersPage from './Pages/MyOrdersPage';
import ItemsPage from './Pages/ItemsPage';
import { verifyCred } from './utils/staffRequests';

function App() {

  React.useEffect(() => {
    verifyCred()
  }, [])

  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'/login'} element={<AuthenticationScreen/>} />
      <Route path={'/imprint'} element={<ImprintPage/>} />
      <Route path={'/createOrderPage'} element={<CreateOrderPage/>} />
      <Route path={'/openOrdersPage'} element={<OpenOrdersPage/>} />
      <Route path={'/myOrdersPage'} element={<MyOrdersPage/>} />
      <Route path={'/itemsPage'} element={<ItemsPage/>} />
    </Routes>
  );
}

export default App;
