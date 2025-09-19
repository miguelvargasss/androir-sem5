# 🚨 INSTRUCCIONES DE SEGURIDAD URGENTES

## ⚠️ **API KEY COMPROMETIDA DETECTADA**

GitHub ha detectado que tu API Key de Firebase está expuesta públicamente en tu repositorio. **ESTO ES UN RIESGO DE SEGURIDAD CRÍTICO**.

## 🔥 **ACCIONES INMEDIATAS REQUERIDAS**

### **1. INVALIDAR API KEY COMPROMETIDA (URGENTE)**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto "actividad-sem5"
3. Ve a **APIs & Services > Credentials**
4. Busca y **ELIMINA** la API Key comprometida: `AIzaSyACGqPmwXEDqU-Vl8VBmyJwnBmPO_19h0w`

### **2. CREAR NUEVA API KEY SEGURA**

1. En Google Cloud Console, crea una nueva API Key
2. **Restricciones obligatorias**:
   - Restricción de aplicación: HTTP referrers (sitios web)
   - Agregar tu dominio: `localhost:*` y tu dominio de producción
   - Restricción de API: Solo Firebase Authentication API y Firestore API

### **3. CONFIGURAR VARIABLES DE ENTORNO**

Ya he configurado tu proyecto para usar variables de entorno. **COMPLETA ESTOS PASOS**:

1. **Actualiza el archivo `.env`** con tu NUEVA API Key:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=tu-nueva-api-key-segura-aqui
   ```

2. **NUNCA subas el archivo `.env` a Git** (ya está configurado en .gitignore)

### **4. VERIFICAR CONFIGURACIÓN SEGURA**

Tu proyecto ahora usa variables de entorno. El archivo `firebaseConfig.js` ya no contiene credenciales hardcodeadas.

## ✅ **CONFIGURACIÓN SEGURA IMPLEMENTADA**

### Lo que he cambiado:

1. **`firebaseConfig.js`**: Ahora usa `process.env` para obtener credenciales
2. **`.env`**: Archivo para almacenar credenciales de forma segura
3. **`.gitignore`**: Configurado para nunca subir `.env` a Git
4. **Validación**: El código verifica que todas las variables estén definidas

### Estructura de seguridad:

```
📁 Proyecto
├── 🔒 .env (NUNCA en Git - contiene credenciales)
├── 📄 firebaseConfig.js (solo referencias a variables)
├── 🚫 .gitignore (bloquea .env)
└── 🔐 GitHub (solo código, sin credenciales)
```

## 🎯 **PASOS PARA COMPLETAR**

### **Paso 1: Nueva API Key**

- [ ] Eliminar API Key comprometida de Google Cloud Console
- [ ] Crear nueva API Key con restricciones
- [ ] Copiar nueva API Key

### **Paso 2: Actualizar .env**

- [ ] Abrir archivo `.env`
- [ ] Reemplazar `tu-nueva-api-key-aqui` con la nueva API Key
- [ ] Guardar archivo

### **Paso 3: Probar aplicación**

- [ ] Ejecutar `npm start`
- [ ] Verificar que la conexión a Firebase funcione
- [ ] Probar registro/login

### **Paso 4: Commit seguro**

- [ ] Hacer commit de los cambios (sin incluir .env)
- [ ] Push a GitHub
- [ ] Verificar que no aparecen más alertas de seguridad

## 🛡️ **MEJORES PRÁCTICAS IMPLEMENTADAS**

✅ **Variables de entorno** - Credenciales fuera del código  
✅ **Gitignore configurado** - .env nunca se sube a Git  
✅ **Validación de variables** - Error si faltan credenciales  
✅ **Estructura limpia** - Código sin información sensible

## 🚨 **IMPORTANTE**

- **NUNCA** subas credenciales directamente en el código
- **SIEMPRE** usa variables de entorno para información sensible
- **REVISA** regularmente las alertas de seguridad de GitHub
- **REGENERA** API Keys si sospechas que están comprometidas

## 📞 **¿Necesitas ayuda?**

Si tienes problemas con algún paso, avísame inmediatamente. La seguridad de tu aplicación es crítica.
