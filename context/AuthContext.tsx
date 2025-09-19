import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

interface UserData {
  fullName: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usuario: string, contraseña: string) => Promise<void>;
  register: (nombre: string, usuario: string, contraseña: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (usuario: string, contraseña: string): Promise<void> => {
    try {
      // Crear email a partir del username (simulando que el email es username@miapp.com)
      const email = `${usuario}@miapp.com`;
      
      await signInWithEmailAndPassword(auth, email, contraseña);
      console.log('Inicio de sesión exitoso');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Usuario o contraseña incorrectos');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Formato de email inválido');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Demasiados intentos fallidos. Intenta más tarde.');
      } else {
        throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
  };

  const register = async (nombre: string, usuario: string, contraseña: string): Promise<void> => {
    try {
      // Crear email a partir del username
      const email = `${usuario}@miapp.com`;
      
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      const userData = {
        fullName: nombre,
        username: usuario,
        email: email,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData);

      console.log('Usuario registrado exitosamente');
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este usuario ya existe. Intenta con otro nombre de usuario.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Formato de email inválido');
      } else {
        throw new Error('Error al registrar usuario. Intenta nuevamente.');
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserData(null);
      console.log('Sesión cerrada exitosamente');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
      throw new Error('Error al cerrar sesión');
    }
  };

  const value = {
    user,
    userData,
    isAuthenticated: !!user,
    isLoading,
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