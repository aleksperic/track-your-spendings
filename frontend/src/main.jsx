import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import { AuthProvider } from '../context/AuthContext';
import { BarcodeScanner } from '../components/BarcodeScanner';

import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import ErrorPage from '../pages/ErrorPage';
import Root, { loader as rootLoader } from './routes/root';
import Receipt, { loader as receiptLoader } from './routes/receipt';
import { action as destroyAction } from './routes/destroy';
import PrivateRoutes from '../utils/PrivateRoutes';
import Index from './routes';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import SpendingChart from '../components/SpendingChart';


const router = createBrowserRouter(

  createRoutesFromElements(
    <>
    <Route path='/' element={<Root />} loader={rootLoader} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route element={<PrivateRoutes />}>
          <Route index element={<SpendingChart />} />
          <Route path='receipts/:receiptId' element={<Receipt />} loader={receiptLoader} />
          <Route path='receipts/:receiptId/destroy' element={<Receipt />} action={destroyAction} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/scan' element={<BarcodeScanner />} />
        </Route>
      </Route>
    </Route>
    <Route path='/index' element={<HomePage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)