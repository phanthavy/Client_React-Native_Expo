import Navbar from "@/components/Navbar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import Providers from "@/store/provider/Provider";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter: require("@/assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
      <Providers>
        <View
          style={{
            flex: 1,
            backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#FAFAFA",
          }}
        >
          <Navbar colorScheme={colorScheme} />
          <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="product" options={{ headerShown: false }} />
          </Stack>
        </View>
        <StatusBar style="auto" />
        <Toast visibilityTime={1500}/>
      </Providers>
    </ThemeProvider>
  );
}
