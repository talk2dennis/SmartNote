import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="addnote" options={{ headerShown: false }} />
          {/* <Stack.Screen name="todos/[id]" options={{ headerShown: false }} /> */}
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
