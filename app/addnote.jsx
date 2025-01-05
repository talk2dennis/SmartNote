import React, { useState, useContext } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';

const AddNote = () => {
    const { theme } = useContext(ThemeContext);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");

    const navigation = useNavigation();

    const handleAddNote = () => {
        // Add note logic here (e.g., call addNote)
        setText("");
        setTitle("");
        setTags("");
        navigation.goBack(); // Navigate back after saving
    };

    const style = styles(theme);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <TextInput
                    style={style.input}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={50}
                    placeholder="Enter your title here..."
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={[style.input, { flex: 1, textAlignVertical: 'top' }]} // Take remaining space
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter your note here..."
                    placeholderTextColor={'gray'}
                    multiline
                />
                <TextInput
                    style={style.input}
                    value={tags}
                    onChangeText={setTags}
                    placeholder="Enter tags or subjects (comma-separated)..."
                    placeholderTextColor={'gray'}
                />
                <View style={style.buttonContainer}>
                    <Pressable style={style.button} onPress={handleAddNote}>
                        <Text style={style.buttonText}>Save Note</Text>
                    </Pressable>
                    <Pressable style={[style.button, style.cancelButton]} onPress={() => navigation.goBack()}>
                        <Text style={style.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
            <StatusBar style={theme.colorScheme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
    );
};

const styles = (theme) => ({
    container: {
        flex: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        backgroundColor: theme.background,
        padding: 16,
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
    },
    input: {
        borderWidth: 1,
        borderColor: theme.tint,
        color: theme.text,
        width: "100%",
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        fontsize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: theme.buttonBackground,
        padding: 16,
        borderRadius: 8,
        flex: 1,
        margin: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: theme.buttonTextColor,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AddNote;