import { useContext, useState, useEffect } from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  const [searchBy, setSearchBy] = useState("title");
  const [filteredNote, setFilteredNote] = useState([]);
  const { colorScheme, theme } = useContext(ThemeContext);
  const { notes } = useContext(NoteContext);
  const navigation = useNavigation();
  const style = styles(theme, colorScheme);


  // load the note to filteredNote on mount
  useEffect(() => {
    setFilteredNote(notes);
  }, [notes]);
  
  // Filter notes based on the search term
  const handleSearch = (text) => {
    setSearchTerm(text);

    // Reset to all notes when search term is empty
    if (!text.trim()) {
      setFilteredNote(notes);
      return;
    }

    // filter note based on search term
    const filteredNotes = notes.filter((note) => {
      if (searchBy === 'title') {
        return note.title.toLowerCase().includes(text.toLowerCase());
      } else if (searchBy === 'description') {
        return note.description.toLowerCase().includes(text.toLowerCase());
      } else if (searchBy === 'tags') {
        return note.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()));
      }
      return false;
    });
    setFilteredNote(filteredNotes);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header />
      <View style={style.content}>
        <View style={style.searchContainer}>
          <TextInput
            style={style.search}
            value={searchTerm}
            placeholder={`Search by ${searchBy}`}
            onChangeText={handleSearch}
          />
          <View style={ style.pickerContainer }>
            <Picker
              selectedValue={searchBy}
              onValueChange={(itemValue) => setSearchBy(itemValue)}
              style={style.picker}
              dropdownIconColor={theme.tint}
            >
              <Picker.Item label="Title" value="title" />
              <Picker.Item label="Description" value="description" />
              <Picker.Item label="Tags" value="tags" />
            </Picker>
          </View>

        </View>
        <TodoList todos={filteredNote.length > 0 ? filteredNote : null} />
        <View
          style={style.addBtnContainer}
        >
        <Pressable
          style={style.addBtn}
          onPress={() => navigation.navigate("addnote")}
        >
          <Ionicons name="add" size={40} color={theme.tint} />
        </Pressable>
        </View>
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
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      borderColor: colorScheme === 'black' ? 'white' : 'black',
      borderWidth: 1,
      borderRadius: 10,
    },
    search: {
      flex: 1,
      height: 50,
      padding: 10,
    },
    pickerContainer: {
      width: 50,
      marginRight: 5,
      overflow: 'hidden',
    },
    
    picker: {
      width: '100%',
      backgroundColor: theme.background,
      color: theme.text,

    },
    addBtnContainer: {
      width: '100%',
      height: 60,
      backgroundColor: theme.background,
    },
    addBtn: {
      position: "absolute",
      bottom: 10,
      right: "45%",
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 5,
      borderColor: theme.tint,
      width: 60,
      height: 60,
    },
  });
