import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { FontProvider } from "@/providers/FontProvider";

interface Container {
  children: React.ReactNode;
}

export function Container({ children }: Container) {
  return (
    <FontProvider>
      <ThemedView colorName="light" style={styles.container}>
        {children}
      </ThemedView>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    padding: 20, 
  },
});
