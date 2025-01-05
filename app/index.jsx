import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { colorScheme, theme } = useContext(ThemeContext);

  const style = styles(theme, colorScheme);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <Text style={style.text}>Color Schemes: { theme.background }</Text>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}


const styles = (theme, colorScheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
  },
  content: {
    width: "100%",
    maxWidth: 1024,
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: theme.text,
    fontSize: 24,
  },
});