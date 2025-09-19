import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleRegister = async () => {
    if (!nombre.trim() || !usuario.trim() || !contraseña.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (contraseña.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    
    // Simular un pequeño delay como si fuera una llamada a API
    setTimeout(() => {
      const success = register(nombre.trim(), usuario.trim(), contraseña);
      setLoading(false);
      
      if (success) {
        Alert.alert('Éxito', 'Cuenta creada exitosamente', [
          {
            text: 'OK',
            onPress: () => {
              // La navegación se manejará automáticamente por el contexto de auth
              console.log('Registro exitoso');
            }
          }
        ]);
      } else {
        Alert.alert('Error', 'El usuario ya existe. Por favor elige otro nombre de usuario.');
      }
    }, 500);
  };

  const goToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Registrarse</ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
            <ThemedView style={styles.inputContainer}>
              <ThemedText style={styles.label}>*Nombre Completo</ThemedText>
              <TextInput
                style={[styles.input, { 
                  borderColor: '#ccc',
                  backgroundColor: colors.background,
                  color: colors.text
                }]}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingresa tu nombre completo"
                placeholderTextColor={colors.text + '80'}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <ThemedText style={styles.label}>*Usuario</ThemedText>
              <TextInput
                style={[styles.input, { 
                  borderColor: '#ccc',
                  backgroundColor: colors.background,
                  color: colors.text
                }]}
                value={usuario}
                onChangeText={setUsuario}
                placeholder="Elige un nombre de usuario"
                placeholderTextColor={colors.text + '80'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <ThemedText style={styles.label}>*Contraseña</ThemedText>
              <TextInput
                style={[styles.input, { 
                  borderColor: '#ccc',
                  backgroundColor: colors.background,
                  color: colors.text
                }]}
                value={contraseña}
                onChangeText={setContraseña}
                placeholder="Crea una contraseña (mín. 6 caracteres)"
                placeholderTextColor={colors.text + '80'}
                secureTextEntry
              />
            </ThemedView>

            <TouchableOpacity
              style={[styles.button, styles.registerButton, { backgroundColor: colors.tint }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <ThemedText style={[styles.buttonText, { color: '#fff' }]}>
                {loading ? 'Creando Cuenta...' : 'Registro'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.backButton, { 
                borderColor: colors.tint,
                backgroundColor: 'transparent'
              }]}
              onPress={goToLogin}
              disabled={loading}
            >
              <ThemedText style={[styles.buttonText, { color: colors.tint }]}>
                Volver al Login
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 12,
  },
  backButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});