import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BarcodeScanner } from '../components/BarcodeScanner';

import ErrorPage from '../pages/ErrorPage';
import './index.css'
import Receipt, { loader as receiptLoader } from './routes/receipt';
import Root, { loader as rootLoader } from './routes/root';
import EditReceipt from './routes/edit';
import LoginPage from '../pages/LoginPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "receipts/:receiptId",
        element: <Receipt />,
        loader: receiptLoader,
      },
      {
        path: "receipts/:receiptId/edit",
        element: <EditReceipt />,
        loader: receiptLoader,
      },
      {
        path: '/scan',
        element: <BarcodeScanner />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: "/scan",
    element: <BarcodeScanner />,
  },
  {
    path: "/receipts/:receiptId",
    element: <Receipt />,
    loader: receiptLoader

  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      
    </RouterProvider>
  </React.StrictMode>,
)
