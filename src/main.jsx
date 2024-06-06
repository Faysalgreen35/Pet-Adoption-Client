import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import {
   RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { HelmetProvider } from 'react-helmet-async'; 

import { 
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'


const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HelmetProvider>
     <AuthProvider>
     <QueryClientProvider client={queryClient}>
     
    <div className='max-w-screen-xl mx-auto  dark:bg-gray-800  dark:text-white '>
    <RouterProvider router={router} />
    </div>
    
    </QueryClientProvider>
    </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
