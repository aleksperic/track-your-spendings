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
import './index.css'
import Root, { loader as rootLoader } from './routes/root';
import Receipt, { loader as receiptLoader } from './routes/receipt';
import PrivateRoutes from '../utils/PrivateRoutes';
import Index from './routes';


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Root />} loader={rootLoader} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Index />} />
          <Route path='receipts/:receiptId' element={<Receipt />} loader={receiptLoader} />
          <Route path='receipts/:receiptId/destroy' element={<Index />} loader={receiptLoader} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/scan' element={<BarcodeScanner />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)