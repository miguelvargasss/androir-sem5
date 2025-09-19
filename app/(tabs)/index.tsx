import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const { user, userData, logout } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">¡Bienvenido, {userData?.fullName || 'Usuario'}!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sesión Iniciada</ThemedText>
        <ThemedText>
          Has iniciado sesión exitosamente como <ThemedText type="defaultSemiBold">{userData?.username || 'Usuario'}</ThemedText>.
        </ThemedText>
        <ThemedText style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
          Email: {userData?.email || user?.email}
        </ThemedText>
        
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.tint }]}
          onPress={logout}
        >
          <ThemedText style={[styles.logoutButtonText, { color: '#fff' }]}>
            Cerrar Sesión
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">¡Explora la aplicación!</ThemedText>
        <ThemedText>
          Ahora puedes navegar por las diferentes secciones de la aplicación usando las pestañas de abajo.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
