import { useLocalSearchParams } from "expo-router";
import { NoteContext } from "../../context/NoteContext";
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from "react";
import Header from "../../components/Header";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const Note = () => {
    const { theme } = useContext(ThemeContext);
    const { getNoteById } = useContext(NoteContext);

    const { id } = useLocalSearchParams();
    let note = getNoteById(parseInt(id));
    const navigation = useNavigation();
    if (!note) {
        note = { title: "Note not found", description: "The note you are looking for does not exist.", createdAt: Date.now() };
    }

    const style = styles(theme);


    return (
        <>
            <Header />
            <ScrollView style={style.container}
            showsHorizontalScrollIndicator={false}
        >
            <Text style={style.title}>{note.title}</Text>
            <Text style={style.description}>{note.description}</Text>
            <Text style={style.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</Text>
            <Pressable style={style.button} onPress={() => navigation.goBack()}>
                <Text style={style.buttonText}>Go Back</Text>
            </Pressable>
        </ScrollView>
        </>
        
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        padding: 15,
        scrollBehavior: 'smooth',
        backgroundColor: theme.background,
        padding: 20,
    },
    title: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: theme.text,
        fontSize: 18,
        marginBottom: 10,
    },
    date: {
        color: theme.text,
        fontSize: 16,
        marginBottom: 20,
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
    },
});

export default Note;