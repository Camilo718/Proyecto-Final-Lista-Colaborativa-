import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Inicio from './Pages/inicio.jsx'
import Login from './Pages/login.jsx'
import './index.css'
import { AuthProvider } from './Context/AuthContext.jsx'
import PrivateRoute from './Componets/PrivateRoute.jsx'
import { Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position='top-right'  autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)