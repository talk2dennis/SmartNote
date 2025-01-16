import { useContext } from "react";
import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { NoteContext } from "../context/NoteContext";

const { width } = Dimensions.get("window");

export default function Index() {
  const { colorScheme, theme } = useContext(ThemeContext);
  const { notes } = useContext(NoteContext);
  const navigation = useNavigation();
  const style = styles(theme, colorScheme);

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <View style={style.content}>
        <TodoList todos={notes} />
        <Pressable style={style.addBtn} onPress={() => navigation.navigate("addnote")}>
          <Ionicons name="add" size={40} color={theme.tint} />
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

const styles = (theme, colorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      width: '100%',
      maxWidth: 1024,
      alignSelf: 'center',
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
    },
    addBtn: {
      position: "absolute",
      bottom: 10,
      right: '45%',
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 5,
      borderColor: theme.tint,
      width: 60,
      height: 60,
    },
  });
