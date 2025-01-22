import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NoteContext } from "../context/NoteContext";
import Notification from "../components/Notification";
import Header from "../components/Header";

const AddNote = ({ note, handleNotificationUpdate }) => {
    const { theme } = useContext(ThemeContext);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [notVisible, setNotVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [saved, setSaved] = useState(false);

    const { addNote, notes, updateNote } = useContext(NoteContext);
    const navigation = useNavigation();

    // Populate fields if `note` is passed, but only once
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setText(note.description);
            setTags(note.tags.join(", "));
        }
    }, [note]);
    

    const handleDismiss = () => {
        setNotVisible(false);
        setSaved(false);
    };

    // handle back press
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleNotification = (msg) => {
        setNotVisible(true);
        setMsg(msg);
    };

    const handleAddNote = () => {
        // Add note
        if (!title || !text) {
            handleNotification("Title and note content cannot be empty.");
            return;
        }

        // Update note
        if (note) {
            updateNote(note.id, {
                id: note.id,
                title,
                description: text,
                updatedAt: Date.now(),
                createdAt: note.createdAt,
                tags: tags.split(",").map((tag) => tag.trim()),
                editing: false,
            });
            setText("");
            setTitle("");
            setTags("");
            setSaved(true);
            handleNotificationUpdate("Note updated successfully");
        } else {
            // Add new note
        const id = notes.length > 0 ? notes[0].id + 1 : 1;
        addNote({
            id: id,
            title,
            description: text,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            completed: false,
            tags: tags.split(",").map((tag) => tag.trim()),
            editing: false,
        });
        setText("");
        setTitle("");
        setTags("");
        setSaved(true);
        handleNotification("Note saved successfully");
        }

        
    };

    const style = styles(theme);

    return (
        <SafeAreaView style={style.container}>
            <Header />
            <View style={style.content}>
                {notVisible && <Notification msg={msg} visible={notVisible} onDismiss={handleDismiss} saved={saved} />}
                <TextInput
                    style={style.input}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={50}
                    placeholder="Enter your title here..."
                    placeholderTextColor={"gray"}
                />
                <TextInput
                    style={[style.input, style.description]}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter your note here..."
                    placeholderTextColor={"gray"}
                    multiline
                />
                <TextInput
                    style={style.input}
                    value={tags}
                    onChangeText={setTags}
                    placeholder="Enter tags (comma-separated)..."
                    placeholderTextColor={"gray"}
                />
                <View style={style.buttonContainer}>
                    <Pressable style={[style.button, style.cancelButton]} onPress={handleBackPress}>
                        <Text style={style.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={style.button} onPress={handleAddNote}>
                        <Text style={style.buttonText}>{ note ? "Update Note" : "Save Note" }</Text>
                    </Pressable>
                </View>
            </View>
            <StatusBar style={theme.colorScheme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
    );
};

const styles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            maxWidth: 1024,
            marginHorizontal: "auto",
            backgroundColor: theme.background,
        },
        content: {
            flex: 1,
            justifyContent: "space-between",
            padding: 16,
        },
        input: {
            borderWidth: 1,
            borderColor: theme.tint,
            color: theme.text,
            height: 50,
            marginBottom: 10,
            borderRadius: 8,
            overflow: "hidden",
            fontsize: 16,
        },
        description: {
            textAlign: "left",
            textAlignVertical: "top",
            flex: 1,
            minHeight: 400,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
        button: {
            backgroundColor: theme.buttonBackground,
            padding: 16,
            borderRadius: 8,
            flex: 1,
            margin: 5,
        },
        cancelButton: {
            backgroundColor:'#666666',
            borderColor: theme.tint,
            borderWidth: 1,
        },
        buttonText: {
            color: theme.buttonTextColor,
            fontSize: 16,
            textAlign: "center",
        },
    });

export default AddNote;
