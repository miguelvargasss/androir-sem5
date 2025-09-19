# Sistema de Autenticación - Autenticación Firebase

Esta aplicación implementa un sistema de autenticación completo con pantallas de login y registro.

## Funcionalidades Implementadas

### 🔐 Pantalla de Login

- Campos requeridos: Usuario y Contraseña
- Botón "Iniciar Sesión" para autenticarse
- Botón "Registrarse" que lleva al formulario de registro
- Validación de campos obligatorios
- Manejo de errores para credenciales incorrectas

### 📝 Pantalla de Registro

- Campos requeridos: Nombre Completo, Usuario, Contraseña
- Botón "Registro" que crea la cuenta y redirige automáticamente
- Botón "Volver al Login" para regresar
- Validación de campos obligatorios
- Validación de contraseña (mínimo 6 caracteres)
- Verificación de usuarios duplicados

### 🏠 Pantalla Principal

- Saludo personalizado con el nombre del usuario
- Botón "Cerrar Sesión" para volver al login
- Acceso a las pestañas de navegación (Home y Explore)

## Flujo de Navegación

1. **Inicio de la aplicación**: Se muestra la pantalla de Login
2. **Registro nuevo**: Login → Registrarse → Formulario de registro → Auto-redirigir a pantalla principal
3. **Login existente**: Login → Credenciales correctas → Pantalla principal
4. **Logout**: Pantalla principal → Cerrar Sesión → Login

## Credenciales de Prueba

Usuario por defecto:

- **Usuario**: demo
- **Contraseña**: 123456

## Tecnologías Usadas

- **React Native** con **Expo Router**
- **Context API** para gestión de estado de autenticación
- **TypeScript** para tipado estático
- **Componentes themed** para dark/light mode

## Estructura de Archivos

```
app/
├── _layout.tsx          # Layout principal con AuthProvider
├── login.tsx           # Pantalla de login
├── register.tsx        # Pantalla de registro
└── (tabs)/
    ├── _layout.tsx     # Layout de pestañas
    ├── index.tsx       # Pantalla principal (Home)
    └── explore.tsx     # Pantalla explorar

context/
└── AuthContext.tsx     # Contexto de autenticación
```

## Cómo Ejecutar

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```bash
   npm start
   ```

3. Abrir en dispositivo/emulador usando Expo Go o simulador

## Próximas Mejoras

- Integración con Firebase Authentication
- Persistencia de sesión con AsyncStorage
- Validación de email en registro
- Recuperación de contraseña
- Perfiles de usuario
