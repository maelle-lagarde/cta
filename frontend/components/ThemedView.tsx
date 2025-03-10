import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  colorName: keyof typeof Colors;
};

export function ThemedView({ style, colorName, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor("background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
