import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/ThemeContext";
import { NoteProvider } from "../context/NoteContext";


export default function RootLayout() {
  return (
    <ThemeProvider>
      <NoteProvider>
        <SafeAreaProvider>
          <Stack options={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="addnote" options={{ headerShown: false }} />
            <Stack.Screen name="notes/[id]" options={{ headerShown: false }} />
            {/* <Stack.Screen name="todos/[id]" options={{ headerShown: false }} /> */}
          </Stack>
        </SafeAreaProvider>
      </NoteProvider>
    </ThemeProvider>
  )
}
