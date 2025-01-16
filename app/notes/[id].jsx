import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteContext } from "../../context/NoteContext";
import { useNavigation } from '@react-navigation/native';
import { useContext, useMemo, useState, useEffect } from "react";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import AddNote from "../addnote";
import { Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const Note = () => {
    const [editing, setEditing] = useState(false);
    const [notVisible, setNotVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [saved, setSaved] = useState(false);

    const { theme } = useContext(ThemeContext);
    const { getNoteById } = useContext(NoteContext);

    const { id } = useLocalSearchParams() || {};
    const navigation = useNavigation();

    // Memoize the note object
    const note = useMemo(() => {
        if (!id) return null;
        const foundNote = getNoteById(parseInt(id));
        return foundNote || {
            title: "Note not found",
            description: "The note you are looking for does not exist.",
            createdAt: "Unknown date",
        };
    }, [id, getNoteById]);

    // Memoize styles
    const style = useMemo(() => styles(theme), [theme]);

    if (!note) return null; // Avoid rendering if `note` is null
    // update editing
    useEffect(() => {
        setEditing(note.editing);
    }, [note]);

    // for notification
    const handleNotificationUpdate = (msgs) => {
        setSaved(true);
        setNotVisible(true);
        setMsg(msgs);
    }

    // handle dismiss
    const handleDismiss = () => {
        setNotVisible(false);
        setSaved(false);
    }

    useEffect(() => {
        console.log("Updated msg:", msg);
        console.log("Updated notVisible:", notVisible);
    }, [msg, notVisible]);

    return (
        <SafeAreaView style={style.safeArea}>
            {notVisible && (
                <Notification
                    key={msg}
                    msg={msg}
                    visible={notVisible}
                    onDismiss={handleDismiss}
                    saved={saved}
                />
            )}
            {!editing ? <Header /> : null}
            {editing ? (
                <AddNote note={note} handleNotificationUpdate={handleNotificationUpdate} />
            ) : (
                <>
                    <ScrollView
                        contentContainerStyle={style.scrollContent}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Text style={style.title} selectable={true}>
                            {note.title}
                        </Text>
                        <Text onPress={() => setEditing(!editing)} style={style.description}>{note.description}</Text>
                        <Text style={style.date}>
                            Created: {note.createdAt !== "Unknown date"
                                ? new Date(note.createdAt).toLocaleDateString()
                                : note.createdAt}
                        </Text>
                    </ScrollView>
                    <Pressable style={style.button} onPress={() => navigation.goBack()}>
                        <Text style={style.buttonText}>Go Back</Text>
                    </Pressable>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = (theme) => StyleSheet.create({
    safeArea: {
        flex: 1,
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
        alignSelf: 'center',
    },
    buttonText: {
        color: theme.buttonTextColor,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Note;
