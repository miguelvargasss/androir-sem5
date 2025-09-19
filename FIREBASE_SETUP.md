# 🔥 Configuración de Firebase para Autenticación

Esta guía te ayudará a configurar Firebase Authentication y Firestore en tu proyecto.

## 📋 Pasos para Configurar Firebase

### 1. Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto" o "Agregar proyecto"
3. Nombra tu proyecto (ej: "autenticacion-app")
4. Acepta los términos y continúa
5. Habilita Google Analytics (opcional)
6. Haz clic en "Crear proyecto"

### 2. Configurar Authentication

1. En el panel izquierdo, haz clic en **"Authentication"**
2. Haz clic en **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"**
4. Habilita **"Correo electrónico/contraseña"**
5. Haz clic en **"Guardar"**

### 3. Configurar Firestore Database

1. En el panel izquierdo, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de prueba"**
4. Elige una ubicación (recomendado: la más cercana a tus usuarios)
5. Haz clic en **"Listo"**

### 4. Configurar Reglas de Firestore (Importante)

1. En Firestore Database, ve a **"Reglas"**
2. Reemplaza las reglas por defecto con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso a los usuarios autenticados a su propia información
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Haz clic en **"Publicar"**

### 5. Obtener Configuración del Proyecto

1. Ve a **Configuración del proyecto** (ícono de engranaje ⚙️)
2. En la sección **"Tus apps"**, haz clic en **"</>" (Web)**
3. Registra tu app con un nombre (ej: "autenticacion-app")
4. **NO** marques "También configurar Firebase Hosting"
5. Haz clic en **"Registrar app"**
6. **Copia la configuración de Firebase** que aparece

### 6. Configurar tu Proyecto

1. Abre el archivo [`firebaseConfig.js`](firebaseConfig.js) en tu proyecto
2. Reemplaza los valores de ejemplo con tu configuración real:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id-real",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-sender-id-real",
  appId: "tu-app-id-real",
};
```

## 🧪 Probar la Configuración

1. Ejecuta tu app: `npm start`
2. Intenta registrar un nuevo usuario
3. Verifica en Firebase Console:
   - **Authentication > Users**: Debe aparecer el nuevo usuario
   - **Firestore Database**: Debe aparecer una colección "users" con los datos

## 🔒 Cómo Funciona la Autenticación

### Sistema de Email Simulado

- La app convierte el username en email: `usuario@miapp.com`
- Ejemplo: usuario "pedro" → email "pedro@miapp.com"
- Esto permite usar Firebase Auth manteniendo la UX simple

### Datos del Usuario

- **Firebase Auth**: Maneja autenticación y sesiones
- **Firestore**: Almacena datos adicionales (nombre completo, username)

### Flujo de Datos

1. **Registro**: Crea usuario en Auth + guarda datos en Firestore
2. **Login**: Autentica en Auth + obtiene datos de Firestore
3. **Sesión**: Firebase mantiene la sesión automáticamente

## 🚨 Troubleshooting

### Error: "Firebase project not found"

- Verifica que el `projectId` en `firebaseConfig.js` sea correcto

### Error: "Auth operation not allowed"

- Asegúrate de haber habilitado "Email/Password" en Authentication > Sign-in method

### Error: "Permission denied"

- Revisa las reglas de Firestore
- Asegúrate de que el usuario esté autenticado

### No aparecen datos del usuario

- Verifica que Firestore esté configurado
- Revisa las reglas de seguridad
- Confirma que los datos se estén guardando en la colección "users"

## 📱 Funcionalidades Implementadas

✅ Registro de usuarios con Firebase Auth  
✅ Login con email/contraseña  
✅ Almacenamiento de datos en Firestore  
✅ Gestión automática de sesiones  
✅ Logout seguro  
✅ Validación de errores  
✅ Indicadores de carga  
✅ Navegación condicional

## 🔄 Próximos Pasos

- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Autenticación con Google/Facebook
- [ ] Perfiles de usuario con fotos
- [ ] Persistencia offline

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación oficial de Firebase](https://firebase.google.com/docs)
2. Verifica que todas las dependencias estén instaladas
3. Confirma que tu configuración de Firebase sea correcta
4. Revisa la consola del navegador/app para errores específicos
