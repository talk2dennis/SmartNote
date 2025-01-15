import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteContext } from "../../context/NoteContext";
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";
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
        <SafeAreaView style={style.safeArea}>
            <Header />
            <ScrollView
                contentContainerStyle={style.scrollContent}
                showsHorizontalScrollIndicator={false}
            >
                <Text
                    style={style.title}
                    selectable={true}
                >
                    {note.title}
                </Text>
                <Text style={style.description}>{note.description}</Text>
                <Text style={style.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</Text>

            </ScrollView>
            <Pressable style={style.button} onPress={() => navigation.goBack()}>
                <Text style={style.buttonText}>Go Back</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = (theme) => StyleSheet.create({
    safeArea: {
        flex: 1,
        height: "100%",
        width: '100%',
        maxWidth: 1024,
        alignSelf: 'center',
        backgroundColor: theme.background,
    },
    scrollContent: {
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        borderRadius: 8,
        borderLeftColor: theme.tint,
        borderLeftWidth: 1,
    },
    title: {
        color: theme.text,
        borderBottomColor: theme.text,
        borderBottomWidth: 1,
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 15,
        textAlign: "center",
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
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
        width: '90%',
        maxWidth: 500,
        margin: 20,
    },
    buttonText: {
        color: theme.buttonTextColor,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Note;
