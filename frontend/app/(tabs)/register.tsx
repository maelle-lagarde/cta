import React, { useState } from "react";
import { Image } from "react-native";
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

import { Container } from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");
  const placeholderColor = useThemeColor("placeholder");
  const buttonColor = useThemeColor("button");

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
    <Container>
      <Image 
        source={require('@/assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <ThemedView colorName="light" style={[styles.container, { backgroundColor }]}>
        <Image 
          source={require('@/assets/images/inscription.png')} 
          style={styles.signup} 
          resizeMode="contain"
        />
        <View style={styles.form}>
          <TextInput
            placeholder="Nom d'utilisateur"
            value={username}
            onChangeText={setUsername}
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={placeholderColor}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={placeholderColor}
          />
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={placeholderColor}
          />
          <TouchableOpacity 
            style={[
              styles.buttonForm, { 
                backgroundColor: buttonColor 
              }]} 
            onPress={handleRegister}
          >
          <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor }]}>
            Vous avez un compte ?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={[styles.footerLink, { color: buttonColor }]}>Connexion</Text>
          </TouchableOpacity>
        </View>

      </ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFD5EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#1B191F",
  },
  buttonForm: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    margin: "auto",
  },
  buttonText: {
    color: "#1B191F",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 245,
    height: 197,
    margin: 20,
  },
  signup: {
    width: 163,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "regular",
    textDecorationLine: "underline",
  },
});