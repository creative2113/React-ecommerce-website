// containg the theme context for managing the theme

import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext(); //create the context

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useState('light');
    const value = { theme, setTheme };
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;