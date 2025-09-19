import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Tu configuración de Firebase
// Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACGqPmwXEDqU-Vl8VBmyJwnBmPO_19h0w",
  authDomain: "actividad-sem5.firebaseapp.com",
  projectId: "actividad-sem5",
  storageBucket: "actividad-sem5.firebasestorage.app",
  messagingSenderId: "1017036962903",
  appId: "1:1017036962903:web:1302758dbab5184e713712",
  measurementId: "G-7SKRMMB9C4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;