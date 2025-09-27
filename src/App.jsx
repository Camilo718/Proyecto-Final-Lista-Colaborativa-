import React from 'react'
import { useAuth } from './Context/useAuth.js'

export default function App() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a la aplicación</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}