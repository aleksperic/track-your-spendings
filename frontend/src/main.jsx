import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BarcodeScanner } from '../components/BarcodeScanner';

import ErrorPage from '../pages/ErrorPage';
import './index.css'
import Receipt, { loader as contactLoader } from './routes/receipt';
import Root, { loader as rootLoader } from './routes/root';



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
        loader: contactLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <h1>login</h1>
  },
  {
    path: "/scan",
    element: <BarcodeScanner />,
  },
  {
    path: "/receipts/:receiptId",
    element: <Receipt />,
    loader: contactLoader

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
