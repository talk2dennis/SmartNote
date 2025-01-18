import { useContext, useState } from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import { NoteContext } from "../context/NoteContext";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNote, setFilteredNote] = useState([]);
  const { colorScheme, theme } = useContext(ThemeContext);
  const { notes } = useContext(NoteContext);
  const navigation = useNavigation();
  const style = styles(theme, colorScheme);

  // Filter notes based on the search term
  const handleSearch = (text) => {
    setSearchTerm(text);

    // Reset to all notes when search term is empty
    if (!text.trim()) {
      setFilteredNote(notes); 
      return;
    }

    // filter note based on search term
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredNote(filteredNotes);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <View style={style.content}>
        <View>
          <TextInput
            style={style.search}
            value={searchTerm}
            placeholder="Search notes..."
            onChangeText={handleSearch}
          />
        </View>
        <TodoList todos={filteredNote.length > 0 ? filteredNote : notes} />
        <Pressable
          style={style.addBtn}
          onPress={() => navigation.navigate("addnote")}
        >
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
      width: "100%",
      maxWidth: 1024,
      alignSelf: "center",
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 10,
    },
    search: {
      width: "auto",
      borderColor: colorScheme === "dark" ? "white" : "black",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    addBtn: {
      position: "absolute",
      bottom: 10,
      right: "45%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 5,
      borderColor: theme.tint,
      width: 60,
      height: 60,
    },
  });
