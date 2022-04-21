import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LicensePage from './Pages/LicensePage';
import AuthenticationScreen from './Pages/AuthenticationScreen';
import CreateOrderPage from './Pages/CreateOrderPage';
import OpenOrdersPage from './Pages/OpenOrdersPage';
import MyOrdersPage from './Pages/MyOrdersPage';
import ItemsPage from './Pages/ItemsPage';
import { verifyCred } from './utils/staffRequests';
import { getAllItems } from './utils/storageRequests';
import { useAppSelector } from './Redux/hooks';
import { selectData } from './Redux/dataSlice';
import { selectAuth } from './Redux/authSlice';
import AdminPage from './Pages/AdminPage';

function App() {

  const dataState = useAppSelector(selectData)
  const authState = useAppSelector(selectAuth)

  React.useEffect(() => {
    if(!authState.isAuthenticated) {
      verifyCred()
    }
    if(authState.isAuthenticated && !dataState.itemsFetched) {
      getAllItems()
      setInterval(() => getAllItems(), 300000)
    }
  }, [authState.isAuthenticated, dataState.itemsFetched])

  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'/login'} element={<AuthenticationScreen/>} />
      <Route path={'/license'} element={<LicensePage/>} />
      <Route path={'/createOrder'} element={<CreateOrderPage/>} />
      <Route path={'/openOrders'} element={<OpenOrdersPage/>} />
      <Route path={'/myOrders'} element={<MyOrdersPage/>} />
      <Route path={'/items'} element={<ItemsPage/>} />
      <Route path={'/adminDashboard'} element={<AdminPage/>} />
    </Routes>
  );
}

export default App;
