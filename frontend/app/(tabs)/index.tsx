import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from "@/hooks/useThemeColor";

export default function DashboardScreen() {
  const [user, setUser] = useState<{ username: string }>({ username: '' });
  const router = useRouter();

    const backgroundColor = useThemeColor("background");
    const textColor = useThemeColor("text");
    const placeholderColor = useThemeColor("placeholder");
    const buttonColor = useThemeColor("button");

  useEffect(() => {
    const handleUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.log('Token manquant');
          router.replace('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:3000/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({ username: response.data.username });
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        router.replace('/login');
      }
    };

    handleUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.log("Aucun token trouvé, l'utilisateur est déjà déconnecté.");
        return;
      }

      const response = await axios.post('http://127.0.0.1:3000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Réponse du serveur :", response.data);
  
      await AsyncStorage.removeItem('token');
      console.log("Token supprimé du stockage local");
  
      router.replace('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Container>
      <ThemedView colorName="light" style={[styles.container, { backgroundColor }]}>

      <View style={styles.header}>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}>
          Hello, {user.username}
        </ThemedText>
        
        <TouchableOpacity onPress={handleLogout}>
          <IconSymbol name="gear" size={28} color={textColor} />
        
        </TouchableOpacity>
      </View>

      </ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 10,
  },
});
