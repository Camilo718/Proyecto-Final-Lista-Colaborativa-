import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usuarios } from '../../db.js' // Importa los usuarios

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (username, password) => {
    // Validación usando db.js
    const userFound = usuarios.find(
      (u) => u.username === username && u.password === password
    )
    if (userFound) {
      setUser({ username: userFound.username })
      localStorage.setItem('usuarioActual', userFound.username)
      toast.success('Login exitoso!')
      navigate('/usuarios')
    } else {
      toast.error('Credenciales incorrectas')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('usuarioActual')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}