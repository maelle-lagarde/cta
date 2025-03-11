import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform } from "react-native";
import { FontProvider } from '@/providers/FontProvider';

export default function TabLayout() {

  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  return (
    <FontProvider>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          // tabBarButton: HapticTab,
          tabBarStyle: {
            position: 'absolute',
            paddingTop: 10,
            backgroundColor: backgroundColor,
            borderTopWidth: 1.5,
            borderTopColor: textColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: textColor,
          tabBarInactiveTintColor: "gray",
        }}>

        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
      </Tabs>
    </FontProvider>
  );
}
