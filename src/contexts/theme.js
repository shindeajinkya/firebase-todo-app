import React, { useState } from 'react';

const ThemeContext = React.createContext()

export default ThemeContext
export const ThemeConsumer = ThemeContext.Consumer

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light')

    return (
        <ThemeContext.Provider
            value={{
                state: theme,
                toggleTheme
            }} 
        >
            {children}
        </ThemeContext.Provider>
    )
}