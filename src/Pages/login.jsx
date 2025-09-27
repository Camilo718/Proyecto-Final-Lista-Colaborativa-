import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/AuthContext.jsx";
import "../Pages/login.css"; // Importa tus estilos personalizados

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Usa el contexto para login
    login(username, password);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        <motion.div
          className="login-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="login-header">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Iniciar Sesión
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Accede a tu cuenta
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-btn"
            >
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>

          {mensaje && (
            <div
              className={`mensaje ${
                mensaje.includes("exitoso") ? "success" : "error"
              }`}
            >
              {mensaje}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;