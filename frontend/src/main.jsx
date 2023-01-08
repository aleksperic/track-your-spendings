import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BarcodeScanner } from '../components/BarcodeScanner';
import { DataLoader } from '../components/DataFetching';
// import { AuthProvider } from '../context/AuthContext';
import ErrorPage from '../pages/ErrorPage';
import './index.css'
import Receipt from './routes/receipt';
import Root from './routes/root';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: DataLoader,
    // children: [
    //   {
    //     path: "receipts/:receiptId",
    //     element: <Receipt />,
    //   },
    // ],
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
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
