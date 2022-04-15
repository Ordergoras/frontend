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
import { getItemIdMap, getAllItems } from './utils/storageRequests';
import { useAppSelector } from './Redux/hooks';
import { selectData } from './Redux/dataSlice';
import { selectAuth } from './Redux/authSlice';

function App() {

  const dataState = useAppSelector(selectData)
  const authState = useAppSelector(selectAuth)

  React.useEffect(() => {
    if(!authState.isAuthenticated) {
      verifyCred()
    }
    if(authState.isAuthenticated && !dataState.itemsFetched) {
      getAllItems()
      getItemIdMap()
    }
  }, [authState.isAuthenticated, dataState.itemsFetched])

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
