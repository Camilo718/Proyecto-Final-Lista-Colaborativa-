import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usuarios } from '../../db.js'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (username, password) => {
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

export { AuthContext, AuthProvider }