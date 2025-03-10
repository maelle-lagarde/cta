import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts } from "@/constants/Fonts";

interface ThemedTextProps extends TextProps {
  type?: "title" | "subtitle" | "body" | "caption";
}

export function ThemedText({ style, type = "body", ...props }: ThemedTextProps) {
  const color = useThemeColor("text");

  return <Text style={[styles[type], { color }, style]} {...props} />;
}

const styles = StyleSheet.create({
  title: Fonts.title,
  subtitle: Fonts.subtitle,
  body: Fonts.body,
  button: Fonts.body,
  caption: Fonts.caption,
});
