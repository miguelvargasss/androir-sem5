import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  nombre: string;
  usuario: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (usuario: string, contraseña: string) => boolean;
  register: (nombre: string, usuario: string, contraseña: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos de usuarios simulados (en una app real usarías Firebase o una API)
const users = [
  { id: '1', nombre: 'Usuario Demo', usuario: 'demo', contraseña: '123456' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (usuario: string, contraseña: string): boolean => {
    const foundUser = users.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if (foundUser) {
      setUser({ id: foundUser.id, nombre: foundUser.nombre, usuario: foundUser.usuario });
      return true;
    }
    return false;
  };

  const register = (nombre: string, usuario: string, contraseña: string): boolean => {
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.usuario === usuario);
    if (existingUser) {
      return false; // Usuario ya existe
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      nombre,
      usuario,
      contraseña
    };
    users.push(newUser);
    setUser({ id: newUser.id, nombre: newUser.nombre, usuario: newUser.usuario });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}