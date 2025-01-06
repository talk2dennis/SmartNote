// NoteContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    // Load notes from AsyncStorage on mount
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const storedNotes = await AsyncStorage.getItem('notes');
                if (storedNotes !== null && storedNotes !== undefined && storedNotes.length < 1) {
                    setNotes(JSON.parse(storedNotes));
                } else {
                    setNotes([{ id: 1, title: "Welcome to Notes", description: "You can add, edit, and delete notes in this app.", createdAt: Date.now(), completed: false, tags: ["welcome"] }]);
                }
            } catch (error) {
                console.error("Failed to load notes:", error);
            }
        };

        loadNotes();
    }, []);

    // Save notes to AsyncStorage whenever they change
    useEffect(() => {
        const saveNotes = async () => {
            try {
                await AsyncStorage.setItem('notes', JSON.stringify(notes));
            } catch (error) {
                console.error("Failed to save notes:", error);
            }
        };

        saveNotes();
    }, [notes]);

    const addNote = (note) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const removeNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, removeNote }}>
            {children}
        </NoteContext.Provider>
    );
};