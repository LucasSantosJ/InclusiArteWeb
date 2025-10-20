import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthChange } from '../services/authService';

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null); // null = carregando, true = logado, false = deslogado

  useEffect(() => {
    // A função onAuthChange "escuta" o estado de login.
    // Ela nos devolve o usuário se ele estiver logado, ou null se não estiver.
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setIsAuth(true); // Usuário está logado
      } else {
        setIsAuth(false); // Usuário não está logado
      }
    });

    // Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Enquanto está verificando, não mostra nada (ou um spinner de loading)
  if (isAuth === null) {
    return <div>Verificando autenticação...</div>;
  }

  // Se isAuth for true, mostra a página que ele está tentando acessar (Outlet).
  // Se for false, redireciona para a página de login ('/').
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;