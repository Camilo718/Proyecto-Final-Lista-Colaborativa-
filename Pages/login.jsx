import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../db.js"; // Importa los usuarios

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const userFound = usuarios.find(
      (user) => user.username === username && user.password === password
    );
    if (userFound) {
      setMensaje("Login exitoso. Redirigiendo...");
      localStorage.setItem("usuarioActual", username);
      setTimeout(() => navigate("/usuarios"), 1000);
    } else {
      setMensaje("Usuario o contraseña incorrectos");
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* Tu formulario de login aquí */}
    </div>
  );
}

export default Login;