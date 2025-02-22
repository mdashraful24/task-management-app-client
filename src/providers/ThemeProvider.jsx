import { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themeData = useTheme();

    return (
        <ThemeContext.Provider value={themeData}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);