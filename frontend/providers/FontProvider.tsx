import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    "Inter_Thin": require("../assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter_Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Inter_Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter_Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter_SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter_Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter_ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
    "Inter_Black": require("../assets/fonts/Inter_18pt-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
