import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import Listas from "../Componets/listas.jsx";
import SearchInput from "../Componets/SearchInput.jsx";

function Inicio() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800">
      <header className="flex justify-between items-center p-4 sm:p-6 bg-white/70 backdrop-blur-md shadow-md rounded-b-xl">
        <div className="flex items-center gap-3">
          {/* Puedes poner aquí el icono de usuario */}
          <span className="font-semibold text-lg hidden sm:block text-blue-700">
            ¡Bienvenido, {user?.username}!
          </span>
        </div>
        <div className="flex-grow mx-4 max-w-lg">
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <button
          onClick={logout}
          className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all font-semibold"
        >
          Cerrar Sesión
        </button>
      </header>
      <main className="p-4 sm:p-8">
        <Listas autorActual={user?.username} searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default Inicio;