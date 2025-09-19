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

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogin = async () => {
    if (!usuario.trim() || !contraseña.trim()) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    setLoading(true);
    
    // Simular un pequeño delay como si fuera una llamada a API
    setTimeout(() => {
      const success = login(usuario.trim(), contraseña);
      setLoading(false);
      
      if (success) {
        // La navegación se manejará automáticamente por el contexto de auth
        console.log('Login exitoso');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    }, 500);
  };

  const goToRegister = () => {
    router.navigate('/register' as any);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Login</ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
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
                placeholder="Ingresa tu usuario"
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
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={colors.text + '80'}
                secureTextEntry
              />
            </ThemedView>

            <TouchableOpacity
              style={[styles.button, styles.loginButton, { backgroundColor: colors.tint }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <ThemedText style={[styles.buttonText, { color: '#fff' }]}>
                {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.registerButton, { 
                borderColor: colors.tint,
                backgroundColor: 'transparent'
              }]}
              onPress={goToRegister}
              disabled={loading}
            >
              <ThemedText style={[styles.buttonText, { color: colors.tint }]}>
                Registrarse
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
  loginButton: {
    marginTop: 12,
  },
  registerButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});