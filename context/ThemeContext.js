import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { colors } from "../constants/Colors";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    // Update colorScheme dynamically based on system changes
    useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
    });

    // Cleanup listener
    return () => listener.remove();
    }, []);

    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
        {children}
    </ThemeContext.Provider>
    );
}
