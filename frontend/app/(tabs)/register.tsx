import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/register", {
        username,
        email,
        password,
      });

      Alert.alert("Succès", response.data.message);
      router.push("/login");
    } catch (error: any) {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue");
      console.log(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Register</ThemedText>
      </ThemedView>
      <ThemedText>Inscrivez-vous pour continuer</ThemedText>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "grey",
  },
});