import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('rare_theme');
        return savedTheme || 'dark-theme'; // Default to dark theme mappings
    });

    useEffect(() => {
        localStorage.setItem('rare_theme', theme);
        // Apply theme to body
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark-theme' ? 'light-theme' : 'dark-theme');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
