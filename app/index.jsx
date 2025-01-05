import { useContext } from "react";
import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';

export default function Index() {
  const { colorScheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation(); // Hook to use navigation

  const style = styles(theme, colorScheme);

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <View style={style.content}>
        <Text style={style.text}>Note List</Text>
        <Pressable style={style.addBtn} onPress={() => navigation.navigate("addnote")}>
          <Ionicons name="add" size={60} color={ theme.tint } />
        </Pressable>
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
    justifyContent: 'center',
  },
  content: {
    width: "100%",
    maxWidth: 1024,
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: theme.text,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.buttonBackground,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.buttonTextColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addBtn: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: theme.tint,
    // padding: 3,
    marginBottom: 20,
    justifyContent: 'center',
  },
});