import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
import GlobalStyles from './styles/globalStyles'
import AppProvider from './hooks'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <RouterProvider router={router}/>
    <GlobalStyles />
    <ToastContainer autoClose={2000} theme='colored' />
    </AppProvider>
  </React.StrictMode>,
)
