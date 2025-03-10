// useThemeColor.ts

import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useThemeColor(colorName: keyof typeof Colors.light) {
  const colorScheme = useColorScheme();

  return colorScheme === 'dark' ? Colors.dark[colorName] : Colors.light[colorName];
}
